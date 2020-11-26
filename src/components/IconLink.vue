<template>
  <div>
    <v-icon small class="mr-2" color="primary">
      {{ icon }}
    </v-icon>
    <span class="font-weight-bold">{{ label }} </span>
    <a :href="href" target="_blank">{{ linkText }}</a>
  </div>
</template>

<script>
import { hrefValidator, iconValidator } from "@/utils/validators";

export default {
  name: "IconLink",
  props: {
    href: {
      required: true,
      type: String,
      validator: hrefValidator
    },
    linkText: {
      required: true,
      type: String
    },
    label: {
      required: false,
      default: "",
      type: String
    },
    icon: {
      required: true,
      type: String,
      validator: iconValidator
    }
  }
};
</script>
