/* eslint-disable no-console */
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import TheAppBar from "@/components/TheAppBar";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { state as stylesState } from "@/store/modules/styles";

Vue.use(Vuetify);

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

  const mountFunction = options =>
    mount(TheAppBar, {
      localVue,
      store,
      vuetify,
      ...options,
    });

  it("has navbar height of 64px", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("div").attributes("style")).toBe("height: 64px;");
  });

  it("toggles between light and dark mode", async () => {
    const wrapper = mountFunction();
    const isDark = wrapper.vm.$vuetify.theme.dark;
    const button = wrapper.find("button");
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
    themeColorFn = jest.fn(color => "#AAA");
    const getThemeColor = () => themeColorFn;
    store = new Vuex.Store({
      modules: { styles: { getters: { getThemeColor }, namespaced: true } },
    });
  });

  const mountFunction = options =>
    shallowMount(Spinner, { localVue, store, ...options });

  it("by default loads spinner and no text", () => {
    const wrapper = mountFunction();
    expect(wrapper.findComponent(ScaleLoader).exists()).toBeTruthy();
    expect(wrapper.find("p").exists()).not.toBeTruthy();
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

import AutocompleteCustom from "@/components/AutocompleteCustom";

describe("AutocompleteCustom", () => {
  const localVue = createLocalVue();

  let vuetify;
  const items = [
    { id: 1, title: "Enschede" },
    { id: 2, title: "Brabant" },
  ];
  const label = "Local group";

  beforeAll(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = options =>
    mount(AutocompleteCustom, {
      localVue,
      vuetify,
      propsData: {
        label,
        items,
        selectedItemsIds: [],
      },
      ...options,
    });

  it("prop label is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("label").text()).toBe(label);
  });

  it("prop items validation works", () => {
    const validator = AutocompleteCustom.props.items.validator;

    expect(validator(items)).toBeTruthy();

    const itemsInvalidKeys = items.concat([{ value: 0, text: "test" }]);
    expect(validator(itemsInvalidKeys)).toBeFalsy();

    const itemsInvalidTypes = items.concat([{ id: "0", title: 0 }]);
    expect(validator(itemsInvalidTypes)).toBeFalsy();
  });

  it("prop selectedItemsIds validation works", () => {
    const validator = AutocompleteCustom.props.selectedItemsIds.validator;

    expect(validator([1, 2])).toBeTruthy();
    expect(validator([1, 2.5])).toBeFalsy();
    expect(validator(["1", "2"])).toBeFalsy();
  });
});

import IconButton from "@/components/IconButton";
import { themeColorNames } from "@/utils/defaults";

describe("IconButton", () => {
  const localVue = createLocalVue();

  let vuetify;
  const text = "add";
  const icon = "mdi-plus";
  const themeColor = "primary";

  beforeAll(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = options =>
    mount(IconButton, {
      localVue,
      vuetify,
      propsData: {
        text,
        icon,
        themeColor,
      },
      ...options,
    });

  it("prop text is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("button > span").text()).toBe(text);
  });

  it("prop icon is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find(`i.v-icon.${icon}`).exists()).toBeTruthy();
  });

  it("prop color validation works", () => {
    const validator = IconButton.props.themeColor.validator;

    themeColorNames.forEach(themeColor =>
      expect(validator(themeColor)).toBeTruthy()
    );

    expect(validator("#000000")).toBeFalsy();
  });

  it("prop icon validation works", () => {
    const validator = IconButton.props.icon.validator;

    expect(validator("mdi-plus")).toBeTruthy();
    expect(validator("plus-icon")).toBeFalsy();
  });

  it("button click emits click event", async () => {
    const wrapper = mountFunction();
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

import NewItemButton from "@/components/NewItemButton";

describe("NewItemButton", () => {
  const localVue = createLocalVue();

  let vuetify;
  const text = "New role";
  const icon = "mdi-plus";

  beforeAll(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = options =>
    mount(NewItemButton, {
      localVue,
      vuetify,
      propsData: {
        text,
      },
      ...options,
    });

  it("prop text is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("button > span").text()).toBe(text);
  });

  it("plus icon is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find(`i.v-icon.${icon}`).exists()).toBeTruthy();
  });

  it("button click emits click event", async () => {
    const wrapper = mountFunction();
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});

import IconLink from "@/components/IconLink";

describe("IconLink", () => {
  const localVue = createLocalVue();

  let vuetify;

  const href = "https://organise.earth";
  const linkText = "@username";
  const label = "Mattermost";
  const icon = "mdi-message";

  beforeAll(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = options =>
    mount(IconLink, {
      localVue,
      vuetify,
      propsData: {
        href,
        linkText,
        label,
        icon,
      },
      ...options,
    });

  it("prop href validation works", () => {
    const validator = IconLink.props.href.validator;

    expect(validator("https://organise.earth")).toBeTruthy();
    expect(validator("mailto:test@protonmail.com")).toBeTruthy();
    expect(validator("tel:+31625549011")).toBeTruthy();
    expect(validator("www.organise.earth")).toBeFalsy();
  });

  it("prop icon validation works", () => {
    const validator = IconLink.props.icon.validator;

    expect(validator("mdi-plus")).toBeTruthy();
    expect(validator("plus-icon")).toBeFalsy();
  });

  it("href prop is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("a").attributes("href")).toBe(href);
  });

  it("linkText prop is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("a").text()).toBe(linkText);
  });

  it("label prop is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("span").text()).toBe(label);
  });

  it("prop icon is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find(`i.v-icon.${icon}`).exists()).toBeTruthy();
  });
});
