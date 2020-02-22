<template>
  <div>
    <v-dialog
      persistent
      @click:outside="$router.push('/roles')"
      @keydown.escape="$router.push('/roles')"
      max-width="750"
      value="true"
    >
      <v-card v-if="!!role" class="role card">
        <v-card-title>
          <flex-wrapper direction="column">
            <h2 class="role title">{{ role.title }}</h2>
            <flex-wrapper v-if="role.workingGroup || role.localGroup">
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
            </flex-wrapper>
          </flex-wrapper>
        </v-card-title>
        <v-divider />
        <v-card-text class="role text">
          <flex-wrapper>
            <div class="role description">
              <p>{{ role.description }}</p>
              <div v-if="!!role.responsibilities">
                <h4>Responsibilities</h4>
                <p>{{ role.responsibilities }}</p>
              </div>
            </div>
            <div class="role sidebar">
              <meta-info
                v-if="!!role.timeCommitment"
                title="Time Commitment"
                :description="
                  `${role.timeCommitment.min} -
                ${role.timeCommitment.max} hours/week`
                "
              />
              <meta-info
                v-if="!!role.contactDetails"
                title="Contact Details"
                :description="role.contactDetails"
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
import MetaInfo from "../layout/MetaInfo";
import { mapGetters } from "vuex";
export default {
  components: {
    FlexWrapper,
    MetaInfo,
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
  },
};
</script>
<style lang="scss" scoped>
.role {
  &.text {
    margin-top: 1rem;
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
  &.sidebar {
    margin-left: 1rem;
    flex-basis: 33%;
    flex: 3;
  }
}
</style>
