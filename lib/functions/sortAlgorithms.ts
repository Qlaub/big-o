import { swapData } from "./helperFunctions";

// Compares each element to next element and swaps if necessary
export const bubbleSort = (data: Array<number>) => {
  const length = data.length;

  for (let i = 0; i < length; i++) {
    let isSwapped = false;

    for (let n = 0; n < length - i - 1; n++) {
      if (data[n] > data[n+1]) {
        // const temp = data[n];
        // data[n] = data[n+1];
        // data[n+1] = temp;
        swapData(data, n, n+1);
        isSwapped = true;
      }
    }

    if (isSwapped === false) break;
  }

  return data;
};

// Compares each number to every number after it and swaps with lowest number
export const selectionSort = (data: Array<number>) => {
  const length = data.length;

  for (let i = 0; i < length; i++) {
    let minIndex = i;

    for (let n = i + 1; n < length; n++) {
      if (data[n] < data[minIndex]) {
        minIndex = n;
      }
    }

    if (minIndex !== i) {
      // const temp = data[i];
      // data[i] = data[minIndex];
      // data[minIndex] = temp;
      swapData(data, i, minIndex);
    }
  }

  return data;
};

// For each index, compares each number to every number before it until the correct position is found
export const insertionSort = (data: Array<number>) => {
  const length = data.length;

  for (let i = 1; i < length; i++) {
    const temp = data[i];

    let minIndex = i;

    while (minIndex > 0 && temp < data[minIndex - 1]) {
      data[minIndex] = data[minIndex - 1];
      minIndex -= 1
    }

    data[minIndex] = temp;
  }

  return data;
};

// Break data into two parts around the chosen pivot
// Pivot starts as the data at the middle index of the array
// Data in the left side of the array is compared against the pivot, starting at lowest index
// Left index is shifted right if the data at the left index is less than the pivot, stops if greater than pivot
// Data in the right side of the array is compared against the pivot, starting at the highest index
// Right index is shifted left if the data at the right index is greater than the pivot, stops if less than pivot
// Data at the right and left indexes are swapped if left index data is less than or equal to the right index data
// Left index is now the pivot
// Recursively call sort function with new pivot
export const quickSort = (data: Array<number>, left = 0, right = data.length - 1) => {
  const sort = (data: Array<number>, left: number, right: number) => {
    let index: number;

    if (data.length > 1) {
      index = partition(data, left, right);

      if (left < index - 1) { // more elements on left side of pivot
        sort(data, left, index - 1);
      }

      if (index < right) { // more elements on right side of pivot
        sort(data, index, right);
      }
    }

    return data;
  };

  const partition = (data: Array<number>, left: number, right: number) => {
    const pivot = data[Math.floor((right + left) / 2)]; // Middle of array
    let leftIndex = left;
    let rightIndex = right;

    while (leftIndex <= rightIndex) {
      while (data[leftIndex] < pivot) leftIndex++;
      while (data[rightIndex] > pivot) rightIndex--;

      if (leftIndex <= rightIndex) {
        swapData(data, leftIndex, rightIndex);
        leftIndex++;
        rightIndex--;
      }
    }
    return leftIndex;
  };

  sort(data, left, right);
};

//
export const mergeSort = (data: Array<number>) => {

};

//
export const bucketSort = (data: Array<number>) => {

};

//
export const shellSort = (data: Array<number>, length: number) => {

};

//
export const heapSort = (data: Array<number>) => {

};

//
export const timSort = (data: Array<number>, left: number, right: number) => {

};