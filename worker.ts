import { data } from './lib/data';
import { calculateTime } from './lib/functions/helperFunctions';

interface Message {
  n: number;
  name: string;
}

addEventListener('message', (event: MessageEvent<Message>) => {
  console.log('web worker message received the following:');
  console.log(event.data);
  const {n, name} = event.data;
  const sort = data.find(sort => sort.name === name);
  if (sort) {
    const timeElapsed = calculateTime(n, sort.func);
    postMessage(`that sort took ${timeElapsed}`);
  } else {
    postMessage('Hmm something went wrong bud');
  }
});
