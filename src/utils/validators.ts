import has from "lodash/has";

export const makeObjectValidator = (objectExpectedStructure: {
  [x: string]: unknown;
}) => {
  return (objectToValidate: { [x: string]: unknown }) => {
    return Object.keys(objectExpectedStructure).every((key) => {
      if (!has(objectToValidate, key)) return false;

      const actualType = typeof objectToValidate[key];
      const expectedType = objectExpectedStructure[key];
      return actualType === expectedType;
    });
  };
};

export const isArrayValid = (
  arrayToValidate: unknown[],
  isItemValid: (arg) => unknown
) => {
  return arrayToValidate.every((item) => isItemValid(item));
};

export const iconValidator = (iconName: string) => {
  return iconName.startsWith("mdi-");
};

export const hrefValidator = (href: string) => {
  const validHrefPrefixes = ["http://", "https://", "mailto:", "tel:"];
  return validHrefPrefixes.some((hrefPrefix) => href.startsWith(hrefPrefix));
};
