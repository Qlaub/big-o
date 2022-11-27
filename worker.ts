import { data } from './lib/data';
import { calculateTime } from './lib/functions/helperFunctions';

interface Message {
  n: number;
  name: string;
}

addEventListener('message', (event: MessageEvent<Message>) => {
  const {n, name} = event.data;
  const sort = data.find(sort => sort.name === name);
  if (sort) {
    const timeElapsed = calculateTime(n, sort.func);
    postMessage(timeElapsed);
  } else {
    postMessage(-1);
  }
});
