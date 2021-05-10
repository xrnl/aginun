<template>
  <v-dialog :value="value" width="600px" @input="$emit('input', false)">
    <v-card class="pa-4">
      <h2>{{ formTitle }}</h2>
      <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
        <p class="mb-0">
          {{ $t("Choose the languages for this role:") }}
        </p>
        <v-chip-group
          active-class="primary--text"
          v-model="requiredLanguages"
          mandatory
          multiple
        >
          <v-chip outlined value="nl">🇳🇱 {{ $t("Dutch") }}</v-chip>
          <v-chip outlined value="en">🇬🇧 {{ $t("English") }}</v-chip>
        </v-chip-group>
        <form @submit.prevent="handleSubmit(onSubmit)" @keyup.enter.prevent>
          <multi-language-input
            v-model="role.title"
            rules="required|alpha_spaces|max:30"
            :label="$t('Title')"
            :requiredLanguages="requiredLanguages"
          />
          <multi-language-input
            v-model="role.responsibilities"
            :label="$t('Responsibilities')"
            :requiredLanguages="requiredLanguages"
            rules="required|max:1000"
            type="textarea"
          />
          <multi-language-input
            v-model="role.description"
            :label="$t('Description (optional)')"
            :placeholder="
              $t(
                'Any additional information not specified in the set of responsibilities. \n \n This can include information about the circle or the specific project that the role is needed for.'
              )
            "
            rules="max:1000"
            :requiredLanguages="requiredLanguages"
            type="textarea"
          />
          <multi-language-input
            v-model="role.requirements"
            :label="$t('Requirements (optional)')"
            :placeholder="$t('Skills, experience, equipment')"
            rules="max:1000"
            :requiredLanguages="requiredLanguages"
            type="textarea"
          />
          <v-card outlined elevation="1" class="rounded-sm px-3 pt-2 mb-7">
            <p class="font-weight-bold">
              {{ $t("Role info") }}
            </p>
            <v-row dense>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="local group"
                >
                  <v-select
                    v-model="role.localGroupId"
                    :items="localGroups"
                    outlined
                    dense
                    class="rounded-lg"
                    item-value="id"
                    item-text="title"
                    :label="$t('Local Group')"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="working circle"
                >
                  <v-select
                    v-model="role.workingCircleId"
                    :items="workingCircles"
                    outlined
                    dense
                    class="rounded-lg"
                    item-value="id"
                    :item-text="['title', $i18n.locale]"
                    :label="$t('Working circle')"
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <date-picker-field
                  :date="role.dueDate"
                  :label="$t('Application deadline (optional)')"
                  @update="onDueDateChange"
                />
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="time commitment"
                >
                  <v-select
                    v-model="role.timeCommitmentMin"
                    :items="timeCommitments"
                    item-value="min"
                    return-object
                    outlined
                    dense
                    class="rounded-lg"
                    :label="$t('Time commitment')"
                    :error-messages="errors"
                    @change="onTimeCommitmentChange"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.min }} - {{ item.max }} {{ $t("hours/week") }}
                    </template>
                    <template v-slot:selection="{ item }">
                      {{ item.min }} - {{ item.max }} {{ $t("hours/week") }}
                    </template>
                  </v-select>
                </validation-provider>
              </v-col>
            </v-row>
          </v-card>
          <v-card outlined elevation="1" class="rounded-sm px-3 pt-2 mb-7">
            <p class="font-weight-bold">
              {{ $t("Contact details") }}
            </p>
            <v-row dense>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="email address"
                  mode="eager"
                  rules="required|email|max:50"
                >
                  <v-text-field
                    outlined
                    dense
                    class="rounded-lg"
                    v-model="role.email"
                    :label="$t('Email')"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Mattermost id"
                  mode="eager"
                  rules="required|mattermost|max:50"
                >
                  <v-text-field
                    outlined
                    dense
                    class="rounded-lg"
                    v-model="role.mattermostId"
                    :label="$t('Mattermost id')"
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  rules="phone|max:20"
                  mode="eager"
                  name="phone number"
                >
                  <v-text-field
                    outlined
                    dense
                    class="rounded-lg"
                    v-model="role.phone"
                    :label="$t('Phone number (optional)')"
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>
            </v-row>
          </v-card>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" text @click="$emit('input', false)">
              {{ $t("Cancel") }}
            </v-btn>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div v-on="invalid ? on : undefined">
                  <v-btn color="primary" :disabled="invalid" type="submit">
                    {{ $t("Submit") }}
                  </v-btn>
                </div>
              </template>
              <span>
                {{ $t("Form is incomplete") }}
              </span>
            </v-tooltip>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required,
  alpha_spaces as alphaSpaces,
  max,
  email
} from "vee-validate/dist/rules";
import DatePickerField from "@/components/DatePickerField.vue";
import MultiLanguageInput from "@/components/MultiLanguageInput.vue";
import { timeCommitments } from "@/constants/timeCommitments";
import i18n from "@/i18n/i18n";
import { createTranslation } from "@/i18n/utils/create-translation";
import { cloneDeep } from "lodash";

