/* eslint-disable no-console */
import { mount, createLocalVue } from "@vue/test-utils";
import TheAppBar from "@/components/TheAppBar.vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

describe("TheAppBar", () => {
  let store;
  let vuetify;
  const localVue = createLocalVue();
  localVue.use(Vuex);

  beforeAll(() => {
    store = new Vuex.Store({ state: { styles: { navbarHeight: "64px" } } });
    vuetify = new Vuetify({ theme: { dark: false } });
  });

  const mountFunction = options => {
    return mount(TheAppBar, {
      localVue,
      store,
      vuetify,
      ...options,
    });
  };

  it("toggles between light and dark mode", async () => {
    const wrapper = mountFunction();
    const isDark = wrapper.vm.$vuetify.theme.dark;
    wrapper.find("button").trigger("click");
    await localVue.nextTick();
    expect(wrapper.vm.$vuetify.theme.dark).not.toBe(isDark);
  });
});
