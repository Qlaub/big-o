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

export const averageTimeSeconds = (times: any[]) => {
  let sum = 0;
  for (let i = 0; i < times.length; i++) {
    if (typeof times[i] !== 'number') break;
    sum += times[i];
  }
  const average = sum / times.length;

  return average;
}

export const firstLetterToUppercase = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const chooseBackgroundColor = (status: string) => {
  let color = '#ffffff';
  if (status === 'working') color = '#fef08a';
  if (status === 'complete') color = '#86efac';
  if (status === 'stopped') color = '#f87171';

  return color;
};