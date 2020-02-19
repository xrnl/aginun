<template>
  <v-dialog :value="value" width="600px" @input="$emit('input', false)">
    <v-card class="pa-4">
      <v-text-field v-model="title" label="Title" required />
      <v-select
        v-model="localGroup"
        :items="localGroups"
        item-value="value"
        item-text="text"
        return-object
        label="Local group"
      />
      <v-select
        v-model="workingGroup"
        :items="workingGroups"
        item-value="value"
        item-text="text"
        return-object
        label="Working group"
      />
      <p style="color: gray" class="caption">
        Responsibilities
      </p>
      <v-text-field
        v-model="newResponsibility"
        label="Add new responsibility"
        solo
        @keypress.enter="addResponsibility"
      >
        <template v-slot:append>
          <v-btn
            text
            icon
            small
            color="primary"
            :disabled="!newResponsibility"
            @click="addResponsibility"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-card v-if="responsibilities.length > 0" class="mb-4">
        <template v-for="(r, i) in responsibilities">
          <v-divider v-if="i !== 0" :key="`${i}-divider`" />
          <v-list-item :key="`${i}-${r}`" class="d-flex justify-space-between">
            <span>{{ r }}</span>
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
      <v-textarea
        v-model="requirements"
        label="Requirements"
        placeholder="Skills, experience, equipment"
        required
      />
      <v-textarea
        v-model="description"
        label="Description"
        placeholder="Any additional information not specified in the set of responsibilities.
        
This can include information about the circle or the specific project that the role is needed for."
        required
      />
      <v-select
        v-model="timeCommitment"
        :items="roleTimeCommitments"
        item-value="min"
        return-object
        label="Time commitment"
      >
        <template v-slot:item="{ item }">
          {{ item.min }} - {{ item.max }} hours/week
        </template>
        <template v-slot:selection="{ item }">
          {{ item.min }} - {{ item.max }} hours/week
        </template>
      </v-select>
      <p class="caption mb-0" style="color: gray">
        Contact details
      </p>
      <v-text-field v-model="email" label="Email" />
      <v-text-field v-model="mattermostId" label="Mattermost id" />
      <v-text-field v-model="phone" label="Phone number" />
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" text @click="$emit('input', false)">
          Cancel
        </v-btn>

        <v-btn color="primary" @click="publishRole">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  },
  methods: {
    ...mapActions("roles", ["addRole"]),
    addResponsibility: function() {
      this.responsibilities.push(this.newResponsibility);
      this.newResponsibility = "";
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
