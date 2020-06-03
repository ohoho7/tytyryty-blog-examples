import {IComparator} from "./comparator";

const numberComparator: IComparator<number> = (a: number, b: number) => a - b;
export default numberComparator;
