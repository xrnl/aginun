<template>
  <v-snackbar
    transition="v-expand-transition"
    top
    :color="alert.color"
    :value="alertOn"
    @input="disableAlert"
  >
    {{ alert.message }}
    <v-icon dark>
      {{ alert.icon }}
    </v-icon>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "FeedbackAlert",
  computed: {
    ...mapState("alerts", ["alert", "alertOn"])
  },
  methods: {
    ...mapMutations("alerts", ["disableAlert"])
  }
};
</script>

<style lang="scss" scoped></style>
