<template>
  <div>
    <v-dialog
      persistent
      max-width="750"
      value="true"
      @click:outside="$router.push('/roles')"
      @keydown.escape="$router.push('/roles')"
    >
      <v-card v-if="!!role" class="card">
        <v-card-title>
          <flex-wrapper
            classes="flex-nowrap align-start"
            justify-content="space-between"
            style="width: 100%"
          >
            <flex-wrapper direction="column">
              <h2 class="boldTitle">
                {{ role.title }}
              </h2>
              <flex-wrapper
                v-if="role.working_group || role.local_group"
                class="subHeader"
                classes="flex-wrap"
              >
                <span>
                  {{ !!role.working_group && role.working_group.name }}
                </span>
                <span
                  v-if="!!role.working_group && !!role.local_group"
                  style="margin: 0 0.25rem;"
                >
                  -
                </span>
                <span>
                  {{ !!role.local_group && role.local_group.name }}
                </span>
              </flex-wrapper>
              <div v-if="role.date_added" style="line-height: 1rem">
                <span class="caption">
                  Published on {{ role.date_added }}
                </span>
              </div>
            </flex-wrapper>
            <v-menu offset-y left>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on">
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="console.log('event for editing role')">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="console.log('event for deleting role')">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </flex-wrapper>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-3 pb-0 solidFont">
          <flex-wrapper>
            <div>
              <meta-info
                v-if="!!role.responsibilities"
                title="Responsibilities"
                :description="role.responsibilities"
              />
              <meta-info
                v-if="!!role.description"
                title="Description"
                :description="role.description"
              />
              <meta-info
                v-if="!!role.requirements"
                title="Requirements"
                :description="role.requirements"
              />
              <meta-info
                v-if="!!role.time_commitment_min"
                title="Time Commitment"
                :description="
                  `${role.time_commitment_min} -
                ${role.time_commitment_max} hours/week`
                "
              />
            </div>
          </flex-wrapper>
        </v-card-text>
        <v-card-actions class="px-6 pt-0 pb-4">
          <v-btn
            color="primary"
            class="mr-1"
            depressed
            @click.stop="applyDialog = true"
          >
            Apply
          </v-btn>
          <v-btn depressed>
            <v-icon class="mr-1">
              mdi-check
            </v-icon>
            Role taken
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="applyDialog" max-width="500" content-class>
      <v-card>
        <v-card-title>
          <h4>Apply</h4>
        </v-card-title>
        <v-card-text class="solidFont">
          <flex-wrapper direction="column">
            <p>Please apply by contacting the role aide.</p>
            <icon-link
              v-if="role.email"
              :href="
                `mailto:${role.email}?subject=Role application: ${role.title}`
              "
              :text="role.email"
              label="Email"
              icon="mdi-email"
            />
            <icon-link
              v-if="role.mattermost_id"
              :href="
                `https://organise.earth/xr-netherlands/messages/${role.mattermost_id}`
              "
              :text="role.mattermost_id"
              label="Mattermost"
              icon="mdi-message"
            />
            <icon-link
              v-if="role.phone"
              :href="`tel:${role.phone}`"
              :text="role.phone"
              label="Phone"
              icon="mdi-phone"
            />
          </flex-wrapper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FlexWrapper from "../layout/FlexWrapper";
import IconLink from "@/components/IconLink";
import MetaInfo from "../layout/MetaInfo";
import { RoleAllInfoServer, RoleDetailClient } from "@/apollo/gql/role.gql";
export default {
  components: {
    FlexWrapper,
    MetaInfo,
    IconLink,
  },
  data() {
    return {
      applyDialog: false,
      role: {},
    };
  },
  computed: {
    formattedDate: function() {
      const date = new Date(this.role.date_added);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-GB", options);
    },
  },
  apollo: {
    role: {
      query: RoleDetailClient,
      variables: function() {
        return { id: this.$route.params.id };
      },
      update(data) {
        // console.log("ROLE DETAIL", data);
        return data.getRoleData.roleDetail;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.solidFont {
  color: rgba(0, 0, 0, 0.87) !important;
}

.theme--dark {
  .solidFont {
    color: white !important;
  }
}

.subHeader {
  font-size: 0.83em;
}

.boldTitle {
  font-size: 1.5rem !important;
  font-weight: bold;
}
</style>
