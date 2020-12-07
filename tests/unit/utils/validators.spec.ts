import {
  makeObjectValidator,
  isArrayValid,
  iconValidator,
  hrefValidator
} from "@/utils/validators";
import { isFunction, isString } from "lodash";

describe("makeObjectValidator", () => {
  const validatorFn = makeObjectValidator({
    id: "number",
    title: "string"
  });
  it("returns a validator function based on the object passed", () => {
    expect(isFunction(validatorFn)).toBe(true);
  });
  it("returns true when the object matches the structure", () => {
    const objToValidate = {
      id: 3,
      title: "title"
    };
    expect(validatorFn(objToValidate)).toBe(true);
  });
  it("returns false when the object doesn't match the structure", () => {
    const objToValidate = {
      id: "id"
    };
    expect(validatorFn(objToValidate)).toBe(false);
  });
});

describe("isArrayValid", () => {
  it("returns true when all array items pass the validation function", () => {
    const array = ["a", "b", "c"];
    const result = isArrayValid(array, isString);
    expect(result).toBe(true);
  });
  it("returns false when all array items pass the validation function", () => {
    const array = [1, 2, 3];
    const result = isArrayValid(array, isString);
    expect(result).toBe(false);
  });
});

describe("iconValidator", () => {
  it("returns true when the string starts with 'mdi-'", () => {
    expect(iconValidator("mdi-icon")).toBe(true);
  });
  it("returns false when the string doesn't start with 'mdi-'", () => {
    expect(iconValidator("icon")).toBe(false);
  });
});

describe("hrefValidator", () => {
  it("returns true when the string starts with http://", () => {
    expect(hrefValidator("http://extinctionrebellion.nl")).toBe(true);
  });
  it("returns true when the string starts with https://", () => {
    expect(hrefValidator("https://extinctionrebellion.nl")).toBe(true);
  });
  it("returns true when the string starts with mailto:", () => {
    expect(hrefValidator("mailto:extinction@rebellion.nl")).toBe(true);
  });
  it("returns true when the string starts with tel:", () => {
    expect(hrefValidator("tel:+0123456789")).toBe(true);
  });
  it("returns false when the string doesn't start with one of the valid prefixes", () => {
    expect(hrefValidator("extinctionrebellion.nl")).toBe(false);
  });
});
