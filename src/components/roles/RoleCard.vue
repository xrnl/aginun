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
        <span class="overline text-uppercase">{{ $t("hours / week") }}</span>
      </span>
    </template>
    <template #action>
      <v-btn dark :to="`roles/view/${role.id}`">
        {{ $t("Read More") }}
      </v-btn>
    </template>
  </default-card>
</template>
<script>
import DefaultCard from "@/components/layout/DefaultCard.vue";
import styles from "@/constants/styles";

export default {
  name: "RoleCard",
  components: {
    DefaultCard
  },
  data: () => ({
    workingCircleColours: styles.workingCircleColours
  }),
  props: {
    role: {
      type: Object,
      required: true
    }
  },
  methods: {
    getColour(workingCircle) {
      return this.workingCircleColours[workingCircle.title];
    }
  }
};
</script>

<style lang="scss" scoped>
.overline {
  font-family: unset !important;
}
</style>
