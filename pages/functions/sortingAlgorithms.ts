// Compares each element to next element and swaps if necessary
export const bubbleSort = (data: Array<number>) => {
  const length = data.length;

  for (let i = 0; i < length; i++) {
    let isSwapped = false;

    for (let n = 0; n < length - i - 1; n++) {
      if (data[n] > data[n+1]) {
        const hold = data[n];
        data[n] = data[n+1];
        data[n+1] = hold;
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
      const hold = data[i];
      data[i] = data[minIndex];
      data[minIndex] = hold;
    }
  }

  return data;
};
