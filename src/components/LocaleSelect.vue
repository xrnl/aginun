<template>
  <v-select
    style="max-width: 130px; z-index: 16"
    hide-details
    v-model="$i18n.locale"
    :items="locales"
    item-text="label"
    item-value="code"
    dense
    solo
  ></v-select>
</template>

<script>
export default {
  name: "LocaleSelect",
  data: () => ({
    locales: [
      {
        code: "en",
        label: "English"
      },
      {
        code: "nl",
        label: "Dutch"
      }
    ]
  })
};
</script>
