const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
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
