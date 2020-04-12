<template>
  <default-card :to="`tasks/view/${task.id}`">
    <template #title>
      {{ task.title }}
    </template>
    <template #subtitle>
      {{ task.localGroup.title }}, {{ task.workingCircle.title }}
    </template>
    <template #meta>
      <span class="d-flex flex-column justify-center">
        <span class="title flex-grow-0" style="line-height: 1rem">
          {{ task.timeCommitment.min }} -
          {{ task.timeCommitment.max }}
        </span>
        <span class="overline text-uppercase">hours</span>
      </span>
    </template>
    <template #action>
      <v-btn text dark color="primary" :to="`tasks/view/${task.id}`">
        Read More
      </v-btn>
    </template>
  </default-card>
</template>
<script>
import DefaultCard from "@/components/layout/DefaultCard.vue";
export default {
  components: { DefaultCard },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
