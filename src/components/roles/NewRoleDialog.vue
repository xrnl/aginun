<script>
import EditDialogMixin from "../EditDialogMixin";
import { mapActions } from "vuex";

export default {
  name: "NewRoleDialog",
  mixins: [EditDialogMixin],
  data: () => ({
    form_title: "New Role",
  }),
  methods: {
    ...mapActions("roles", ["createRole"]),
    onSubmit: function() {
      const role = JSON.parse(JSON.stringify(this.$data));
      delete role["newResponsibility"];
      delete role["$apolloData"];
      delete role["form_title"];

      this.createRole(role);

      this.$emit("input", false);
      this.resetState();

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
  },
};
</script>
