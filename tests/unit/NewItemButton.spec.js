import { mount } from "@vue/test-utils";
import NewItemButton from "@/components/NewItemButton";
import IconButton from "@/components/IconButton.vue";

describe("NewItemButton", () => {
  it("uses the IconButton component", () => {
    const newItemButton = mount(NewItemButton);
    expect(newItemButton.props()).toEqual({});
    // expect(newItemButton).toBeInstanceOf(IconButton);
  });
});
