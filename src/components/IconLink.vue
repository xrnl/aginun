<template>
  <div>
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    <a :href="href" target="_blank">{{ text }}</a>
  </div>
</template>

<script>
export default {
  name: "IconLink",
  props: {
    href: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
  },
};
</script>
