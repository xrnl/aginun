<template>
  <default-card
    :to="`roles/view/${role.id}`"
    :color="getColour(role.workingCircle)"
  >
    <template #title>
      {{ role.title }}
    </template>
    <template #subtitle>
      {{ role.localGroup.title }} <br />
      {{ role.workingCircle.title }}
    </template>
    <template #meta>
      <span class="xr-title d-flex flex-column justify-center">
        <span class="flex-grow-0" style="line-height: 1rem">
          {{ role.timeCommitmentMin }} -
          {{ role.timeCommitmentMax }}
        </span>
        <span class="overline text-uppercase">hours / week</span>
      </span>
    </template>
    <template #action>
      <v-btn dark :to="`roles/view/${role.id}`">
        Read More
      </v-btn>
    </template>
  </default-card>
</template>

<script>
import { mapState } from "vuex";
import DefaultCard from "@/components/layout/DefaultCard.vue";

export default {
  name: "RoleCard",
  components: {
    DefaultCard,
  },
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("styles", ["workingCircleColours"]),
  },
  methods: {
    getColour: function(workingCircle) {
      return this.workingCircleColours[workingCircle.title];
    },
  },
};
</script>

<style lang="scss" scoped></style>
