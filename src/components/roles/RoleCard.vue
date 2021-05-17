<template>
  <default-card
    :to="`roles/view/${role.id}`"
    :color="workingCirclesMap[role.workingCircleId].colour"
    :title="role.title[$i18n.locale]"
    :secondaryInfo="localGroupsMap[role.localGroupId].title"
    :subtitle="`${role.timeCommitmentMin} - ${role.timeCommitmentMax}`"
    :subtitleExtra="$t('hours / week')"
  >
    <template #title>
      {{ role.title[$i18n.locale] }}
    </template>
    <!-- <template #subtitle>
      {{ localGroupsMap[role.localGroupId].title }} <br />
      {{ workingCirclesMap[srole.workingCircleId].title[$i18n.locale] }}
    </template> -->
    <template #secondary>
      {{ workingCirclesMap[role.workingCircleId].title[$i18n.locale] }}
    </template>
    <template #meta>
      <span class="xr-title d-flex flex-column justify-center">
        <span class="flex-grow-0" style="line-height: 1rem">
          :title="role.title[$i18n.locale]"
        </span>
        <span class="overline text-uppercase"></span>
      </span>
    </template>
  </default-card>
</template>
<script>
import DefaultCard from "@/components/layout/DefaultCard.vue";
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
  props: {
    role: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.overline {
  font-family: unset !important;
}
</style>
