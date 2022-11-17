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

export interface SortAlgoObj {
  name: string;
  func: Function;
  borderColor: string;
  backgroundColor: string;
}

export const data: Array<SortAlgoObj> = [
  {
    name: 'Bubble Sort',
    func: bubbleSort,
    borderColor: 'red',
    backgroundColor: 'red',
  },
  {
    name: 'Selection Sort',
    func: selectionSort,
    borderColor: 'orange',
    backgroundColor: 'orange',
  },
  {
    name: 'Insertion Sort',
    func: insertionSort,
    borderColor: 'yellow',
    backgroundColor: 'yellow',
  },
  {
    name: 'Quick Sort',
    func: quickSort,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  {
    name: 'Merge Sort',
    func: mergeSort,
    borderColor: 'blue',
    backgroundColor: 'blue',
  },
  {
    name: 'Bucket Sort',
    func: bucketSort,
    borderColor: 'indigo',
    backgroundColor: 'indigo',
  },
  {
    name: 'Shell Sort',
    func: shellSort,
    borderColor: 'violet',
    backgroundColor: 'violet',
  },
  {
    name: 'Heap Sort',
    func: heapSort,
    borderColor: 'brown',
    backgroundColor: 'brown',
  },
  {
    name: 'Tim Sort',
    func: timSort,
    borderColor: 'white',
    backgroundColor: 'white',
  },
];