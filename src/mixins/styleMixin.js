export default {
  computed: {
    themeClass: function() {
      return this.$vuetify.theme.dark ? "theme--dark" : "theme--light";
    }
  }
};
