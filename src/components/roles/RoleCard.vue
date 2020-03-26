<template>
  <default-card>
    <template #header>
      {{ role.workingCircle.title }}
    </template>
    <template #title>
      {{ role.title }}
    </template>
    <template #subtitle>
      {{ role.localGroup.title }}
    </template>
    <template #meta>
      <span class="d-flex flex-column justify-center">
        <span class="title flex-grow-0" style="line-height: 1rem">
          {{ role.timeCommitmentMin }} -
          {{ role.timeCommitmentMax }}
        </span>
        <span class="overline text-uppercase">hours / week</span>
      </span>
    </template>
    <template #action>
      <v-btn text dark color="primary" :to="`roles/view/${role.id}`">
        Read More
      </v-btn>
    </template>
  </default-card>
</template>

<script>
import DefaultCard from "@/components/surfaces/DefaultCard.vue";
export default {
  name: "RoleCard",
  components: {
    DefaultCard,
  },
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
          has(obj, "workingCircle") &&
          typeof obj.workingCircle === "string" &&
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

<style lang="scss" scoped></style>
