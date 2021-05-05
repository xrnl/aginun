<template>
  <router-link class="card" v-bind="$attrs">
    <div class="card__color-bar" :class="`bg-${color}`"></div>
    <div class="card__content">
      <h3 class="card__content__title" :if="title">{{ title }}</h3>
      <!-- <slot name="title" v-if="!!$slots.title && !!$slots.title[0]" /> -->
      <slot name="content" v-if="!!$slots.content && !!$slots.content[0]" />
      <div class="card__content__bottom">
        <div class="card__content__bottom__subtitle">
          <h3 class="card__content__bottom__subtitle__heading">
            {{ subtitle }}
          </h3>
          <div class="card__content__bottom__subtitle__extra">
            {{ subtitleExtra }}
          </div>
        </div>
        <div class="card__content__bottom_secondary" :if="secondaryInfo">
          <span>{{ secondaryInfo }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "DefaultCard",
  props: {
    subtitle: {
      type: String,
      required: false
    },
    subtitleExtra: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    secondaryInfo: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false,
      default: "khaki-light"
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 10px 0px #dadada;
  height: 140px;
  text-decoration: none;
  transition: box-shadow 0.3s ease-in-out;
  background: white;
  z-index: 4;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    width: 100% !important;
  }
  &:hover {
    box-shadow: 0px 4px 28px 0px #dadada;
  }
  &__color-bar {
    height: 0.75rem;
    width: 100%;
    @media only screen and (max-width: 600px) {
      height: 100%;
      width: 0.75rem;
    }
  }
  &__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    color: black;
    l &__title {
      // margin-bottom: 2rem;
      font-size: 1.25rem;
      font-weight: normal;
      width: 100%;
    }
    &__bottom {
      display: flex;
      flex-direction: column;
      @media only screen and (min-width: 600px) {
        flex-direction: row;
        justify-content: space-between;
      }
      &__subtitle {
        display: flex;
        flex-direction: row;
        font-family: "FucXed";
        font-weight: 600;
        &__heading {
          line-height: 1;
          font-size: 1.2rem;
        }
        &__extra {
          line-height: 1.2;
          margin-left: 0.5rem;
          font-size: 0.6rem;
          width: 35px;
          p {
            margin-bottom: 0;
          }
        }
      }
      &__secondary {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        p {
          color: grey;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
