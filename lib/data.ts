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
  randomSort, 
} from "./functions/sortAlgorithms";

export interface SortAlgoObj {
  name: string;
  func: Function;
  borderColor: string;
  backgroundColor: string;
  timeComplexity: {
    worst: string;
    best: string;
    average: string;
  }
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
}

export const data: Array<SortAlgoObj> = [
  {
    name: 'Bubble Sort',
    func: bubbleSort,
    borderColor: 'red',
    backgroundColor: 'red',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n^2)',
      average: '0(n^2)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  },
  {
    name: 'Selection Sort',
    func: selectionSort,
    borderColor: 'orange',
    backgroundColor: 'orange',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n^2)',
      average: '0(n^2)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
  },
  {
    name: 'Insertion Sort',
    func: insertionSort,
    borderColor: 'yellow',
    backgroundColor: 'yellow',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n^2)',
      average: '0(n^2)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  },
  {
    name: 'Quick Sort',
    func: quickSort,
    borderColor: 'green',
    backgroundColor: 'green',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n*log(n))',
      average: '0(n*log(n))',
    },
    spaceComplexity: 'O(n)',
    stable: false,
    inPlace: true, // needs verification - strict definition or loose?
  },
  {
    name: 'Merge Sort',
    func: mergeSort,
    borderColor: 'blue',
    backgroundColor: 'blue',
    timeComplexity: {
      worst: '0(n*log(n))',
      best: '0(n*log(n))',
      average: '0(n*log(n))',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
  },
  {
    name: 'Bucket Sort',
    func: bucketSort,
    borderColor: 'indigo',
    backgroundColor: 'indigo',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n+k)',
      average: '0(n)',
    },
    spaceComplexity: 'O(n+k)',
    stable: false,
    inPlace: false,
  },
  {
    name: 'Shell Sort',
    func: shellSort,
    borderColor: 'violet',
    backgroundColor: 'violet',
    timeComplexity: {
      worst: '0(n^2)',
      best: '0(n^1.25)',
      average: '0(n*log(n))',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
  },
  {
    name: 'Heap Sort',
    func: heapSort,
    borderColor: 'brown',
    backgroundColor: 'brown',
    timeComplexity: {
      worst: '0(n*log(n))',
      best: '0(n*log(n))',
      average: '0(n*log(n))',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
  },
  {
    name: 'Tim Sort',
    func: timSort,
    borderColor: 'black',
    backgroundColor: 'white',
    timeComplexity: {
      worst: '0(n*log(n))',
      best: '0(n)',
      average: '0(n*log(n))',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false, // needs verification - strict or loose definition?
  },
  {
    name: 'Random Sort',
    func: randomSort,
    borderColor: 'teal',
    backgroundColor: 'teal',
    timeComplexity: {
      worst: 'O(∞)',
      best: 'O(n)',
      average: 'O(n!)'
    },
    spaceComplexity: '0(1)',
    stable: false,
    inPlace: false,
  }
];