// Create an array of numbers ranging from 1 up to n
export const generateData = (n: number) => {
  if (n < 1) return null;

  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(i + 1);
  }

  return data;
};
