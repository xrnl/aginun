<template>
  <default-card
    :to="`roles/view/${role.id}`"
    :color="getColour(workingCirclesMap[role.workingCircleId])"
  >
    <template #title>
      {{ role.title[$i18n.locale] }}
    </template>
    <template #subtitle>
      {{ localGroupsMap[role.localGroupId].title }} <br />
      {{ workingCirclesMap[role.workingCircleId].title[$i18n.locale] }}
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
import { mapGetters } from "vuex";

export default {
  name: "RoleCard",
  components: {
    DefaultCard
  },
  computed: {
    ...mapGetters({
      localGroupsMap: "groups/localGroupsMap",
      workingCirclesMap: "groups/workingCirclesMap"
    })
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
      const fallbackColour = "khaki-light";
      return (
        this.workingCircleColours[workingCircle.title[this.$i18n.locale]] ||
        fallbackColour
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.overline {
  font-family: unset !important;
}
</style>
