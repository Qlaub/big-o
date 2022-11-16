import { 
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
  bucketSort,
  shellSort,
  heapSort,
  timSort, 
} from "./functions/sortAlgorithms";

export const data = [
  {
    name: 'Bubble Sort',
    func: bubbleSort,
  },
  {
    name: 'Selection Sort',
    func: selectionSort,
  },
  {
    name: 'Insertion Sort',
    func: insertionSort,
  },
  {
    name: 'Quick Sort',
    func: quickSort,
  },
  {
    name: 'Merge Sort',
    func: mergeSort,
  },
  {
    name: 'Bucket Sort',
    func: bucketSort,
  },
  {
    name: 'Shell Sort',
    func: shellSort,
  },
  {
    name: 'Heap Sort',
    func: heapSort,
  },
  {
    name: 'Tim Sort',
    func: timSort,
  },
];