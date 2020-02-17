<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 12 : 2" width="300" height="200" class="card">
      <div
        class="transition-wrapper d-flex flex-column full-height"
        :class="{ lighter: hover && $vuetify.theme.dark }"
      >
        <div class="d-flex justify-space-between align-center pa-3">
          <span>{{ role.workingGroup.text }}</span>
          <v-icon color="primary">
            mdi-police-badge
          </v-icon>
        </div>
        <v-divider />
        <div class="pa-3 d-flex flex-column flex-grow-1 justify-space-between">
          <div>
            <h3>{{ role.title }}</h3>
            <div class="caption">
              {{ role.localGroup.text }}, {{ role.location }}
            </div>
          </div>
          <div class="d-flex flex-wrap justify-space-between align-end mt-5">
            <span class="d-flex flex-column justify-center">
              <span class="title flex-grow-0" style="line-height: 1rem">
                {{ role.timeCommitment.min }} -
                {{ role.timeCommitment.max }}
              </span>
              <span class="overline text-uppercase">hours / week</span>
            </span>
            <v-btn text dark color="primary" :to="`roles/view/${role.id}`">
              Read More
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: "RoleCard",
    props: {
      role: {
        type: Object,
        required: true,
        // might look into more managable prop validation, this might be hard to update when roles get more/less properties.
        // making components always render, even with missing properties might be okay
        // (i.e. the time commitment won't show when a role doesn't have a time commitment)
        // or every property is a seperate prop, but you might have the same problem

        /*validator: function(obj) {
        return (
          has(obj, "id") &&
          Number.isInteger(obj.id) &&
          has(obj, "title") &&
          typeof obj.title === "string" &&
          has(obj, "workingGroup") &&
          typeof obj.workingGroup === "string" &&
          has(obj, "localGroup") &&
          typeof obj.localGroup === "string" &&
          has(obj, "location") &&
          typeof obj.location === "string" &&
          has(obj, "timeCommitment") &&
          typeof obj.timeCommitment === "object" &&
          Number.isInteger(obj.timeCommitment.min) &&
          Number.isInteger(obj.timeCommitment.max)
        );
      }*/
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    margin: 0em 1em 2em 1em;
    @media (max-width: "550px") {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 1em;
    }
  }

  .pointer:hover {
    cursor: pointer;
  }

  .button--text:hover {
    opacity: 0.7;
  }

  .transition-wrapper {
    transition: background-color 280ms;
  }

  .lighter {
    background-color: #333333 !important;
  }

  .full-height {
    height: 100%;
  }
</style>
