<template>
  <v-dialog :value="value" width="600px" @input="$emit('input', false)">
    <v-card class="pa-4">
      <h2>New role</h2>
      <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(publishRole)">
          <validation-provider
            v-slot="{ errors }"
            rules="required|alpha_spaces|max:30"
            name="title"
          >
            <v-text-field
              v-model="title"
              label="Title"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="requiredSelect"
            name="local group"
          >
            <v-select
              v-model="localGroup"
              :items="localGroups"
              item-value="value"
              item-text="text"
              return-object
              label="Local group"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="requiredSelect"
            name="working group"
          >
            <v-select
              v-model="workingGroup"
              :items="workingGroups"
              item-value="value"
              item-text="text"
              return-object
              label="Working group"
              :error-messages="errors"
            />
          </validation-provider>
          <p style="color: gray" class="caption">
            Responsibilities
          </p>
          <validation-provider
            v-slot="{ errors }"
            :rules="`${responsibilities.length < 1 ? 'requiredList' : ''}`"
            mode="eager"
            name="responsibility"
          >
            <v-text-field
              v-model="newResponsibility"
              label="Add new responsibility"
              solo
              :error-messages="errorResponsibility || errors"
              @keypress.enter="addResponsibility"
            >
              <template v-slot:append>
                <v-btn
                  text
                  icon
                  small
                  color="primary"
                  :disabled="!validResponsibility"
                  @click="addResponsibility"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </validation-provider>
          <v-card v-if="responsibilities.length > 0" class="mb-4">
            <template v-for="(responsibility, i) in responsibilities">
              <v-divider v-if="i !== 0" :key="`${i}-divider`" />
              <v-list-item
                :key="`${i}-${responsibility}`"
                class="d-flex justify-space-between"
              >
                <span>{{ responsibility }}</span>
                <v-btn
                  text
                  icon
                  color="gray"
                  @click="responsibilities.splice(i, 1)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item>
            </template>
          </v-card>
          <validation-provider
            v-slot="{ errors }"
            rules="max:1000"
            name="requirements"
          >
            <v-textarea
              v-model="requirements"
              label="Requirements (optional)"
              placeholder="Skills, experience, equipment"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="max:1000"
            name="description"
          >
            <v-textarea
              v-model="description"
              label="Description (optional)"
              placeholder="Any additional information not specified in the set of responsibilities.
        
This can include information about the circle or the specific project that the role is needed for."
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="requiredSelect"
            name="time commitment"
          >
            <v-select
              v-model="timeCommitment"
              :items="roleTimeCommitments"
              item-value="min"
              return-object
              label="Time commitment"
              :error-messages="errors"
            >
              <template v-slot:item="{ item }">
                {{ item.min }} - {{ item.max }} hours/week
              </template>
              <template v-slot:selection="{ item }">
                {{ item.min }} - {{ item.max }} hours/week
              </template>
            </v-select>
          </validation-provider>
          <p class="caption mb-0" style="color: gray">
            Contact details
          </p>
          <validation-provider
            v-slot="{ errors }"
            name="email address"
            mode="eager"
            rules="required|email|max:50"
          >
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Mattermost Id"
            mode="eager"
            rules="mattermost|max:50"
          >
            <v-text-field
              v-model="mattermostId"
              label="Mattermost id (optional)"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="phone|max:20"
            mode="eager"
            name="phone number"
          >
            <v-text-field
              v-model="phone"
              label="Phone number (optional)"
              :error-messages="errors"
            />
          </validation-provider>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" text @click="$emit('input', false)">
              Cancel
            </v-btn>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div v-on="invalid ? on : undefined">
                  <v-btn color="primary" :disabled="invalid" type="submit">
                    Submit
                  </v-btn>
                </div>
              </template>
              <span>
                Form is incomplete
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
import { required, alpha_spaces, max, email } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: fieldName => {
    let article;
    if (fieldName.split(" ")[0].endsWith("s")) {
      article = "";
    } else if (/^([aeiou])/i.test(fieldName)) {
      article = "an";
    } else {
      article = "a";
    }

    return `You must specify ${article} ${fieldName}.`;
  },
});
extend("requiredSelect", {
  ...required,
  message: "You must select a {_field_}.",
});
extend("requiredList", {
  validate: () => false,
  message: "You must add at least one {_field_}.",
});
extend("email", { ...email, message: "You must enter a valid email address." });
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "The {_field_} can only contain letters and spaces.",
});
extend("max", {
  ...max,
  params: ["length"],
  message: "The {_field_} must be under {length} characters.",
});
extend("phone", {
  validate: value => {
    const phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/);
    return phoneRegex.test(value);
  },
  message: "You must enter a valid phone number",
});
extend("mattermost", {
  validate: value => {
    const mattermostRegex = RegExp(/^@\S+$/);
    return mattermostRegex.test(value);
  },
  message: "You must enter a valid Mattermost Id.",
});

let initialState = () => ({
  title: undefined,
  newResponsibility: undefined,
  responsibilities: [],
  description: undefined,
  requirements: undefined,
  timeCommitment: undefined,
  localGroup: undefined,
  workingGroup: undefined,
  email: undefined,
  mattermostId: undefined,
  phone: undefined,
});

export default {
  name: "NewItemDialog",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => initialState(),
  computed: {
    ...mapState("meta", ["roleTimeCommitments"]),
    ...mapState("localGroups", ["localGroups"]),
    ...mapState("workingGroups", ["workingGroups"]),
    errorResponsibility: function() {
      const maxCharsResponsibility = 200;
      if (this.newResponsibility) {
        if (this.responsibilities.length == 10) {
          return "You can enter a maximum of 10 responsibilities";
        }
        if (this.newResponsibility.length > maxCharsResponsibility) {
          return `The responsibility must be under ${maxCharsResponsibility} characters.`;
        }
      }
      return null;
    },
    validResponsibility: function() {
      return !this.isEmpty(this.newResponsibility) && !this.errorResponsibility;
    },
  },
  methods: {
    ...mapActions("roles", ["addRole"]),
    addResponsibility: function() {
      if (this.validResponsibility) {
        this.responsibilities.push(this.newResponsibility);
        this.newResponsibility = undefined;
      }
    },
    resetState: function() {
      Object.assign(this.$data, initialState());
    },
    publishRole: function() {
      const role = JSON.parse(JSON.stringify(this.$data));
      delete role["newResponsibility"];

      this.addRole(role);

      this.$emit("input", false);
      this.resetState();

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    isEmpty: text => !text || text.length == 0 || !text.trim(),
  },
};
</script>

<style lang="scss" scoped></style>
