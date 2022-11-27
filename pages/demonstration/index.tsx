import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import Graph from "../../components/graph";
import { data, SortAlgoObj } from "../../lib/data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Demonstration() {
  const [chosenSort, setChosenSort] = useState<SortAlgoObj>(data[0]);
  const [n, setN] = useState(1);
  const [time, setTime] = useState(-1);
  const [working, setWorking] = useState(false);

  // ---- Web worker ----
  const workerRef = useRef<Worker>();

  useEffect(() => {
    setupWorker();

    return () => {
      workerRef.current?.terminate();
    }
  }, []);

  const setupWorker = () => {
    // Register
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url));

    // Handle response
    workerRef.current.onmessage = (event: MessageEvent<number>) => { 
      if (event.data !== -1) setTime(event.data);
      else console.log('error');
      setWorking(false);
    };
  };

  const stopWorking = () => {
    workerRef.current?.terminate();
    setWorking(false);
    setupWorker();
  };
  // ----

  // ---- Toast notification ----
  const notify = () => {
    return toast.info('Taking too long? Press the spinning button to stop sorting.', {
      position: "bottom-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (!working) return;
    const toastTimer = setTimeout(notify, 4000);

    return () => {
      clearTimeout(toastTimer);
    }
  }, [working]);
  // ----

  // ---- Handlers ----
  const handleChange = (data: number | SortAlgoObj) => {
    if (typeof data === 'number') setN(data);
    else setChosenSort(data);
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (working) return stopWorking();
    if (!chosenSort) return;
    if (!n || n < 1 || n > 100000000) return;

    setWorking(true);
    workerRef.current?.postMessage({n, name: chosenSort.name});
  };
  // ----

  return (
    <div className={`w-full flex items-center flex-col`}>
      <ul className="max-w-full flex flex-wrap items-center justify-center space-between">
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
      <div className={`w-full flex flex-col items-center`}>
        <div className="w-full flex justify-center items-center">
          <div className="rotate-[270deg] w-[24px]">time</div>
          <div className="bg-white rounded w-full mr-[6px]">
            <Graph sort={chosenSort} n={n} time={time} />
          </div>
        </div>
        <p>size</p>
      </div>
      <ToastContainer />
    </div>
  )
};
