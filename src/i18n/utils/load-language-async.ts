import i18n from "../i18n";
import axios from "axios";

const loadedLanguages = ["en"]; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html")?.setAttribute("lang", lang);
}

export async function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    return;
  }

  if (!loadedLanguages.includes(lang)) {
    loadedLanguages.push(lang);

    try {
      const { default: messages } = await import(
        /* webpackChunkName: "lang-[request]" */ `@/i18n/messages/${lang}.json`
      );
      i18n.setLocaleMessage(lang, messages);
    } catch {
      return;
    }
  }

  setI18nLanguage(lang);
}
