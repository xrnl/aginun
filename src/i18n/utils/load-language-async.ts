import i18n from "../i18n";
import axios from "axios";

const loadedLanguages = ["en"]; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html")?.setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale === lang || loadedLanguages.includes(lang)) {
    return Promise.resolve(lang);
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.json`
  ).then((messages) => {
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}
