function countingSort(array: Array<number>): Array<number> {
  let countingLookup = {};
  let firstElement = array[0];
  let lastElement = array[0];
  array.forEach(element => {
    if (element < firstElement) {
      firstElement = element;
    }
    if(element > lastElement) {
      lastElement = element;
    }
    if (countingLookup[element]) {
      countingLookup[element] = countingLookup[element] + 1;
    } else {
      countingLookup[element] = 1;
    }
  });

  let lastObservedCount = 0;
  for (let i = firstElement + 1; i <= lastElement; i++) {
    if (countingLookup[i]) {
      countingLookup[i] = countingLookup[i] + (countingLookup[i - 1] || lastObservedCount);
      lastObservedCount = countingLookup[i];
    }
  }

  const copyArray = [...array];
  copyArray.forEach(copyElement => {
    array[countingLookup[copyElement] - 1] = copyElement;
    countingLookup[copyElement] = countingLookup[copyElement] - 1;
  });

  return array;
}
let arrayToSort = [1, 2, 4, 5, 2, 4, 5, 1, 2, 2, 5, 4];
console.log(arrayToSort);
countingSort(arrayToSort);
console.log(arrayToSort);