extend("required", {
  ...required,
  message: i18n.t("This field is required.")
});
extend("email", {
  ...email,
  message: i18n.t("You must enter a valid email address.")
});
extend("alpha_spaces", {
  ...alphaSpaces,
  message: i18n.t("This field can only contain letters and spaces.")
});
extend("max", {
  ...max,
  message: (_, values) =>
    i18n.t("This field must be under {length} characters.", values)
});
extend("phone", {
  validate: (value) => {
    const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/);
    return phoneRegex.test(value);
  },
  message: i18n.t("You must enter a valid phone number")
});
extend("mattermost", {
  validate: (value) => {
    const mattermostRegex = RegExp(/^@\S+$/);
    return mattermostRegex.test(value);
  },
  message: i18n.t("You must enter a valid Mattermost Id.")
});

const initialState = () => ({
  role: {
    title: createTranslation(),
    responsibilities: createTranslation(),
    description: createTranslation(),
    requirements: createTranslation(),
    localGroupId: undefined,
    workingCircleId: undefined,
    timeCommitmentMin: undefined,
    timeCommitmentMax: undefined,
    email: undefined,
    mattermostId: undefined,
    phone: undefined,
    dueDate: undefined
  },
  timeCommitments,
  requiredLanguages: ["en", "nl"]
});

export default {
  name: "RoleEditDialog",
  components: {
    ValidationProvider,
    ValidationObserver,
    DatePickerField,
    MultiLanguageInput
  },
  props: {
    value: {
      required: true,
      type: Boolean
    },
    editRole: {
      default: null,
      type: Object
    }
  },
  data: () => initialState(),
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    formTitle() {
      return this.editRole ? this.$t("Edit Role") : this.$t("New Role");
    }
  },
  watch: {
    editRole: {
      handler(editRole) {
        if (!editRole) {
          return;
        }
        const role = cloneDeep(editRole);
        // Delete this extra field we get from the query
        delete role.__typename;

        // Initialize the requiredLanguages array based on the role languages
        this.requiredLanguages = Object.entries(role.title)
          .map(([key, value]) => value && key)
          .filter(Boolean);
        this.role = role;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions("roles", ["updateRole", "createRole"]),
    ...mapActions("alerts", ["displaySuccess", "displayError"]),
    onTimeCommitmentChange(timeCommitment) {
      this.role.timeCommitmentMin = timeCommitment.min;
      this.role.timeCommitmentMax = timeCommitment.max;
    },
    onDueDateChange(duedate) {
      this.role.dueDate = duedate;
    },
    resetState() {
      Object.assign(this.$data, initialState());
    },
    onSubmit() {
      const role = {
        ...this.role,
        title: this.parseTranslation(this.role.title),
        responsibilities: this.parseTranslation(this.role.responsibilities),
        description: this.parseTranslation(this.role.description),
        requirements: this.parseTranslation(this.role.requirements)
      };

      if (this.editRole) {
        console.log("heja");
        this.updateRole({
          id: this.editRole.id,
          ...role
        })
          .then((success) => {
            this.displaySuccess(this.$t("Role updated"));
          })
          .catch((error) => {
            this.displayError(this.$t("An error occured updating this role"));
          });
      } else {
        this.createRole(role)
          .then((succes) => {
            this.displaySuccess(this.$t("Role created"));
          })
          .catch((error) => {
            this.displayError(this.$t("An error occured creating this role"));
          });
      }
    },
    onSucces() {
      this.$emit("input", false);
      this.resetState();
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    isEmpty: (text) => !text || text.length === 0 || !text.trim(),
    parseTranslation(translation) {
      return Object.entries(translation).reduce((result, [key, value]) => {
        result[key] = this.requiredLanguages.includes(key) ? value : "";

        return result;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
