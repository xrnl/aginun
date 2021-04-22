<template>
    <div class="container container--margin-top">
        <div class="row">
            <div class="row__image">
                <img src="@/assets/images/bee.svg" alt="Bee">
            </div>
            <div class="row__content">
                <h2>{{ $t("Get to know our techteam and contribute:") }}</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur iusto, unde quidem omnis sapiente porro facilis, voluptatibus dolor fuga aliquam, quibusdam assumenda. Iure amet dignissimos iusto totam officiis quos repudiandae.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { contactEmail } from "@/constants/contacts";

export default {
  name: "ErrorPage",
  data: () => ({
    contactEmail,
    isDevMode: process.env.NODE_ENV !== "production"
  })
};
</script>
<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

.text-sm-large {
  @media #{map-get($display-breakpoints, "sm-and-up")} {
    font-size: 60px;
  }
}
</style>
