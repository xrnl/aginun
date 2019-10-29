<template>
  <v-navigation-drawer
    app
    :mobile-break-point="this.$vuetify.breakpoint.thresholds.sm"
    dark
    color="relief"
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list
      nav
      class="pt-5"
    >
      <v-list-item-group class="pl-5">
        <v-list-item
          :to="{ name: 'profile'}"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'explore'}"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-charity</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Explore
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-group
        v-model="viewGroups"
        class="mt-8"
        color="shade"
        active-class="v-list-item--active"
      >
        <template v-slot:activator>
          <div class="mr-n5">
            <title-subtitle
              :title="selected.working"
              :subtitle="`${selected.local}, ${selected.country}`"
            />
          </div>
        </template>
        <v-list-item
          v-for="circle in myCircles"
          :key="circle.id"
          :to="{ path: `${url(circle.id)}/` }"
          @click.native="updateSelected(circle.id)"
        >
          <title-subtitle
            :title="circle.working"
            :subtitle="`${circle.local}, ${circle.country}`"
          />
        </v-list-item>
      </v-list-group>
      <v-divider class="mb-2" />


      <v-list-item-group
        class="pl-5"
      >
        <v-list-item
          :to="{ path: URLtask }"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Tasks
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ path: URLrole }"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Roles
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <v-divider />
      <v-list class="pa-0">
        <v-list-item
          :to="{ name: 'settings'}"
          exact
        >
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import TitleSubtitle from '@/components/TitleSubtitle.vue'

  export default {
    name: "TheNavigationDrawer",
    components: {
      TitleSubtitle
    },
    props: {
      value: {
        required: true,
        validator: value => typeof value === "boolean" || value === null
      }
    },
    data: function () {
      return {
        viewGroups: false
      }
    },
    computed: {
      ...mapState('circles',['myCircles']),
      ...mapGetters('circles',['selected', 'url']),
      URLtask: function () {
        return `${this.url(this.selected.id)}/tasks`
      },
      URLrole: function () {
        return `${this.url(this.selected.id)}/roles`
      },
    },
    watch: {
      '$route' (to, from) {
        // react to route changes
        this.viewGroups = false;
        // hide sidebar on mobile devices
        if (this.$vuetify.breakpoint.smAndDown) this.$emit('input', false)
      }
    },
    methods: {
      ...mapMutations('circles', ['updateSelected']),
    }
  }
</script>

<style lang="scss" scoped>

</style>
