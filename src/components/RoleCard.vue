<template>
  <v-hover
    v-slot:default="{ hover }"
    class="pointer"
  >
    <v-card
      :elevation="hover ? 12 : 2"
      width="250"
      class="card"
    >
      <div
        class="transition-wrapper"
        :class="{lighter: hover && $vuetify.theme.dark}"
      >
        <div class="d-flex justify-space-between align-center pa-3">
          <span>
            {{ role.workingGroup }}
          </span>
          <v-icon color="primary">
            mdi-police-badge
          </v-icon>
        </div>
        <v-divider />
        <div class="pa-3">
          <p class="headline mb-0">
            {{ role.title }}
          </p>
          <div class="caption">
            {{ role.xrGroup }}, {{ role.location }}
          </div>
          <!-- <ul class="mt-5">
            <li
              v-for="r in role.responsibilities"
              :key="r"
            >
              {{ r }}
            </li>
          </ul> -->
          <div class="d-flex flex-wrap justify-space-between align-end mt-5">
            <span class="d-flex flex-column justify-center">
              <span
                class="title flex-grow-0"
                style="line-height: 1rem"
              >
                {{ role.timeCommitment.min }} - {{ role.timeCommitment.max }}
              </span>
              <span class="overline text-uppercase">
                hours / week
              </span>

            </span>
            <span
              class="primary--text caption text-uppercase button--text"
              style="line-height: 1rem"
            >
              Learn more
            </span>
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: "RoleCard",
    data: () => ({
      role: {
        title: 'Facilitator',
        workingGroup: 'Actions & Logistics',
        xrGroup: 'XR Zwolle',
        location: 'Zwolle',
        timeCommitment: {
          min: 6,
          max: 10
        },
        responsibilities: [
          'Finding strategic locations for actions',
          'Buy equipment for actions',
          'Transport equipment for actions'
        ]

      }
    }),
    computed: {
      elevation: function () {
        if (this.$vuetify.theme.dark) {
          return {'background-color': '#333333'}
        }
        return {}
      }
    }
  }
</script>

<style lang="scss" scoped>

.card {
  margin: 0em 1em 2em 1em;
  @media (max-width: '550px') {
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 1em;
  }
}

.pointer:hover {
  cursor: pointer;
}

.button--text:hover {
  opacity: 0.7;
}

.transition-wrapper {
  transition: background-color 280ms;
}

.lighter {
    background-color: #333333 !important;
}
</style>
