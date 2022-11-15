// Compares each element to next element and swaps if necessary
export const bubbleSort = (data: Array<number>) => {
  const length = data.length;

  for (let i = 0; i < length; i++) {
    let isSwapped = false;

    for (let n = 0; n < length - i - 1; n++) {
      if (data[n] > data[n+1]) {
        const temp = data[n];
        data[n] = data[n+1];
        data[n+1] = temp;
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
      const temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;
      // test if the below code is more efficient for this block
      // [data[i], data[minIndex]] = [data[minIndex], data[i]];
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

// 
export const quickSort = (data: Array<number>, low = 0, high = data.length - 1) => {

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