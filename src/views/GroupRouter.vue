<template>
  <!-- Components do not automatically re-render with dynamic routes
  https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  :key ensures component is always re-rendered from scratch
  Eliminating the need to watch routes or navigation guards in components -->
  <router-view :key="$route.fullPath" />
</template>

<script>
  export default {
    name: "GroupRouter",
  }
</script>
