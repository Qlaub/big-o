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
    try {
      const timeElapsed = calculateTime(n, sort.func);
      postMessage(timeElapsed);
    } catch(err) {
      console.log(err);
      postMessage(-1);
    }
  } else {
    postMessage(-1);
  }
});
