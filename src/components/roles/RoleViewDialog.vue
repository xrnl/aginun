<template>
  <div>
    <v-dialog
      persistent
      max-width="750"
      value="true"
      @click:outside="$router.push('/roles')"
      @keydown.escape="$router.push('/roles')"
    >
      <v-card v-if="!!role" class="role card">
        <v-card-title>
          <flex-wrapper
            classes="flex-wrap align-start"
            justify-content="space-between"
            style="width: 100%"
          >
            <flex-wrapper direction="column">
              <h2 class="role title">
                {{ role.title }}
              </h2>
              <div v-if="role.workingGroup || role.localGroup">
                <h5 class="role subtitle">
                  {{ !!role.workingGroup && role.workingGroup.text }}
                  <span
                    v-if="!!role.workingGroup && !!role.localGroup"
                    style="margin: 0 0.25rem;"
                  >
                    -
                  </span>
                  {{ !!role.localGroup && role.localGroup.text }}
                </h5>
              </div>
              <div v-if="role.publishedDate" style="line-height: 1rem">
                <span class="caption"> Published on {{ formattedDate }} </span>
              </div>
            </flex-wrapper>
            <flex-wrapper
              classes="flex-wrap-reverse justify-md-end mt-2 mt-sm-0"
            >
              <v-btn color="primary" class="ml-sm-2 mr-2 mr-sm-0" depressed>
                Apply
              </v-btn>
              <v-btn text class="order-sm-first">
                <v-icon class="mr-1">
                  mdi-link
                </v-icon>
                Share
              </v-btn>
            </flex-wrapper>
          </flex-wrapper>
        </v-card-title>
        <v-divider />
        <v-card-text class="role text py-2">
          <flex-wrapper direction="column">
            <h4>Apply</h4>
            <icon-link
              v-if="role.email"
              :href="
                `mailto:${role.email}?subject=Role application: ${role.title}`
              "
              :text="role.email"
              icon="mdi-email"
            />
            <icon-link
              v-if="role.mattermostId"
              :href="
                `https://organise.earth/xr-netherlands/messages/${role.mattermostId}`
              "
              :text="role.mattermostId"
              icon="mdi-message"
            />
            <icon-link
              v-if="role.phone"
              :href="`tel:${role.phone}`"
              :text="role.phone"
              icon="mdi-phone"
            />
          </flex-wrapper>
        </v-card-text>
        <v-divider />
        <v-card-text class="role text mt-1">
          <flex-wrapper>
            <div class="role description">
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
                v-if="!!role.timeCommitment"
                title="Time Commitment"
                :description="
                  `${role.timeCommitment.min} -
                ${role.timeCommitment.max} hours/week`
                "
              />
            </div>
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
import { mapGetters } from "vuex";
export default {
  components: {
    FlexWrapper,
    MetaInfo,
    IconLink,
  },
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    ...mapGetters("roles", ["getByID"]),
    role: function() {
      return this.getByID(this.$route.params.id);
    },
    formattedDate: function() {
      const date = new Date(this.role.publishedDate);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-GB", options);
    },
  },
};
</script>
<style lang="scss" scoped>
.role {
  &.text {
    color: #222 !important;
  }
  &.title {
    font-size: 1.5rem !important;
    font-weight: bold;
  }
  &.subtitle {
    font-weight: normal;
  }

  &.description {
    flex-basis: 66%;
    flex: 6;
  }
}
</style>
