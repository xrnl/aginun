import has from "lodash/has";

export const makeObjectValidator = objectExpectedStructure => {
  const isObjectValid = objectToValidate => {
    return Object.keys(objectExpectedStructure).every(key => {
      if (!has(objectToValidate, key)) return false;

      const actualType = typeof objectToValidate[key];
      const expectedType = objectExpectedStructure[key];
      return actualType === expectedType;
    });
  };
  return isObjectValid;
};

export const isArrayValid = (arrayToValidate, isItemValid) =>
  arrayToValidate.every(item => isItemValid(item));

export const iconValidator = iconName => {
  return iconName.startsWith("mdi-");
};

export const hrefValidator = href => {
  const validHrefPrefixes = ["http://", "https://", "mailto:", "tel:"];
  return validHrefPrefixes.some(hrefPrefix => href.startsWith(hrefPrefix));
};
