export type TComparator<T> = (a: T, b: T) => number;
export interface IComparator<T> {
  (a: T, b: T): number;
}
