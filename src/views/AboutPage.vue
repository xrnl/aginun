<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="bg-light-green pa-md-16">
      <v-col class="col-md-5">
        <h1 class="white--text text-center text-md-large">
          {{ $t("What is Extinction Rebellion?") }}
        </h1>
      </v-col>
      <v-col class="col-12 col-md-7">
        <p>
          {{
            $t(
              "Extinction Rebellion is a grassroots movement powered by volunteers: people just like you who use their time, energy and resources to act on the climate and ecological crisis. Volunteers organise actions, provide legal help, craft art, communicate with the press,power our technical infrastructure, and much much more."
            )
          }}
        </p>
        <p class="mb-0">
          {{
            $t(
              "One of the best ways that you can help combat this crisis is by helping out in one of our volunteer roles. These roles are not necessarily full time positions; you can have a role in Extinction Rebellion even if you only have a few hours available each week."
            )
          }}
        </p>
        <div class="mt-5 text-center text-md-start">
          <router-link
            class="v-btn v-btn--outlined rounded bg-white black--text"
            to="/roles"
            >{{ $t("Find role") }}</router-link
          >
          <br class="d-md-none" />
          <router-link
            class="v-btn rounded bg-black white--text mt-3 mb-5 mt-md-0 mb-md-0 ml-md-5"
            to="/support"
            >{{ $t("Support") }}</router-link
          >
        </div>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="bg-light-blue pa-md-16">
      <v-col class="col-12">
        <h1 class="white--text text-center text-md-start text-md-large">
          {{ $t("XR Structure") }}
        </h1>
      </v-col>
      <v-col class="col-12">
        <p>
          {{
            $t(
              "As a grassroots movement, the core of Extinction Rebellion is comprised of local groups: groups of people who live in a similar area and which organise at a local level, organising local actions, mobilizing people for national or international actions, deliver talks in their local communities, personally meet and integrate new people in that area, influence local politics, and much more. You can find the complete list of local groups in XR NL on this page."
            )
          }}
        </p>
        <p>
          {{
            $t(
              "To work efficiently, local groups are sub-divided into working circles, which resemble departments in a corporation. For example, there is working circle for Outreach and Training, Political Strategy and Change, Arts, Media... You can find the complete list of working circles here. If these working cirlces grow too large, they are further subdivided into smaller and more specialised working circle. For example, the media circle might have a press sub-circle, and a social media sub-circle."
            )
          }}
        </p>
        <p>
          {{
            $t(
              "Working circles also exist at a national level. The difference between local and national working circles is in the type of work they do: whereas local working circles do the direct grassroots work, the national working circles provide support for that work. For example, people in local outreach circles organise talks, whereas people in the national outreach circle provide guides, trainings, and other resources that help the people at a local level give better talks."
            )
          }}
        </p>
        <p class="mb-0">
          {{
            $t(
              "Finally, each person in a working circle, local or national, has a specific role: a set of responsibilities that a particular person holds within the organisation. A role is not an action that someone can complete in a discrete period of time. This is a task. For instance, being a photographer is a role, photographing an action is a task. The reason we emphasise this distinction is to ensure that we are recruiting people for long-lasting roles that strengthen our organisational structure, as opposed to one-off tasks that engage people for a short period of time."
            )
          }}
        </p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="bg-warm-yellow pa-md-16">
      <v-col class="col-12">
        <h1 class="white--text text-center text-md-start text-md-large">
          {{ $t("Why we've created the platform") }}
        </h1>
      </v-col>
      <v-col class="col-12">
        <p class="mb-0">
          {{
            $t(
              "We've created this platform so that it's much easier for people to volunteer with Extinction Rebellion by finding a concrete role that is ideal for them. We've also create this platform so that volunteers who are active in Extinction Rebellion can easily share where help is needed and find people who want to provide that help. We hope that this platform will increase the size and resiliency of the movement, and help with addressing the climate and."
            )
          }}
        </p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="bg-green pa-md-16">
      <v-col class="col-12">
        <h1 class="white--text text-center text-md-start text-md-large">
          {{ $t("What now?") }}
        </h1>
      </v-col>
      <v-col
        class="col-12 col-md-4 d-flex flex-column align-center order-md-last"
      >
        <img
          class="w-50"
          src="@/assets/images/xr-join-rebellion-stamp.svg"
          :alt="$t('Join the rebellion')"
        />
        <router-link
          class="v-btn v-btn--outlined mt-3 mb-5 rounded bg-white black--text"
          to="/roles"
          >{{ $t("Find role") }}</router-link
        >
      </v-col>
      <v-col class="col-12 col-md-8 white--text">
        <p>
          {{
            $t(
              "We've created this platform so that it's much easier for people to volunteer with Extinction Rebellion by finding a concrete role that is ideal for them. We've also create this platform so that volunteers who are active in Extinction Rebellion can easily share where help is needed and find people who want to provide that help. We hope that this platform will increase the size and resiliency of the movement, and help with addressing the climate and."
            )
          }}
        </p>
        <h3>
          {{ $t("What if I don't find a good role?") }}
        </h3>
        <i18n
          path="No problem! The platform only contains a small number of ways in which you can help out. To find out more find your nearest local group and get in touch {localGroup}, or email us {email}."
          tag="p"
        >
          <template v-slot:localGroup>
            <a
              class="white--text"
              href="https://extinctionrebellion.nl/en/local-groups/"
              target="_blank"
              >https://extinctionrebellion.nl/en/local-groups/</a
            >
          </template>
          <template v-slot:email>
            <a
              class="white--text"
              href="mailto:welcome@extinctionrebellion.nl"
              target="_blank"
              >welcome@extinctionrebellion.nl</a
            >
          </template>
        </i18n>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "AboutPage",
  computed: {
    xrNLWebsiteUrl: function() {
      const url =
        "https://extinctionrebellion.nl" +
        (this.$i18n.locale === "en" ? "/en" : "");
      return url;
    }
  }
};
</script>
