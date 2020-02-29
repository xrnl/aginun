<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 12 : 2" width="300" height="200" class="card">
      <div
        class="transition-wrapper d-flex flex-column full-height"
        :class="{ lighter: hover && $vuetify.theme.dark }"
      >
        <template v-if="!!$slots.header && !!$slots.header[0]">
          <div class="d-flex align-center pa-3">
            <slot name="header" />
          </div>
          <v-divider />
        </template>
        <div class="pa-3 d-flex flex-column justify-space-between flex-grow-1">
          <div>
            <h3><slot name="title" /></h3>
            <div class="caption">
              <slot name="subtitle" />
            </div>
            <v-card-text
              v-if="!!$slots.content && !!$slots.content[0]"
              class="pa-3"
            >
              <slot name="content" />
            </v-card-text>
          </div>
          <div class="d-flex flex-wrap justify-space-between align-end mt-5">
            <span class="d-flex flex-column justify-center">
              <slot name="meta" />
            </span>
            <div>
              <slot name="action" />
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
.transition-wrapper {
  transition: background-color 280ms;
}
.lighter {
  background-color: #333333 !important;
}
</style>
