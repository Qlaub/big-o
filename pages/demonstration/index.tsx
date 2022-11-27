import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import Graph from "../../components/graph";
import { data, SortAlgoObj } from "../../lib/data";
import { calculateTime } from "../../lib/functions/helperFunctions";

export default function Demonstration() {

  // Web worker
  const workerRef = useRef<Worker>()

  useEffect(() => {
    // Register
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url));

    // Handle response
    workerRef.current.onmessage = (event: MessageEvent<string>) => {
      console.log(`web worker response: ${event.data}`);      
    }

    return () => {
      console.log("i'll be back. EAUGH!")
      workerRef.current?.terminate();
    }
  }, []);

  useEffect(() => {
    console.log('sending message from page');
    workerRef.current?.postMessage('hi');
  }, []);
  // -----

  const [chosenSort, setChosenSort] = useState<SortAlgoObj>(data[0]);
  const [n, setN] = useState(1);
  const [time, setTime] = useState(0);
  const [addPoint, setAddPoint] = useState(false);

  const handleChangeSort = (sort: SortAlgoObj) => setChosenSort(sort);

  const handleChangeN = (val: number) => setN(val);

  const handleCalculateTime = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!chosenSort) return;
    if (!n || n < 1) return;

    workerRef.current?.postMessage({n, name: chosenSort.name});

    const time = calculateTime(n, chosenSort.func);
    setTime(time);

    setAddPoint(true);
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
                onClick={() => handleChangeSort(sort)}
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
        onSubmit={(e) => handleCalculateTime(e)}
      >
        <label className="flex items-center gap-1">
        n = 
          <input 
            className="bg-white text-black resize-none flex text-center w-28" 
            type="number"
            min="1"
            value={n} 
            onChange={e => handleChangeN(parseInt(e.target.value))}
          />
        </label>
        <div className="flex gap-1">
          <span>Time:</span>
          <div className="bg-zinc-700 text-white px-1">{time}</div>
          <span>seconds</span>
        </div>
        <button className="bg-white text-black rounded-lg py-2 px-5">
          Sort
        </button>
      </form>
      <div className="w-[66vw]">
        <Graph sort={chosenSort} n={n} time={time} addPoint={addPoint} setAddPoint={setAddPoint} />
      </div>
    </div>
  )
};
