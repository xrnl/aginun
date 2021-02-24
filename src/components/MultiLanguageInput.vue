<template>
  <div>
    <label class="font-weight-bold">{{ label }}</label>
    <validation-provider
      v-if="requiredLanguages.en"
      tag="div"
      :rules="rules"
      :name="label"
      v-slot="{ errors }"
    >
      <v-text-field v-model="value.en" :error-messages="errors">
        <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
      </v-text-field>
    </validation-provider>
    <validation-provider
      v-if="requiredLanguages.nl"
      tag="div"
      :rules="rules"
      :name="label"
      v-slot="{ errors }"
    >
      <v-text-field v-model="value.nl" :error-messages="errors">
        <template v-slot:label>🇳🇱 {{ $t("Dutch") }}</template>
      </v-text-field>
    </validation-provider>
  </div>
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
    requiredLanguages: {
      type: Object,
      default: () => ({ en: true, nl: true })
    },
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
      type: [String, Object],
      default: null
    }
  }
});
</script>
