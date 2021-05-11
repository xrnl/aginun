<template>
  <v-dialog :value="value" width="750" @input="$emit('input', false)">
    <v-card>
      <v-card-title>
        <i18n path="Are you sure you want to delete {roleTitle}?" tag="h3">
          <template v-slot:roleTitle>
            <span class="carrier">{{ roleTitle }}</span>
          </template>
        </i18n>
      </v-card-title>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" text @click="$emit('input', false)">
          {{ $t("Cancel") }}
        </v-btn>
        <v-btn color="error" @click="onDeleteRole">
          {{ $t("Delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "DeleteRoleConfirmation",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: Number,
      required: true
    },
    roleTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions("roles", ["deleteRole"]),
    ...mapActions("alerts", ["displaySuccess", "displayError"]),
    onDeleteRole() {
      this.deleteRole(this.roleId)
        .then(() => {
          this.displaySuccess("Role deleted");
          this.$emit("input", false);
          this.$router.push("/roles");
        })
        .catch(() => {
          this.displayError(
            this.$t("An error occured during deleting this role")
          );
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.carrier {
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 6px;
  padding: 0.25rem;
}
</style>
