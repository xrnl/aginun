<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      width="300"
      height="180"
      class="card"
      :class="`bg-${color}`"
      v-bind="$attrs"
    >
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
            <h3>
              <slot name="title" />
            </h3>
            <slot name="subtitle" />
            <v-card-text
              v-if="!!$slots.content && !!$slots.content[0]"
              class="pa-3"
            >
              <slot name="content" />
            </v-card-text>
          </div>
          <div class="d-flex flex-wrap justify-space-between align-end">
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
export default {
  name: "DefaultCard",
  props: {
    color: {
      type: String,
      required: false,
      default: "angry-light"
    }
  }
};
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
