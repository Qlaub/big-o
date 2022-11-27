import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import Graph from "../../components/graph";
import { data, SortAlgoObj } from "../../lib/data";

export default function Demonstration() {
  const [chosenSort, setChosenSort] = useState<SortAlgoObj>(data[0]);
  const [n, setN] = useState(1);
  const [time, setTime] = useState(-1);
  const [working, setWorking] = useState(false);

  // Web worker
  const workerRef = useRef<Worker>();

  useEffect(() => {
    // Register
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url));

    // Handle response
    workerRef.current.onmessage = (event: MessageEvent<number>) => { 
      if (event.data !== -1) {
        setTime(event.data);
        setWorking(false);
      } else {
        console.log('error');
      }
    }

    return () => {
      workerRef.current?.terminate();
    }
  }, []);
  // -----

  const handleChange = (data: number | SortAlgoObj) => {
    if (typeof data === 'number') setN(data);
    else setChosenSort(data);
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!chosenSort) return;
    if (!n || n < 1) return;

    setWorking(true);
    workerRef.current?.postMessage({n, name: chosenSort.name});
  };

  return (
    <div className="w-100vw flex items-center flex-col gap-5">
      <ul className="w-100vw flex items-center justify-center space-between gap-3">
        {data.map((sort, i) => {
          return (
            <li key={i}>
              <button 
                className={
                  `border 
                  border-white 
                  rounded 
                  p-2 
                  hover:bg-white 
                  hover:text-black 
                  ${sort.func === chosenSort.func && 'bg-white text-black'}`
                }
                onClick={() => handleChange(sort)}
                disabled={sort.func === chosenSort.func && true}
              >
                {sort.name}
              </button>
            </li>
          )
        })}
      </ul>
      <form 
        className="flex flex-col gap-2 items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex items-center gap-1">
        n = 
          <input 
            className="bg-white text-black resize-none flex text-center w-28" 
            type="number"
            min="1"
            value={n} 
            onChange={e => handleChange(parseInt(e.target.value))}
          />
        </label>
        <div className="flex gap-1">
          <span>Time:</span>
          <div className="bg-zinc-700 text-white px-1">{time === -1 ? '-' : time}</div>
          <span>seconds</span>
        </div>
        <button className="bg-white text-black rounded-lg h-10 w-24 flex items-center justify-center">
          {working ?
            <div className="inline-block w-8 h-8 
              border-4
              border-t-black
              border-l-grey
              border-b-grey
              border-r-grey
              rounded-full 
              animate-spin"
            />
            :
            'Sort'
          }
        </button>
      </form>
      <div className="w-[66vw]">
        <Graph sort={chosenSort} n={n} time={time} />
      </div>
    </div>
  )
};
