import { knuthShuffle } from "./shuffleAlgorithms";

// Returns a number array 1 through a given number
export const generateData = (n: number) => {
  const data: Array<number> = [];

  for (let i = 0; i < n; i++) {
    data.push(i + 1);
  }

  return data;
};

export const calculateTime = (n: number, sort: Function) => {
  // Create randomized integer array
  const data: Array<number> = generateData(n);
  const randomData: Array<number> = knuthShuffle(data);

  // Capture time before and after sort
  const time1: number = performance.now();
  sort(randomData);
  const time2: number = performance.now();

  // Calculate difference as time elapsed
  const secondsElapsed = (time2 - time1) / 1000; // Convert milliseconds to seconds
  return secondsElapsed;
};

export const swapData = (data: Array<number>, index1: number, index2: number) => {
  const temp = data[index1];
  data[index1] = data[index2];
  data[index2] = temp;
};
