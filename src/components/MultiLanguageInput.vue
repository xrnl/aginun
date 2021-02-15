<template>
  <validation-provider
    tag="div"
    :rules="rules"
    :name="label"
    v-slot="{ errors }"
  >
    <label class="font-weight-bold">{{ label }}</label>
    <v-text-field
      v-model="value.en"
      :error-messages="errors"
      :hide-details="true"
    >
      <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
    </v-text-field>
    <v-text-field v-model="value.nl" :error-messages="errors">
      <template v-slot:label>🇳🇱 {{ $t("Dutch") }}</template>
    </v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider } from "vee-validate";
import { Translation } from "@/i18n/models/translation";

export default Vue.extend({
  name: "MultiLanguageInput",
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: Object as () => Translation,
      default: () => ({
        en: "",
        nl: ""
      })
    },
    label: {
      type: String,
      default: ""
    },
    rules: {
      type: Object,
      default: null
    }
  }
});
</script>
