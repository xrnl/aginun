import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function loadMessages() {
  const messages = require.context(
    "./messages",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const parsedMessages = {};
  messages.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      parsedMessages[locale] = messages(key);
    }
  });
  return parsedMessages;
}

export default new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: loadMessages(),
  silentTranslationWarn: true
});
