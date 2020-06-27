/* eslint-disable no-console */
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import TheAppBar from "@/components/TheAppBar";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { state as stylesState } from "@/store/modules/styles";

describe("TheAppBar", () => {
  let store;
  let vuetify;
  const localVue = createLocalVue();
  localVue.use(Vuex);

  beforeAll(() => {
    store = new Vuex.Store({
      modules: { styles: { state: stylesState }, namespaced: true },
    });
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

  it("has navbar height of 64px", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("div").attributes("style")).toBe("height: 64px;");
  });

  it("toggles between light and dark mode", async () => {
    const wrapper = mountFunction();
    const isDark = wrapper.vm.$vuetify.theme.dark;
    const button =  wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.vm.$vuetify.theme.dark).not.toBe(isDark);
  });
});

import Spinner from "@/components/Spinner";
import { ScaleLoader } from "@saeris/vue-spinners";

describe("Spinner", () => {
  const localVue = createLocalVue();
  let store;
  let themeColorFn;
  localVue.use(Vuex);

  beforeAll(() => {
	themeColorFn = jest.fn(color => '#AAA');
	const getThemeColor = () => themeColorFn;
		
    store = new Vuex.Store({
      modules: { styles: { getters: { getThemeColor }, namespaced: true } },
    });
  });

  const mountFunction = options => {
    return shallowMount(Spinner, { localVue, store, ...options });
  };

  it("by default loads spinner and no text", () => {
    const wrapper = mountFunction();
    expect(wrapper.contains(ScaleLoader)).toBeTruthy();
    expect(wrapper.contains("p")).not.toBeTruthy();
  });

  it("renders text", () => {
    const text = "text";
    const wrapper = mountFunction({ propsData: { text } });
    expect(wrapper.find("p").text()).toBe(text);
  });

  it("renders themeColor from getter", () => {
    const themeColor = "primary";
    const wrapper = mountFunction({ propsData: { themeColor } });
    expect(themeColorFn).toBeCalled();
    expect(themeColorFn).toBeCalledWith(themeColor);
  });

});
