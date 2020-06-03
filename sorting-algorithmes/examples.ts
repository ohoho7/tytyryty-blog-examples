const array: Array<number> = [4, 3, 1, 6];
Array.prototype.sort.call(array, function(a: number, b: number): number {
    return a - b;
});
// the same as:
array.sort(function(a: number, b: number): number {
    return a - b;
});
console.log(array);
