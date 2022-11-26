import { swapData } from "./helperFunctions";
// What's happening in each?
// What situations would each sort be useful in?
// What are the constraints of each sort?
// Predict the performance difference between running in the frontend vs backend
// Record the actual difference

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
// Used by JS sort method
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

  (function sort (data: Array<number>, left: number, right: number) {
    let index: number;

    if (data.length > 1) {
      index = partition(data, left, right);
      
      if (left < index - 1) sort(data, left, index - 1); // More elements on left side of pivot
      
      if (index < right) sort(data, index, right); // More elements on right side of pivot
    }

    return data;

  })(data, left, right); // Self-invoking
};

// Default sort used by Mozilla
// Significantly (read: suspiciously) longer to sort 1,000,000 numbers than quicksort - though expected, double check anyway
export const mergeSort = (data: Array<number>) => {
  const merge = (left: Array<number>, right: Array<number>) => {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
  };

  (function sort (data: Array<number>): any {
    const half = data.length / 2
    
    // Base case or terminating case
    if(data.length < 2){
      return data 
    }
    
    const left = data.splice(0, half)
    return merge(sort(left),sort(data))
  })(data);
  
};

// TODO - how to determine bucket size based on array length
export const bucketSort = (data: Array<number>) => {
  if (data.length === 0) {
      return data;
  }
  let i,
  minValue = data[0],
  maxValue = data[0],
  bucketSize = Math.sqrt(data.length);
  data.forEach(function (currentVal) {
      if (currentVal < minValue) {
        minValue = currentVal;
      } else if (currentVal > maxValue) {
        maxValue = currentVal;
      }
  })
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  let allBuckets = new Array(bucketCount);
  for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
  }
  data.forEach(function (currentVal) {
      allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
  });
  data.length = 0;
  allBuckets.forEach(function(bucket) {
      insertionSort(bucket);
      bucket.forEach(function(element: number) {
        data.push(element)
      });
  });
  return data;
};

//
export const shellSort = (data: Array<number>, length = data.length) => {
	// Start with a really large gap, and then reduce the gap until there isn't any
	// With this, the gap starts as half of the array length, and then half of that every time
	for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2))
	{
		// Do an insertion sort for each of the section the gap ends up dividing
		for (let outer = gap; outer < length; outer ++)
		{
			// We store the current variable
			let temp = data[outer];
			
			// This is the insertion sort to sort the section into order
			let inner;
			for (inner = outer; inner >= gap && data[inner - gap] > temp; inner -= gap)
			{
				data[inner] = data[inner - gap];
			}

			data[inner] = temp;
		}
	}
	return data;
};

//
export const heapSort = (data: Array<number>) => {
  (function (data){
    const length = data.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--)
      heapify(data, length, i);

    // One by one extract an element from heap
    for (let i = length - 1; i > 0; i--) {
      // Move current root to end
      swapData(data, data[0], data[i]);

      // call max heapify on the reduced heap
      heapify(data, i, 0);
    }
  })(data);

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  function heapify(data: number[],length: number, i: number) {
    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < length && data[l] > data[largest])
      largest = l;

    // If right child is larger than largest so far
    if (r < length && data[r] > data[largest])
      largest = r;

    // If largest is not root
    if (largest != i) {
      swapData(data, data[i], data[largest]);

      // Recursively heapify the affected sub-tree
      heapify(data, length, largest);
    }
  }
};

//
export const timSort = (data: Array<number>, left: number, right: number) => {

};