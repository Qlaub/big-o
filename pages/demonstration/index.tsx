import { BaseSyntheticEvent, useState } from "react";
import Graph from "../../components/graph";
import { data } from "../../lib/data";
import { calculateTime } from "../../lib/functions/helperFunctions";

export default function Demonstration() {
  const [chosenSort, setChosenSort] = useState<Function>(() => data[0].func);
  const [n, setN] = useState(1);
  const [time, setTime] = useState(0);

  const handleChangeSort = (func: Function) => setChosenSort(() => func);

  const handleChangeN = (val: number) => setN(val);

  const handleCalculateTime = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!chosenSort) return;
    if (!n || n < 1) return;

    const time = calculateTime(n, chosenSort);

    setTime(time);
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
                  ${sort.func === chosenSort && 'bg-white text-black'}`
                }
                onClick={() => handleChangeSort(sort.func)}
                disabled={sort.func === chosenSort && true}
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
        <Graph />
      </div>
    </div>
  )
};
