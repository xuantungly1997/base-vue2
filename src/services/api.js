import axios from "axios";
import { EventBus } from "@/events/eventBus";
import router from "@/router/index";
import store from "@/stores/index";
import API from "@/configs/api";

const DEFAULT_SHOW_LOADING = true;
const AJAX_LOADING_TIME = 0;
let showLoadingCount = 0;
let ajaxLoadingStartTime = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hiddenAjaxLoading(config = {}) {
  if (
    showLoadingCount > 0 &&
    (typeof config.showLoading === "undefined" || config.showLoading === true)
  ) {
    showLoadingCount -= 1;
  }
  if (showLoadingCount === 0) {
    hideAjaxLoading();
  }
}

function showAjaxLoading() {
  ajaxLoadingStartTime = Date.now();
  // Show AJAX Loading
  EventBus.$emit("showAjaxLoading", true);
}

async function hideAjaxLoading() {
  let time = Date.now() - ajaxLoadingStartTime;
  if (time < AJAX_LOADING_TIME) {
    await sleep(AJAX_LOADING_TIME - time);
  }
  EventBus.$emit("showAjaxLoading", false);
}

/**
 * Interceptors request
 * Refresh Token
 */
axios.interceptors.request.use(
  async function (config) {
    if (
      typeof config.showLoading === "undefined" ||
      config.showLoading === true
    ) {
      showLoadingCount += 1;
    }

    if (showLoadingCount > 0) {
      showAjaxLoading();
    } else {
      hideAjaxLoading();
    }

    // check token expire and auto renew
    let token = store.state.auth.token;
    if (token && config.url != API.REFRESH_TOKEN) {
      var date = new Date();
      var timestamp = date.getTime();
      if (store.getters["auth/tokenExp"] <= parseInt(timestamp / 1000)) {
        const promiseRefreshToken = await store.dispatch("auth/refreshToken");
        if (promiseRefreshToken && promiseRefreshToken.errors) {
          store.dispatch("auth/logout", {});
          return;
        }
        token = store.state.auth.token;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    hiddenAjaxLoading(err.config);
    return Promise.reject(err);
  }
);

/**
 * Interceptors response
 * Handle API
 */
axios.interceptors.response.use(
  function (response) {
    hiddenAjaxLoading(response.config);

    const arrayComponentsIgnore = [
      // components name
    ];
    if (arrayComponentsIgnore.includes(router.currentRoute.name))
      return response;

    const componentsIgnoreAlert = [];

    let resCode = response.data.code;
    if (resCode && resCode !== 200) {
      let componentIgnoreIndex = componentsIgnoreAlert.findIndex(
        (component) =>
          component.name === router.currentRoute.name &&
          resCode === component.code &&
          component.api === response.config.url
      );

      if (componentIgnoreIndex === -1) {
        EventBus.$emit("showApiError", response);
        if (resCode === 401) {
          store.dispatch("logout");
        }
      }
    }

    return response;
  },
  async function (error) {
    let config = error ? error.config : {};
    hiddenAjaxLoading(config);

    if (axios.isCancel(error)) {
      // cancel request
      return Promise.reject(error);
    }

    if (!error.response && !error.request) {
      // do not http error, it is js error
      throw error;
    }

    // retry AJAX
    config.currentRetry = "currentRetry" in config ? config.currentRetry : 0;
    if (
      config.retry &&
      config.retry > 0 &&
      config.currentRetry < config.retry
    ) {
      config.currentRetry++;
      await sleep(config.currentRetry * 1000);
      return axios.request(config);
    }

    return Promise.reject(error);
  }
);

/* Axios config: api content-type */
axios.defaults.headers.common["Content-Type"] = "application/json";

/* Axios config: when call to another domain API */
/* Warning: CORS in api */
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export default {
  request(
    method,
    url,
    params,
    data,
    headers = {},
    config = { retry: 0, showLoading: DEFAULT_SHOW_LOADING }
  ) {
    return axios.request({
      ...config,
      url,
      params,
      data,
      method: method.toLowerCase(),
      headers,
    });
  },

  get(url, params, config = { retry: 0, showLoading: DEFAULT_SHOW_LOADING }) {
    return this.request("get", url, params, {}, {}, config);
  },

  post(
    url,
    data,
    headers = {},
    config = { retry: 0, showLoading: DEFAULT_SHOW_LOADING }
  ) {
    return this.request("post", url, {}, data, headers, config);
  },

  put(
    url,
    data,
    headers = {},
    config = { retry: 0, showLoading: DEFAULT_SHOW_LOADING }
  ) {
    return this.request("put", url, {}, data, headers, config);
  },

  delete(
    url,
    data = {},
    config = { retry: 0, showLoading: DEFAULT_SHOW_LOADING }
  ) {
    return this.request("delete", url, {}, data, {}, config);
  },

  cancelToken(callback) {
    return new axios.CancelToken(callback);
  },
  showAjaxLoading: () => {
    showLoadingCount += 1;
    showAjaxLoading();
  },
  hideAjaxLoading: async () => {
    showLoadingCount = showLoadingCount > 0 ? showLoadingCount - 1 : 0;
    if (showLoadingCount === 0) {
      await hideAjaxLoading();
    }
  },
};
