<template>
  <v-card outlined elevation="1" class="rounded-sm px-3 pt-2 mb-7">
    <p class="font-weight-bold">{{ label }}</p>
    <validation-provider
      v-if="requiredLanguages.includes('en')"
      tag="div"
      :rules="rules"
      :name="label"
      v-slot="{ errors }"
    >
      <v-text-field
        v-if="isTextField"
        outlined
        dense
        class="rounded-lg"
        v-model="value.en"
        :error-messages="errors"
      >
        <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
      </v-text-field>
      <v-textarea
        v-else
        outlined
        dense
        class="rounded-lg"
        v-model="value.en"
        :error-messages="errors"
        :placeholder="placeholder"
      >
        <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
      </v-textarea>
    </validation-provider>
    <validation-provider
      v-if="requiredLanguages.includes('nl')"
      tag="div"
      :rules="rules"
      :name="label"
      v-slot="{ errors }"
    >
      <v-text-field
        v-if="isTextField"
        outlined
        dense
        class="rounded-lg"
        v-model="value.nl"
        :error-messages="errors"
      >
        <template v-slot:label>🇳🇱 {{ $t("Dutch") }}</template>
      </v-text-field>
      <v-textarea
        v-else
        outlined
        dense
        class="rounded-lg"
        v-model="value.nl"
        :error-messages="errors"
        :placeholder="placeholder"
      >
        <template v-slot:label>🇬🇧 {{ $t("Dutch") }}</template>
      </v-textarea>
    </validation-provider>
  </v-card>
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
  computed: {
    isTextField() {
      return this.type === "text-field";
    }
  },
  props: {
    requiredLanguages: {
      type: Array,
      default: () => ["en", "nl"]
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
    placeholder: {
      type: String,
      default: ""
    },
    rules: {
      type: [String, Object],
      default: null
    },
    type: {
      type: String,
      default: "text-field"
    }
  }
});
</script>
