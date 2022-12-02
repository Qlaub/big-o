import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import Graph from "../../components/graph";
import { data, SortAlgoObj } from "../../lib/data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Card,
  CircularProgress,
  IconButton,
} from '@mui/material'
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { averageTimeSeconds, chooseBackgroundColor, firstLetterToUppercase } from "../../lib/functions/helperFunctions";

export type SubmittedSort = SortAlgoObj & {
  status: 'idle' | 'working' | 'ready' | 'complete' | 'stopped',
  timeSeconds: number | null;
};

interface WorkerStatus {
  status: 'idle' | 'working' | 'ready';
  data: number | null;
}

export default function Demonstration() {
  const workerRef = useRef<Worker>();
  const workerRef2 = useRef<Worker>();
  const workerRef3 = useRef<Worker>();
  const workerRef4 = useRef<Worker>();

  const [selectedSorts, setSelectedSorts] = useState<SortAlgoObj[]>([]);
  const [submittedSorts, setSubmittedSorts] = useState<SubmittedSort[]>([]);
  const [n, setN] = useState(1);
  const [status, setStatus] = useState('idle');
  const [workerStatus1, setWorkerStatus1] = useState<WorkerStatus>({ status: 'idle', data: null });
  const [workerStatus2, setWorkerStatus2] = useState<WorkerStatus>({ status: 'idle', data: null });
  const [workerStatus3, setWorkerStatus3] = useState<WorkerStatus>({ status: 'idle', data: null });
  const [workerStatus4, setWorkerStatus4] = useState<WorkerStatus>({ status: 'idle', data: null });

  // ---- Web workers ----
  useEffect(() => {
    setupWorkers();

    return () => {
      workerRef.current?.terminate();
    }
  }, []);

  const setupWorkers = () => {
    // Register
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url));
    workerRef2.current = new Worker(new URL('../../worker2.ts', import.meta.url));
    workerRef3.current = new Worker(new URL('../../worker3.ts', import.meta.url));
    workerRef4.current = new Worker(new URL('../../worker4.ts', import.meta.url));

    // Handle response
    workerRef.current.onmessage = (event: MessageEvent<number>) => { 
      if (event.data !== -1) {
        setWorkerStatus1({
          data: event.data,
          status: 'ready'
        });
      } else {
        console.log('Worker 1 error');
      }
    };

    workerRef2.current.onmessage = (event: MessageEvent<number>) => {
      if (event.data !== -1) {
        setWorkerStatus2({
          data: event.data,
          status: 'ready'
        });
      } else {
        console.log('Worker 2 error');
      }
    }
    workerRef3.current.onmessage = (event: MessageEvent<number>) => {
      if (event.data !== -1) {
        setWorkerStatus3({
          data: event.data,
          status: 'ready'
        });
      } else {
        console.log('Worker 3 error');
      }
    }
    workerRef4.current.onmessage = (event: MessageEvent<number>) => {
      if (event.data !== -1) {
        setWorkerStatus4({
          data: event.data,
          status: 'ready'
        });
      } else {
        console.log('Worker 4 error');
      }
    }
  };

  const stopWorking = () => {
    workerRef.current?.terminate();
    workerRef2.current?.terminate();
    workerRef3.current?.terminate();
    workerRef4.current?.terminate();
    setStatus('idle');
    setupWorkers();
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
    if (status === 'idle') return;
    const toastTimer = setTimeout(notify, 4000);

    return () => {
      clearTimeout(toastTimer);
    }
  }, [status]);
  // ----

  // ---- Handlers ----
  const handleChange = (event: any) => {

    // Change N
    if (typeof event === 'number') setN(event);

    // Change selectedSorts
    else {
      const { target: { value } } = event;
      const sortNames: string[] = typeof value === 'string' ? value.split(',') : value;
      let newSorts: SortAlgoObj[] = [];
      sortNames.forEach(name => {
        const sortObj = data.find(sort => sort.name === name);
        if (sortObj) newSorts.push(sortObj);
      });

      setSelectedSorts(newSorts);
    }
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // Validation
    const stillWorking = submittedSorts.find(sort => sort.status === 'working');
    if (stillWorking) return;
    if (!selectedSorts[0]) return;
    if (!n || n < 1 || n > 100000000) return;

    // Convert selectedSorts to submittedSorts
    const sorts = selectedSorts.map((sort, i) => {
      const status: 'idle' | 'ready' | 'working' | 'complete' | 'stopped' = i === 0 ? 'working' : 'idle';
      return {
        ...sort,
        status,
        timeSeconds: null,
      }
    });

    setSubmittedSorts(sorts);

    const sortNames = selectedSorts.map(sort => sort.name);

    workerRef.current?.postMessage({n, name: sortNames[0]});
    workerRef2.current?.postMessage({n, name: sortNames[0]});
    workerRef3.current?.postMessage({n, name: sortNames[0]});
    workerRef4.current?.postMessage({n, name: sortNames[0]});
  };
  // ----

  // Handles changes in worker status
  useEffect(() => {
    // Workers are all ready
    let readyCount = 0;
    if (workerStatus1.status === "ready" && typeof workerStatus1.data === 'number') readyCount++
    if (workerStatus2.status === "ready") readyCount++
    if (workerStatus3.status === "ready") readyCount++
    if (workerStatus4.status === "ready") readyCount++

    if (readyCount === 4) {
      const average = averageTimeSeconds([
        workerStatus1.data,
        workerStatus2.data,
        workerStatus3.data,
        workerStatus4.data
      ]);
      let status: 'idle' | 'working' | 'ready' = 'idle';

      // Update submittedSorts
      const currentSortIndex = submittedSorts.findIndex(sort => sort.status === 'working');
      const nextSortIndex = submittedSorts.findIndex(sort => sort.status === 'idle');

      if (currentSortIndex !== -1) {
        submittedSorts[currentSortIndex].status = 'ready';
        submittedSorts[currentSortIndex].timeSeconds = average;
      }
      if (nextSortIndex !== -1) {
        status = 'working';
        const name = submittedSorts[nextSortIndex].name;
        submittedSorts[nextSortIndex].status = 'working';
        workerRef.current?.postMessage({n, name});
        workerRef2.current?.postMessage({n, name});
        workerRef3.current?.postMessage({n, name});
        workerRef4.current?.postMessage({n, name});
      }

      setWorkerStatus1({
        data: null,
        status,
      });
      setWorkerStatus2({
        data: null,
        status,
      });
      setWorkerStatus3({
        data: null,
        status,
      });
      setWorkerStatus4({
        data: null,
        status,
      });
      setSubmittedSorts([...submittedSorts]);
    }
    // ----
    
    // Workers are all idle

  }, [workerStatus1, workerStatus2, workerStatus3, workerStatus4]);

  return (
    <div className={`w-full flex items-center flex-col`}>
      <h2 className="">Chart</h2>
      <section className={`w-full flex flex-col items-center`}>
        <div className="w-full flex justify-end items-center">
          <p className="rotate-[270deg] w-[24px]">time</p>
          <div className="bg-white rounded w-full mr-[6px]">
            <Graph sorts={submittedSorts} n={n} status={status} setStatus={setStatus} setSubmittedSorts={setSubmittedSorts} />
          </div>
        </div>
        <p>size</p>
      </section>
      <div className="max-w-full flex flex-wrap items-center justify-center space-between">
        <MultipleSelectCheckmarks selectedSorts={selectedSorts} handleChange={handleChange} />
      </div>
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
        <button className="bg-white text-black rounded-lg h-10 w-24 flex items-center justify-center">
          {status !== 'idle' ?
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
        <div>
          <h3>Results:</h3>
          <div>
            {submittedSorts &&
              (submittedSorts.map((sort, i) => {
                return (
                  <Card 
                    key={i}
                    sx={{ 
                      backgroundColor: chooseBackgroundColor(sort.status),
                      padding: '5px',
                      marginBottom: '2px'
                    }}
                  >
                    <h4>{sort.name}</h4>
                    <div className="flex justify-between items-center w-full">
                      <div>Status: {firstLetterToUppercase(sort.status)}</div>
                      {sort.status === 'working' && 
                        <IconButton color="error" size="small">
                          <DangerousIcon sx={{ fontSize: '46px' }}/>
                        </IconButton>
                      }
                    </div>
                    <div>
                      Result: {sort.timeSeconds ? sort.timeSeconds.toFixed(2) + 's' : '-'}
                    </div>
                  </Card>
                )})
              )
            }
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
};

function MultipleSelectCheckmarks(
  {selectedSorts, handleChange}: {selectedSorts: SortAlgoObj[], handleChange: any}) 
{

  const sortNames = selectedSorts[0] ? selectedSorts?.map(sort => sort.name) : [];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, color: 'white' }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{ color: 'white' }}>Sorting Algorithms</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={sortNames}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ 
            backgroundColor: 'black',

            color: 'white',
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
          }}
        >
          {data.map((sort, i) => (
            <MenuItem key={i} value={sort.name}>
              <Checkbox checked={sortNames.indexOf(sort.name) > -1} />
              <ListItemText primary={sort.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}