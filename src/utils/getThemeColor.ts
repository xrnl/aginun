export default function(vuetifyTheme, themeColor) {
  /**
   * returns the hex color value of the themeColor in vuetifyTheme
   *
   * function must be used within a component computed property for the return
   * color to change when the user toggles between light and dark mode. example:
   *
   * computed: {
   *   color() {
   *     return getThemeColor(this.$vuetify.theme, this.themeColor);
   *   },
   * },
   *
   * @param {Object} vuetifyTheme must be this.$vuetify.theme
   * @param {String} themeColor one of the strings in themeColorNames
   * @return {String} hex color value of themeColor
   */
  return vuetifyTheme.dark
    ? vuetifyTheme.themes.dark[themeColor]
    : vuetifyTheme.themes.light[themeColor];
}
