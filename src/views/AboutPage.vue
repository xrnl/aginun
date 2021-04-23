<template>
  <div class="container container--md container--margin-top">
    <div class="row">
      <div class="row__image">
        <img src="@/assets/images/bee.svg" alt="Bee" />
      </div>
      <div class="row__content">
        <h2>{{ $t("Get to know our techteam and contribute") }}</h2>
        <p>
          {{ $t("Check out our guidelines") }}
          <a
            href="https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md"
            >{{ $t("here") }}</a
          >
        </p>
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
