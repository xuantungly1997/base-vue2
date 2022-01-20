import Vue from "vue";
import VueI18n from "vue-i18n";
import enLang from "./en";
import jaLang from "./ja";
import { localize } from "vee-validate";
import jaValidation from "./ja/validation";
import enValidation from "./en/validation";

const lang = {
  en: enLang,
  ja: jaLang,
};
localize({
  ja: jaValidation,
  en: enValidation,
});
Vue.use(VueI18n);
const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    short_numeric: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    short_time: {
      hour: "2-digit",
      minute: "2-digit",
    },
    short_date_time: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  },
  ja: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    short_numeric: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    short_time: {
      hour: "2-digit",
      minute: "2-digit",
    },
    short_date_time: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  },
};

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
    },
  },
  ja: {
    currency: {
      style: "currency",
      currency: "JPY",
      currencyDisplay: "name",
    },
  },
};

const i18n = new VueI18n({
  dateTimeFormats,
  numberFormats,
  locale: "en", // set locale
  messages: lang,
  fallbackLocale: "ja",
  silentTranslationWarn: true,
});

export default i18n;
