import jwtDecode from "jwt-decode";
import API from "@/configs/api";
import $api from "@/services/api";

const LOCAL_STORAGE_KEY_AUTH = "auth";
let authInfo = {};
{
  const jsonStr = window.localStorage.getItem(LOCAL_STORAGE_KEY_AUTH);
  if (jsonStr !== null) {
    try {
      authInfo = JSON.parse(jsonStr);
      // eslint-disable-next-line no-empty
    } catch (_e) {}
  }
}

export default {
  state: {
    token: "token" in authInfo ? authInfo.token : null,
    user: "user" in authInfo ? authInfo.user : null,
    promiseRefreshToken: null,
  },
  getters: {
    isLogin(state) {
      return state.token !== null;
    },
    userId(state) {
      if (state.token === null) {
        return null;
      }
      const jwtPayload = jwtDecode(state.token);

      return jwtPayload.user_id;
    },
    tokenExp(state) {
      if (state.token === null) {
        return null;
      }
      const jwtPayload = jwtDecode(state.token);

      return jwtPayload.exp;
    },
  },
  mutations: {
    SET_TOKEN(state, { token }) {
      state.token = token;
      authInfo["token"] = token;
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_AUTH,
        JSON.stringify(authInfo)
      );
    },
    SET_USER(state, { user }) {
      let userInfo = {
        email: user.email,
        user_id: user.id,
      };
      state.user = userInfo;
      authInfo["user"] = userInfo;

      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_AUTH,
        JSON.stringify(authInfo)
      );
    },
    SET_PROMISE_REFRESH_TOKEN(state, promise) {
      state.promiseRefreshToken = promise;
    },
  },
  actions: {
    async refreshToken({ commit, state }) {
      if (state.promiseRefreshToken === null) {
        commit(
          "SET_PROMISE_REFRESH_TOKEN",
          (async (commit, state) => {
            let response = null;
            try {
              response = await $api.post(API.REFRESH_TOKEN, {
                token: state.token,
              });
            } catch (e) {
              console.log(e);
              response = e;
            }
            commit("SET_PROMISE_REFRESH_TOKEN", null);

            if (
              typeof response.data.data === "object" &&
              "token" in response.data.data
            ) {
              commit("SET_TOKEN", { token: response.data.data.token });
              return {};
            } else if (
              typeof response.data === "object" &&
              "errors" in response.data
            ) {
              return { errors: response.data.errors };
            } else {
              return { errors: { unknown: response } };
            }
          })(commit, state)
        );
      }

      return await state.promiseRefreshToken;
    },
    // eslint-disable-next-line no-unused-vars,no-empty-pattern
    logout({ commit, state }, {}) {
      commit("SET_TOKEN", { token: null });
      return {};
    },
  },
};
