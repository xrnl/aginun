<template>
  <v-select
    style="max-width: 130px; z-index: 16"
    class="language-slect"
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

<script lang="ts">
import Vue from "vue";
import { loadLanguageAsync } from "@/i18n/utils/load-language-async";

export default Vue.extend({
  name: "LanguageSelect",
  data() {
    return {
      locales: [
        {
          code: "en",
          label: this.$t("English")
        },
        {
          code: "nl",
          label: this.$t("Dutch")
        }
      ]
    };
  },
  methods: {
    async setSelected(lang) {
      await loadLanguageAsync(lang);
    }
  }
});
</script>
