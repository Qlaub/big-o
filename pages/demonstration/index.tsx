import { BaseSyntheticEvent, useState } from "react";
import { data } from "../../lib/data";
import { calculateTime } from "../../lib/functions/helperFunctions";

export default function Demonstration() {
  const [time, setTime] = useState(0);
  const [chosenAlgo, setChosenAlgo] = useState<Function>(() => data[0].func);
  const [num, setNum] = useState(1);

  const handleChangeAlgo = (func: Function) => setChosenAlgo(() => func);

  const handleChangeNum = (e: BaseSyntheticEvent) => setNum(e.target.value);

  const handleCalculateTime = () => {
    if (!chosenAlgo) return;
    if (!num || num < 1) return;

    const time = calculateTime(num, chosenAlgo);

    setTime(time);
  };

  return (
    <div className="w-100vw flex items-center flex-col gap-5">
      <ul className="w-100vw flex items-center justify-center space-between gap-3">
        {data.map((algo, i) => {
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
                  ${algo.func === chosenAlgo && 'border-black bg-white text-black'}`
                }
                onClick={(e) => handleChangeAlgo(algo.func)}
                disabled={algo.func === chosenAlgo && true}
              >
                {algo.name}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-1">
          <span>Time:</span>
          <div className="bg-zinc-700 text-white px-1">{time}</div>
          <span>seconds</span>
        </div>
        <div className="flex items-center gap-1">
        n = 
          <textarea className="bg-white text-black resize-none flex text-center leading-3 pt-3 w-28" 
            value={num} 
            onChange={e => handleChangeNum(e)}
          />
        </div>
        <button 
          className="bg-white text-black rounded p-2"
          onClick={handleCalculateTime}
        >
          Calculate Time
        </button>
      </div>
    </div>
  )
};
