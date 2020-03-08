<template>
  <v-dialog
    persistent
    max-width="750"
    value="true"
    @click:outside="$router.push('/tasks')"
    @keydown:escape="$router.push('/tasks')"
  >
    <v-card v-if="!!task">
      <v-card-title>
        <flex-wrapper
          classes="flex-nowrap align-start"
          justify-content="space-between"
          style="width: 100%"
        >
          <flex-wrapper direction="column">
            <h2 class="boldTitle">
              {{ task.title }}
            </h2>
            <flex-wrapper
              v-if="task.workingGroup || task.localGroup"
              class="subHeader"
              classes="flex-wrap"
            >
              <span>
                {{ !!task.workingGroup && task.workingGroup.text }}
              </span>
              <span
                v-if="!!task.workingGroup && !!task.localGroup"
                style="margin: 0 0.25rem;"
              >
                -
              </span>
              <span>
                {{ !!task.localGroup && task.localGroup.text }}
              </span>
            </flex-wrapper>
            <div v-if="task.publishedDate" style="line-height: 1rem">
              <span class="caption"> Published on {{ formattedDate }} </span>
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
              <v-list-item @click="console.log('event for editing task')">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="console.log('event for deleting task')">
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
            <!-- <meta-info
              v-if="!!task.responsibilities"
              title="Responsibilities"
              :description="task.responsibilities"
            /> -->
            <meta-info
              v-if="!!task.description"
              title="Description"
              :description="task.description"
            />
            <meta-info
              v-if="!!task.requirements"
              title="Requirements"
              :description="task.requirements"
            />
            <meta-info
              v-if="!!task.timeCommitment"
              title="Time Commitment"
              :description="
                `${task.timeCommitment.min} -
                ${task.timeCommitment.max} hours`
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
          task taken
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="applyDialog" max-width="500" content-class>
      <v-card>
        <v-card-title>
          <h4>Apply</h4>
        </v-card-title>
        <v-card-text class="solidFont">
          <flex-wrapper direction="column">
            <p>Please apply by contacting the task aide.</p>
            <icon-link
              v-if="task.email"
              :href="
                `mailto:${task.email}?subject=task application: ${task.title}`
              "
              :text="task.email"
              label="Email"
              icon="mdi-email"
            />
            <icon-link
              v-if="task.mattermostId"
              :href="
                `https://organise.earth/xr-netherlands/messages/${task.mattermostId}`
              "
              :text="task.mattermostId"
              label="Mattermost"
              icon="mdi-message"
            />
            <icon-link
              v-if="task.phone"
              :href="`tel:${task.phone}`"
              :text="task.phone"
              label="Phone"
              icon="mdi-phone"
            />
          </flex-wrapper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
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
      applyDialog: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["getByID"]),
    task: function() {
      return this.getByID(this.$route.params.id);
    },
    formattedDate: function() {
      const date = new Date(this.task.publishedDate);
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
