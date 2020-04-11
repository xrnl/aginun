/* eslint-disable no-console */
import { mount, createLocalVue } from "@vue/test-utils";
import TheAppBar from "@/components/TheAppBar.vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TheAppBar", () => {
  let vuetify;
  let store;

  const mountFunction = options => {
    return mount(TheAppBar, {
      store,
      localVue,
      vuetify,
      ...options,
    });
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        styles: {
          navbarHeight: "64px",
        },
      },
    });
    vuetify = new Vuetify({
      theme: {
        dark: false,
      },
    });
  });

  it("application starts in light mode", () => {
    const wrapper = mountFunction();
    expect(wrapper.vm.$vuetify.theme.dark).toBeFalsy();
  });

  it("toggles between light and dark mode", async () => {
    const wrapper = mountFunction();
    const startState = wrapper.vm.$vuetify.theme.dark;
    wrapper.find(".v-btn").trigger("click");
    await localVue.nextTick();
    expect(wrapper.vm.$vuetify.theme.dark).toEqual(!startState);
  });
});
