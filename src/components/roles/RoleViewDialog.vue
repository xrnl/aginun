<template>
  <div>
    <div v-if="!!role.id">
      <role-deletion-confirm v-model="isDeleteOpen" :role-title="role.title" :role-id="role.id" />
      <role-edit-dialog v-model="isEditOpen" :edit-role="role" />
    </div>

    <v-dialog
      persistent
      max-width="750"
      value="true"
      @click:outside="$router.push('/roles')"
      @keydown.escape="$router.push('/roles')"
    >
      <v-card>
        <transition name="fade" mode="out-in">
          <v-skeleton-loader v-if="$apollo.loading" key="roleLoading" class="mx-auto" type="article" />
          <div v-else key="role">
            <v-card-title>
              <flex-wrapper classes="flex-nowrap align-start" justify-content="space-between" style="width: 100%">
                <flex-wrapper direction="column">
                  <h2 class="boldTitle">
                    {{ role.title }}
                  </h2>
                  <flex-wrapper v-if="role.workingCircle || role.localGroup" class="subHeader" classes="flex-wrap">
                    <span>
                      {{ !!role.workingCircle && role.workingCircle.title }}
                    </span>
                    <span v-if="!!role.workingCircle && !!role.localGroup" style="margin: 0 0.25rem;">
                      -
                    </span>
                    <span>
                      {{ !!role.localGroup && role.localGroup.title }}
                    </span>
                  </flex-wrapper>
                  <div v-if="role.createdDate" style="line-height: 1rem">
                    <span class="caption"> Published on {{ formatDate(role.createdDate) }} </span>
                  </div>
                </flex-wrapper>
                <v-menu v-if="!role.filledDate" offset-y left>
                  <template v-slot:activator="{ on }">
                    <v-btn text icon v-on="on">
                      <v-icon>
                        mdi-dots-vertical
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="isEditOpen = true">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="isDeleteOpen = true">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </flex-wrapper>
            </v-card-title>
            <v-divider />
            <template v-if="!role.filledDate">
              <v-card-text class="pt-3 pb-0">
                <flex-wrapper>
                  <div>
                    <meta-info
                      v-if="!!role.responsibilities"
                      title="Responsibilities"
                      :description="role.responsibilities"
                    />
                    <meta-info v-if="!!role.description" title="Description" :description="role.description" />
                    <meta-info v-if="!!role.requirements" title="Requirements" :description="role.requirements" />
                    <meta-info
                      v-if="!!role.timeCommitmentMin"
                      title="Time Commitment"
                      :description="
                        `${role.timeCommitmentMin} -
                ${role.timeCommitmentMax} hours/week`
                      "
                    />
                    <meta-info
                      v-if="role.dueDate"
                      title="Application deadline"
                      :description="formatDate(role.dueDate)"
                    />
                  </div>
                </flex-wrapper>
              </v-card-text>
              <v-card-actions class="px-4 pt-0 pb-4">
                <v-btn color="primary" class="mr-1" depressed @click.stop="applyDialog = true">
                  Apply
                </v-btn>
                <v-btn depressed @click="onFillRole">
                  <v-icon class="mr-1">
                    mdi-check
                  </v-icon>
                  Role filled
                </v-btn>
              </v-card-actions>
            </template>
            <div v-else class="pa-5 text-center">
              <h3>
                This role has been filled.
              </h3>
              <p>
                You can still
                <a @click.stop="applyDialog = true">contact the role aide</a>
                to ask about this role or other similar opportunities in this circle.
              </p>
            </div>
          </div>
        </transition>
      </v-card>
    </v-dialog>
    <v-dialog v-model="applyDialog" max-width="500" content-class>
      <v-card>
        <v-card-title>
          <h4 v-if="!role.filledDate">
            Apply
          </h4>
          <h4 v-else>
            Contact
          </h4>
        </v-card-title>
        <v-card-text>
          <flex-wrapper direction="column">
            <p v-if="!role.filledDate">
              Please apply by contacting the role aide.
            </p>
            <icon-link
              v-if="role.email"
              :href="`mailto:${role.email}?subject=Role application: ${role.title}`"
              :link-text="role.email"
              label="Email"
              icon="mdi-email"
            />
            <icon-link
              v-if="role.mattermostId"
              :href="`https://organise.earth/xr-netherlands/messages/${role.mattermostId}`"
              :link-text="role.mattermostId"
              label="Mattermost"
              icon="mdi-message"
            />
            <icon-link
              v-if="role.phone"
              :href="`tel:${role.phone}`"
              :link-text="role.phone"
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
import IconLink from "@/components/IconLink.vue";
import { RoleQuery } from "@/GraphQL/roles";
import { mapActions } from "vuex";
import FlexWrapper from "../layout/FlexWrapper.vue";
import MetaInfo from "../layout/MetaInfo.vue";
import RoleDeletionConfirm from "./DeleteRoleConfirmation.vue";
import RoleEditDialog from "./RoleEditDialog.vue";

export default {
  name: "RoleViewDialog",
  components: {
    FlexWrapper,
    MetaInfo,
    IconLink,
    RoleDeletionConfirm,
    RoleEditDialog
  },
  data() {
    return {
      isDeleteOpen: false,
      isEditOpen: false,
      applyDialog: false,
      testLoading: true,
      role: {}
    };
  },
  apollo: {
    role: {
      query: RoleQuery,
      variables() {
        return {
          roleId: this.$route.params.id
        };
      }
    }
  },
  methods: {
    ...mapActions("roles", ["fillRole"]),
    ...mapActions("alerts", ["displaySuccess"]),
    onFillRole() {
      this.fillRole(this.role.id);
      this.$emit("input", false);
      this.displaySuccess("Role filled");
      this.$router.push("/roles");
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return formattedDate.toLocaleDateString("en-GB", options);
    }
  }
};
</script>
<style lang="scss">
.v-card {
  &.theme--light {
    .v-card__text {
      color: #222;
    }
  }
  &.theme--dark {
    .v-card__text {
      color: white !important;
    }
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
