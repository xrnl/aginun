<template>
  <v-container class="container-thin">
    <slot />
  </v-container>
</template>

<script>
export default {
  name: "TheContainer"
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/variables";
$viewports: "md" "lg" "xl";
$width-navigation-drawer: 256;

.container-thin {
  @each $v in $viewports {
    @media (min-width: map-get($grid-breakpoints, $v)) {
      max-width: map-get($container-max-widths, $v) - $width-navigation-drawer;
    }
  }
}
</style>
