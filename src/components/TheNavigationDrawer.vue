<template>
  <v-navigation-drawer
    app
    :mobile-break-point="this.$vuetify.breakpoint.thresholds.sm"
    dark
    color="relief"
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list nav class="pt-5">
      <v-list-item-group class="px-5 mb-8">
        <v-list-item :to="{ name: 'profile' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'explore' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-charity</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Explore
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <div v-if="hasGroups">
        <v-list-group v-model="viewGroups" color="shade--base">
          <template v-slot:activator>
            <title-subtitle
              :title="selected.working"
              :subtitle="`${selected.local}, ${selected.country}`"
              style="flex-grow: 1"
              class="mr-n5"
            />
          </template>
          <v-list-item
            v-for="group in notSelected"
            :key="group.id"
            :to="{ path: `${url(group.id)}/roles` }"
            @click.native="updateSelected(group.id)"
          >
            <title-subtitle
              :title="group.working"
              :subtitle="`${group.local}, ${group.country}`"
            />
          </v-list-item>

          <button-icon @click="addGroup">
            <template #icon>
              mdi-plus
            </template>
            Add circle
          </button-icon>
        </v-list-group>
        <v-divider class="mb-2" />

        <v-list-item-group class="px-5">
          <!-- <v-list-item
            :to="{ path: URLtask }"
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-playlist-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Tasks
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item :to="{ path: URLrole }" exact>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Roles
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </div>
      <button-add-group v-else @click="addGroup" />
    </v-list>

    <template v-slot:append>
      <v-divider />
      <v-list class="pa-0">
        <v-list-item :to="{ name: 'settings' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Settings
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import TitleSubtitle from "@/components/TitleSubtitle";
  import ButtonIcon from "@/components/ButtonIcon";

  export default {
    name: "TheNavigationDrawer",
    components: {
      TitleSubtitle,
      ButtonIcon,
    },
    props: {
      value: {
        required: true,
        validator: value => typeof value === "boolean" || value === null,
      },
    },
    data: function() {
      return {
        viewGroups: false,
      };
    },
    computed: {
      ...mapGetters("groups", ["selected", "notSelected", "hasGroups", "url"]),
      URLtask: function() {
        return `${this.url(this.selected.id)}/tasks`;
      },
      URLrole: function() {
        return `${this.url(this.selected.id)}/roles`;
      },
    },
    watch: {
      $route(to, from) {
        // react to route changes
        this.viewGroups = false;
        // hide sidebar on mobile devices
        if (this.$vuetify.breakpoint.smAndDown) this.$emit("input", false);
      },
    },
    methods: {
      ...mapMutations("groups", ["updateSelected", "removeGroup"]),
      addGroup: function() {
        console.log("this method should show modal/page for adding a group");
        this.removeGroup();
      },
    },
  };
</script>

<style lang="scss" scoped></style>
