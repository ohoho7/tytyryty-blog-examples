import {IComparator} from "./comparator";
const numberComparator: IComparator<number> = (a: number, b: number) => a - b;

function bubbleSort<T>(array: Array<T>, comparator: IComparator<T>): Array<T> {
  let shouldIterate: boolean = true;
  while (shouldIterate) {
    shouldIterate = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (comparator(array[i], array[i + 1]) > 0) {
        shouldIterate = true;
        [array[i], array[i+1]] = [array[i+1], array[i]];
      }
    }
  }
  return array;
}
let arrayToSort = [4, 3, 1, 6];
bubbleSort(arrayToSort, numberComparator);
console.log(arrayToSort);
