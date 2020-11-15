import has from "lodash/has";

export const makeObjectValidator = (objectExpectedStructure: {
  [x: string]: any;
}) => {
  const isObjectValid = (objectToValidate: { [x: string]: any; }) => {
    return Object.keys(objectExpectedStructure).every(key => {
      if (!has(objectToValidate, key)) return false;

      const actualType = typeof objectToValidate[key];
      const expectedType = objectExpectedStructure[key];
      return actualType === expectedType;
    });
  };
  return isObjectValid;
};

export const isArrayValid = (
  arrayToValidate: any[],
  isItemValid: (arg0: any) => any
) => arrayToValidate.every((item: any) => isItemValid(item));

export const iconValidator = (iconName: string) => {
  return iconName.startsWith("mdi-");
};

export const hrefValidator = (href: string) => {
  const validHrefPrefixes = ["http://", "https://", "mailto:", "tel:"];
  return validHrefPrefixes.some(hrefPrefix => href.startsWith(hrefPrefix));
};
