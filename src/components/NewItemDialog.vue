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
      <v-card v-if="responsibilities.length > 0">
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
        placeholder="Skills, experience, equipment..."
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
      <v-text-field v-model="matterMostId" label="Mattermost id" />
      <v-text-field v-model="phone" label="Phone number" />
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" text @click="$emit('input', false)">
          Cancel
        </v-btn>

        <v-btn color="primary" @click="$emit('input', false)">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NewItemDialog",
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    title: "",
    newResponsibility: "",
    responsibilities: [],
    description: "",
    requirements: "",
    timeCommitment: undefined,
    localGroup: undefined,
    workingGroup: undefined,
    email: "",
    matterMostId: "",
    phone: "",
  }),
  computed: {
    ...mapState("meta", ["roleTimeCommitments"]),
    ...mapState("localGroups", ["localGroups"]),
    ...mapState("workingGroups", ["workingGroups"]),
  },
  methods: {
    addResponsibility: function() {
      this.responsibilities.push(this.newResponsibility);
      this.newResponsibility = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
