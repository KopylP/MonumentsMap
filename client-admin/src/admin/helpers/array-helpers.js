const arraysEqual = (a, b, selector = (p) => p) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (selector(a[i]) !== selector(b[i])) return false;
  }
  return true;
};

const mergeTwoArraysByKey = (
  firstArray,
  secondArray,
  firstKey,
  secondKey,
  newKey
) => {
  if (secondArray.length > firstArray.length)
    throw new Error("Second array sould be less or equal then firstArray");
  const changedFirstArray = firstArray.map((obj) => {
    console.log(obj);
    if (firstKey !== newKey) {
      Object.defineProperty(
        obj,
        newKey,
        Object.getOwnPropertyDescriptor(obj, firstKey)
      );
      delete obj[firstKey];
      return obj;
    }
  });

  const changedSecondArray = secondArray.map((obj) => {
    if (secondKey !== newKey) {
      Object.defineProperty(
        obj,
        newKey,
        Object.getOwnPropertyDescriptor(obj, secondKey)
      );
      delete obj[secondKey];
      return obj;
    }
  });

  function compareValuesInArray(a, b) {
    return a[newKey].localeCompare(b[newKey]);
  }

  changedFirstArray.sort(compareValuesInArray);
  changedSecondArray.sort(compareValuesInArray);
  console.log(changedFirstArray);
  const concatArray = [];
  changedSecondArray.forEach((obj) => {
    concatArray.push(obj);
  });
  changedFirstArray.slice(changedSecondArray.length).forEach((obj) => {
    concatArray.push(obj);
  });
  return concatArray;
};

export { arraysEqual, mergeTwoArraysByKey };
