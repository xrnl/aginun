<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="formatDate(date)"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      :value="date"
      :first-day-of-week="1"
      :show-current="false"
      :min="min"
      no-title
      @input="updateDate"
    />
  </v-menu>
</template>

<script>
export default {
  name: "DatePickerField",
  props: {
    date: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: new Date().toISOString()
    },
    label: {
      type: String,
      required: true
    }
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    formatDate(date) {
      if (!date) {
        return null;
      }
      const [year, month, day] = date.split("-");
      return `${day.substr(0, 2)}/${month.substr(0, 2)}/${year}`;
    },
    updateDate(date) {
      this.showMenu = false;
      this.$emit("update", new Date(date).toISOString());
    }
  }
};
</script>
