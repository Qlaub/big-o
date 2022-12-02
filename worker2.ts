import { data } from './lib/data';
import { calculateTime } from './lib/functions/helperFunctions';
import { AlgorithmInput } from './worker';

addEventListener('message', (event: MessageEvent<AlgorithmInput>) => {
  const { n, name } = event.data;
  const sort = data.find(sort => sort.name === name);
  if (!sort) return;
  const timeElapsed = calculateTime(n, sort.func);
  postMessage(timeElapsed);
});
