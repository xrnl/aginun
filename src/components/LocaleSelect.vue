<template>
  <v-select
    style="max-width: 130px; z-index: 16"
    hide-details
    :value="$i18n.locale"
    @input="setSelected"
    :items="locales"
    item-text="label"
    item-value="code"
    dense
    solo
  ></v-select>
</template>

<script>
import { loadLanguageAsync } from "@/i18n/utils/load-language-async";

export default {
  name: "LocaleSelect",
  data: () => ({
    locales: [
      {
        code: "en",
        label: "English"
      },
      {
        code: "nl",
        label: "Dutch"
      }
    ]
  }),
  methods: {
    async setSelected(lang) {
      await loadLanguageAsync(lang);
    }
  }
};
</script>
