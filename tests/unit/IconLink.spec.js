import { shallowMount } from "@vue/test-utils";
import IconLink from "../../src/components/IconLink";

describe("IconLink", () => {
  it("uses the props", () => {
    const iconLink = shallowMount(IconLink, {
      propsData: {
        href: "https://xr.nl",
        text: "text",
        label: "label",
        icon: "icon",
      },
    });
    expect(iconLink.props()).toEqual({
      href: "https://xr.nl",
      icon: "icon",
      label: "label",
      text: "text",
    });
  });
});
