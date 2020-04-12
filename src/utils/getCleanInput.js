// Removes undefined values from an object
function getCleanInputFromObject(input) {
  let newInput = input;
  const values = Object.getOwnPropertyNames(newInput);
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (newInput[value] === undefined) {
      delete newInput[value];
    }
  }

  return newInput;
}

export { getCleanInputFromObject };
