import { shallowMount } from "@vue/test-utils";
import TitleSubtitle from "../../src/components/TitleSubtitle";

describe("TitleSubtitle", () => {
  it("uses the props", () => {
    const titleSubtitle = shallowMount(TitleSubtitle, {
      propsData: {
        title: "title",
        subtitle: "subtitle",
      },
    });
    expect(titleSubtitle.props()).toEqual({
      title: "title",
      subtitle: "subtitle",
    });
  });
});
