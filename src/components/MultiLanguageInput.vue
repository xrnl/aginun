<template>
  <v-card outlined elevation="1" class="rounded-sm px-3 pt-2 mb-7">
    <p class="font-weight-bold">{{ label }}</p>
    <validation-provider
      v-if="requiredLanguages.includes('nl')"
      ref="nl_form"
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
        :value="value.nl"
        @input="updateValue('nl', $event)"
        :error-messages="errors"
      >
        <template v-slot:label>🇳🇱 {{ $t("Dutch") }}</template>
      </v-text-field>
      <v-textarea
        v-else
        outlined
        dense
        class="rounded-lg"
        :value="value.nl"
        :error-messages="errors"
        :placeholder="placeholder"
        @input="updateValue('nl', $event)"
      >
        <template v-slot:label>🇳🇱 {{ $t("Dutch") }}</template>
      </v-textarea>
    </validation-provider>
    <validation-provider
      v-if="requiredLanguages.includes('en')"
      ref="en_form"
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
        :value="value.en"
        @input="updateValue('en', $event)"
        :error-messages="errors"
      >
        <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
      </v-text-field>
      <v-textarea
        v-else
        outlined
        dense
        class="rounded-lg"
        :value="value.en"
        :error-messages="errors"
        :placeholder="placeholder"
        @input="updateValue('en', $event)"
      >
        <template v-slot:label>🇬🇧 {{ $t("English") }}</template>
      </v-textarea>
    </validation-provider>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { ValidationProvider } from "vee-validate";
import { Translation } from "@/i18n/models/translation";
import { createTranslation } from "@/i18n/utils/create-translation";

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
      default: createTranslation()
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
  },
  methods: {
    updateValue(key: string, value: string) {
      this.value[key] = value;
      this.$emit("input", this.value);
    }
  },
  watch: {
    value() {
      (this.$refs.nl_form as InstanceType<typeof ValidationProvider>)?.reset();
      (this.$refs.en_form as InstanceType<typeof ValidationProvider>)?.reset();
    }
  }
});
</script>
