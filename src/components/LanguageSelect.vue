<template>
  <v-select
    style="max-width: 130px; z-index: 16"
    hide-details
    :value="$i18n.locale"
    :items="locales"
    @input="setSelected"
    item-text="label"
    item-value="code"
    dense
    solo
  ></v-select>
</template>

<script>
import { loadLanguageAsync } from "@/i18n/utils/load-language-async";
import { languages } from "@/constants/languages";

export default {
  name: "LanguageSelect",
  data: () => ({
    locales: languages
  }),
  methods: {
    async setSelected(lang) {
      await loadLanguageAsync(lang);
    }
  }
};
</script>
