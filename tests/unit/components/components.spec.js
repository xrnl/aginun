import { mount, createLocalVue } from "@vue/test-utils";
import TheAppBar from "@/components/TheAppBar.vue";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import Spinner from "@/components/Spinner.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom.vue";
import IconButton from "@/components/IconButton.vue";
import themeColorNames from "@/constants/themeColors";
import NewItemButton from "@/components/NewItemButton.vue";
import IconLink from "@/components/IconLink.vue";
import DatePickerField from "@/components/DatePickerField.vue";
import LanguageSelect from "@/components/LanguageSelect.vue";
import i18n from "@/i18n/i18n";

Vue.use(VueAxios, axios);

describe("TheAppBar", () => {
  let store;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  localVue.use(i18n);
  const router = new VueRouter();

  beforeAll(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: { loggedIn: () => true }
        }
      }
    });
  });

  const mountFunction = (options) =>
    mount(TheAppBar, {
      localVue,
      store,
      router,
      i18n,
      ...options
    });

  it("has to open up when the hamburger is clicked", async () => {
    const wrapper = mountFunction();
    await wrapper.find(".nav-bar__hamburger").trigger("click");
    expect(wrapper.find(".nav-bar__content").classes("active")).toBe(true);
  });

  it("has to close when the close button is clicked", async () => {
    const wrapper = mountFunction();
    // First open up the navigation, otherwise we wouldn't be able to close it
    await wrapper.find(".nav-bar__hamburger").trigger("click");
    await wrapper.find(".nav-bar__content__close").trigger("click");
    expect(wrapper.find(".nav-bar__content").classes("active")).toBe(false);
  });
});

describe("Spinner", () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  const mountFunction = (options) => mount(Spinner, { localVue, ...options });

  const spinnerSelector = "div > div > div";

  it("by default renders spinner and no text", () => {
    const wrapper = mountFunction();
    const spinnerTags = wrapper.findAll(spinnerSelector);
    expect(spinnerTags.length).toBeGreaterThan(0);
    expect(wrapper.find("p").exists()).toBeFalsy();
  });

  it("prop text is rendered", () => {
    const text = "text";
    const wrapper = mountFunction({ propsData: { text } });
    expect(wrapper.find("p").text()).toBe(text);
  });
});

describe("AutocompleteCustom", () => {
  const localVue = createLocalVue();

  const items = [
    { id: 1, title: "Enschede" },
    { id: 2, title: "Brabant" }
  ];

  const label = "Local group";

  const mountFunction = (options) =>
    mount(AutocompleteCustom, {
      localVue,
      propsData: {
        label,
        items,
        selectedItemsIds: [],
        itemText: "title"
      },
      ...options
    });

  it("prop label is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("label").text()).toBe(label);
  });

  it("prop selectedItemsIds validation works", () => {
    const { validator } = AutocompleteCustom.props.selectedItemsIds;

    expect(validator([1, 2])).toBeTruthy();
    expect(validator([1, 2.5])).toBeFalsy();
    expect(validator(["1", "2"])).toBeFalsy();
  });

  it("selected items are rendered", () => {
    const selectedItemsIds = items.map((item) => item.id);
    const wrapper = mountFunction({
      propsData: {
        label,
        items,
        selectedItemsIds,
        itemText: "title"
      }
    });
    const renderedItems = wrapper.findAll("v-chip__content");
    for (let i = 0; i < renderedItems.length; i += 1) {
      expect(renderedItems.at(i).text()).toBe(items[i].title);
    }
  });
});

describe("IconButton", () => {
  const localVue = createLocalVue();

  const text = "add";
  const icon = "mdi-plus";
  const themeColor = "primary";

  const mountFunction = (options) =>
    mount(IconButton, {
      localVue,
      propsData: {
        text,
        icon,
        themeColor
      },
      ...options
    });

  it("prop text is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("button > span").text()).toBe(text);
  });

  it("prop icon is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find(`i.v-icon.${icon}`).exists()).toBeTruthy();
  });

  it("prop themeColor is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.find("button").classes()).toContain(themeColor);
  });

  it("prop color validation works", () => {
    const { validator } = IconButton.props.themeColor;

    themeColorNames.forEach((color) => expect(validator(color)).toBeTruthy());

    expect(validator("#000000")).toBeFalsy();
  });

  it("prop icon validation works", () => {
    const { validator } = IconButton.props.icon;

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

describe("NewItemButton", () => {
  const localVue = createLocalVue();

  const text = "New role";
  const icon = "mdi-plus";

  const mountFunction = (options) =>
    mount(NewItemButton, {
      localVue,
      propsData: {
        text
      },
      ...options
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

describe("IconLink", () => {
  const localVue = createLocalVue();

  const href = "https://organise.earth";
  const linkText = "@username";
  const label = "Mattermost";
  const icon = "mdi-message";

  const mountFunction = (options) =>
    mount(IconLink, {
      localVue,
      propsData: {
        href,
        linkText,
        label,
        icon
      },
      ...options
    });

  it("prop href validation works", () => {
    const { validator } = IconLink.props.href;

    expect(validator("https://organise.earth")).toBeTruthy();
    expect(validator("mailto:test@protonmail.com")).toBeTruthy();
    expect(validator("tel:+31625549011")).toBeTruthy();
    expect(validator("www.organise.earth")).toBeFalsy();
  });

  it("prop icon validation works", () => {
    const { validator } = IconLink.props.icon;

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

describe("DatePickerField", () => {
  const localVue = createLocalVue();
  const label = "Application deadline";

  const mountFunction = (date) =>
    mount(DatePickerField, {
      localVue,
      propsData: {
        label,
        date
      }
    });

  it("prop label is rendered", () => {
    const wrapper = mountFunction();
    expect(wrapper.get("label").text()).toBe(label);
  });

  it("prop date is shown in DD/MM/YYYY format in the input field when passed", () => {
    const date = new Date().toISOString();
    const wrapper = mountFunction(date);
    const [year, month, day] = date.split("-");
    const formattedDate = `${day.substr(0, 2)}/${month.substr(0, 2)}/${year}`;
    expect(wrapper.get("input").element.value).toBe(formattedDate);
  });

  it("input field is empty when no date is passed as prop", () => {
    const wrapper = mountFunction();
    expect(wrapper.get("input").element.value).toBe("");
  });

  it("emits an update with the correct date", async () => {
    const wrapper = mountFunction();
    await wrapper.setData({ showMenu: true });
    await wrapper
      // the first date available is today
      .get(".v-date-picker-table .v-btn:not(.v-btn--disabled)")
      .trigger("click");
    const emitted = wrapper.emitted().update[0][0];
    const expected = new Date();
    // the date we receive will always be at midnight,
    // so we need to set the expected date to match it
    expected.setUTCHours(0, 0, 0, 0);
    expect(emitted).toBe(expected.toISOString());
  });
});

describe("LanguageSelect", () => {
  let wrapper;
  let localVue;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(i18n);
    wrapper = mount(LanguageSelect, {
      i18n
    });
  });

  it("component is rendered", () => {
    expect(wrapper.get(".v-select__selection").text()).toBe("English");
  });
});
