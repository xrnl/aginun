import { shallowMount } from "@vue/test-utils";
import IconButton from "../../src/components/IconButton";

describe("IconButton", () => {
  it("uses the props", () => {
    const iconButton = shallowMount(IconButton, {
      propsData: {
        text: "text",
        color: "blue",
        icon: "icon",
      },
    });
    expect(iconButton.props()).toEqual({
      icon: "icon",
      color: "blue",
      text: "text",
    });
  });
});
