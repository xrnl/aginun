<script>
import EditDialogMixin from "../EditDialogMixin";
import { mapActions } from "vuex";

export default {
  name: "RoleEditDialog",
  mixins: [EditDialogMixin],
  props: {
    editRole: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    form_title: "Edit Role",
  }),
  created: function() {
    for (var key in this.role) {
      if (key in this.editRole) {
        this.role[key] = this.editRole[key];
      }
    }
    this.role.workingCircleId = this.editRole.workingCircle.id;
    this.role.localGroupId = this.editRole.localGroup.id;
  },
  methods: {
    ...mapActions("roles", ["updateRole"]),
    onSubmit: function() {
      this.updateRole({ id: this.editRole.id, ...this.role });
      this.$emit("input", false);
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
