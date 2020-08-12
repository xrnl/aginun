<template>
  <default-card
    :to="`roles/view/${role.id}`"
    :color=getColour(role.workingCircle)
  >
    <template #title>
      {{ role.title }}
    </template>
    <template #subtitle>
      {{ role.localGroup.title }} <br /> {{ role.workingCircle.title }}
    </template>
    <template #meta>
      <span class="time-commitment d-flex flex-column justify-center">
        <span
          class="flex-grow-0"
          style="line-height: 1rem"
        >
          {{ role.timeCommitmentMin }} -
          {{ role.timeCommitmentMax }}
        </span>
        <span class="overline text-uppercase">hours / week</span>
      </span>
    </template>
    <template #action>
      <v-btn
        dark
        :to="`roles/view/${role.id}`"
      >
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
  methods: {
    getColour: function(workingCircle) {

      switch (workingCircle.id) {
        case 1:
          return "khaki-light";
          break;
        case 2:
          return "red-light";
          break;
        case 3:
          return "navy-light";
          break;
        case 4:
          return "yellow-light";
          break;
        case 5:
          return "lemon-light";
          break;
        case 6:
          return "navy-light";
          break;
        case 7:
          return "red-light";
          break;
        case 8:
          return "purple-light";
          break;
        case 10:
          return "yellow-light";
          break;
        case 11:
          return "blue-light";
          break;
        case 9: case 14:
          return "green-light";
          break;
        case 12:  case 13:
          return "purple-light";
          break;
        default:
          return "lemon-light";
      }
    },
  },
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.time-commitment {
  // color: red;
  font-family: "FucXed";
}
</style>
