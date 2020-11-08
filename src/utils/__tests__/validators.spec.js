import {
  makeObjectValidator,
  isArrayValid,
  iconValidator,
  hrefValidator,
} from "@/utils/validators";
import { isFunction } from "lodash";

describe("makeObjectValidator", () => {
  const validatorFn = makeObjectValidator({
    id: "number",
    title: "string",
  });
  it("should return a validator function based on the object passed", () => {
    expect(isFunction(validatorFn)).toBe(true);
  });
  it("should return true when the object matches the structure expected", () => {
    const objToValidate = {
      id: 3,
      title: "title",
    };
    expect(validatorFn(objToValidate)).toBe(true);
  });
  it("should return false when the object doesn't match the structure expected", () => {
    const objToValidate = {
      id: "id",
    };
    expect(validatorFn(objToValidate)).toBe(false);
  });
});

describe("isArrayValid", () => {
  it("should return true when all the items in the array pass the function provided", () => {
    const array = ["a", "b", "c"];
    const result = isArrayValid(array, isNaN);
    expect(result).toBe(true);
  });
  it("should return false when all the items in the array pass the function provided", () => {
    const array = [1, 2, 3];
    const result = isArrayValid(array, isNaN);
    expect(result).toBe(false);
  });
});

describe("iconValidator", () => {
  it("should return true when the provided string starts with 'mdi-'", () => {
    expect(iconValidator("mdi-icon")).toBe(true);
  });
  it("should return false when the provided string doesn't start with 'mdi-'", () => {
    expect(iconValidator("icon")).toBe(false);
  });
});

describe("hrefValidator", () => {
  it("should return true when the provided string starts with one of the valid prefixes", () => {
    expect(hrefValidator("https://extinctionrebellion.nl")).toBe(true);
  });
  it("should return false when the provided string doesn't start with one of the valid prefixes", () => {
    expect(hrefValidator("extinctionrebellion.nl")).toBe(false);
  });
});
