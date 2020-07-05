<script>
import EditDialogMixin from "../EditDialogMixin";
import { mapActions } from "vuex";

export default {
  name: "RoleEditDialog",
  mixins: [EditDialogMixin],
  props: {
    role: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    form_title: "Edit Role",
  }),
  created: function() {
    //   This feels a little dangerous, find a cleaner way
    const keys = Object.keys(this.role);
    keys.forEach(value => (this[value] = this.role[value]));
    this.workingCircleId = this.role.workingCircle.id;
    this.localGroupId = this.role.localGroup.id;
  },
  methods: {
    ...mapActions("roles", ["updateRole"]),
    onSubmit: function() {
      const role = JSON.parse(JSON.stringify(this.$data));
      delete role["newResponsibility"];
      delete role["$apolloData"];
      delete role["form_title"];

      this.updateRole({ id: this.role.id, ...role });

      this.$emit("input", false);

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
