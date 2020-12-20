<template>
  <div>
    <div v-if="!!role.id">
      <role-deletion-confirm
        v-model="isDeleteOpen"
        :role-title="role.title"
        :role-id="role.id"
      />
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
          <v-skeleton-loader
            v-if="$apollo.loading"
            key="roleLoading"
            class="mx-auto"
            type="article"
          />
          <div v-else key="role">
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
                    v-if="role.workingCircle || role.localGroup"
                    class="subHeader"
                    classes="flex-wrap"
                  >
                    <span>
                      {{ !!role.workingCircle && role.workingCircle.title }}
                    </span>
                    <span
                      v-if="!!role.workingCircle && !!role.localGroup"
                      style="margin: 0 0.25rem;"
                    >
                      -
                    </span>
                    <span>
                      {{ !!role.localGroup && role.localGroup.title }}
                    </span>
                  </flex-wrapper>
                  <div v-if="role.createdDate" style="line-height: 1rem">
                    <span class="caption">
                      {{ publishedOnText }}
                    </span>
                  </div>
                </flex-wrapper>
                <v-menu v-if="!role.filledDate && loggedIn" offset-y left>
                  <template v-slot:activator="{ on }">
                    <v-btn text icon v-on="on">
                      <v-icon>
                        mdi-dots-vertical
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="isEditOpen = true">
                      <v-list-item-title>{{ $t("Edit") }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="isDeleteOpen = true">
                      <v-list-item-title>{{ $t("Delete") }}</v-list-item-title>
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
                      :title="$t('Responsibilities')"
                      :description="role.responsibilities"
                    />
                    <meta-info
                      v-if="!!role.description"
                      :title="$t('Description')"
                      :description="role.description"
                    />
                    <meta-info
                      v-if="!!role.requirements"
                      :title="$t('Requirements')"
                      :description="role.requirements"
                    />
                    <meta-info
                      v-if="!!role.timeCommitmentMin"
                      :title="$t('Time Commitment')"
                      :description="
                        `${role.timeCommitmentMin} -
                ${role.timeCommitmentMax} ${$t('hours/week')}`
                      "
                    />
                    <meta-info
                      v-if="role.dueDate"
                      :title="$t('Application deadline')"
                      :description="formatDate(role.dueDate)"
                    />
                  </div>
                </flex-wrapper>
              </v-card-text>
              <v-card-actions class="px-4 pt-0 pb-4">
                <v-btn
                  color="primary"
                  class="mr-1"
                  depressed
                  @click.stop="applyDialog = true"
                >
                  {{ $t("Apply") }}
                </v-btn>
                <v-btn v-if="loggedIn" depressed @click="onFillRole">
                  <v-icon class="mr-1">
                    mdi-check
                  </v-icon>
                  {{ $t("Role filled") }}
                </v-btn>
              </v-card-actions>
            </template>
            <div v-else class="pa-5 text-center">
              <h3>
                {{ $t("This role has been filled.") }}
              </h3>
              <i18n
                path="You can still {contact} to ask about this role or other similar opportunities in this circle."
                tag="p"
              >
                <template v-slot:contact>
                  <a @click.stop="applyDialog = true">
                    {{ $t("contact the role aide") }}
                  </a>
                </template>
              </i18n>
            </div>
          </div>
        </transition>
      </v-card>
    </v-dialog>
    <v-dialog v-model="applyDialog" max-width="500" content-class>
      <v-card>
        <v-card-title>
          <h4 v-if="!role.filledDate">
            {{ $t("Apply") }}
          </h4>
          <h4 v-else>
            {{ $t("Contact") }}
          </h4>
        </v-card-title>
        <v-card-text>
          <flex-wrapper direction="column">
            <p v-if="!role.filledDate">
              {{ $t("Please apply by contacting the role aide.") }}
            </p>
            <icon-link
              v-if="role.email"
              :href="
                `mailto:${role.email}?subject=${$t('Role application')}: ${
                  role.title
                }`
              "
              :link-text="role.email"
              :label="$t('Email')"
              icon="mdi-email"
            />
            <icon-link
              v-if="role.mattermostId"
              :href="
                `https://organise.earth/xr-netherlands/messages/${role.mattermostId}`
              "
              :link-text="role.mattermostId"
              :label="$t('Mattermost')"
              icon="mdi-message"
            />
            <icon-link
              v-if="role.phone"
              :href="`tel:${role.phone}`"
              :link-text="role.phone"
              :label="$t('Phone')"
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
import RoleDeletionConfirm from "./DeleteRoleConfirmation";
import RoleEditDialog from "./RoleEditDialog";
import { RoleQuery } from "@/GraphQL/roles";
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    }),
    publishedOnText() {
      return this.$t("Published on {date}", {
        date: this.formatDate(this.role.createdDate)
      });
    }
  },
  methods: {
    ...mapActions("roles", ["fillRole"]),
    ...mapActions("alerts", ["displaySuccess"]),
    onFillRole() {
      this.fillRole(this.role.id);
      this.$emit("input", false);
      this.displaySuccess(this.$t("Role filled"));
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
