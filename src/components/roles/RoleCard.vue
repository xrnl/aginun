<template>
  <default-card :to="`roles/view/${role.id}`">
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
};
</script>

<style lang="scss" scoped></style>
