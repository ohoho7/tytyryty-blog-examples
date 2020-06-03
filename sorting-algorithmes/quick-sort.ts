import {IComparator} from "./comparator";
const numberComparator: IComparator<number> = (a: number, b: number) => a - b;

function quickSort<T>(array: Array<T>, comparator: IComparator<T>): Array<T> {
  if (array.length === 0 || array.length === 1) {
    return array;
  } else if (array.length === 2) {
    if (comparator(array[0], array[1]) > 0) {
      [array[0], array[1]] = [array[1], array[0]];
    }
    return array;
  }
  const pivot = array[0];
  const smaller: Array<T> = [];
  const bigger: Array<T> = [];
  const equal: Array<T> = [];
  array.forEach((element: T) => {
    const comparatorResult: number = comparator(pivot, element);
    if (comparatorResult > 0) {
      smaller.push(element);
    } else if (comparatorResult < 0) {
      bigger.push(element);
    } else {
      equal.push(element);
    }
  });

  array.length = 0;
  array.push(
    ...quickSort(smaller, comparator),
    ...equal,
    ...quickSort(bigger, comparator)
  );
  return array;
}

let arrayToSort = [6, 1, 4, 3, 1, 6];
quickSort(arrayToSort, numberComparator);
console.log(arrayToSort);
