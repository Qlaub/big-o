import { knuthShuffle } from "./shuffleAlgorithms";

// Create an array of numbers from 1 up through a given number
export const generateData = (n: number) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(i + 1);
  }

  return data;
};

//
export const calculateTime = (n: number, algorithm: Function) => {
  const dataArr = generateData(n);

  const randDataArr = knuthShuffle(dataArr);

  const t1 = performance.now();
  algorithm(randDataArr);
  const t2 = performance.now();

  const timeDiff = (t2 - t1) / 1000;

  return timeDiff;
};
