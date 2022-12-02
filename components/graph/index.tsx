import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { data, SortAlgoObj } from "../../lib/data";
import { SubmittedSort } from '../../pages/demonstration';

interface DataPointObject {
  x: number;
  y: number;
}

interface DatasetObject {
  label: string;
  data: Array<DataPointObject> | never;
  borderColor: string;
  backgroundColor: string;
  showLine: boolean;
}

interface GraphProps {
  sorts: SubmittedSort[];
  setSubmittedSorts: Function;
  n: number;
  status: string;
  setStatus: Function;
}

export default function Graph({ sorts, n, status, setStatus, setSubmittedSorts }: GraphProps) {
  // Sets up datasets equal to the number of sort algorithms
  // TODO: only add a dataset after data has been recorded, which will minimize screen clutter
  // Initialize datasets as empty array
  // When data comes in, check for dataset name in datasets
  // If no dataset present, create dataset 
  // Push the new plot point to our data subarray
  // Return setDatasets(newDataset)
  // If dataset IS present, check if data needs sorting (is new x lower than highest x value so far?)
  // If data needs sorting, sort all data within dataset by x value from lowest to highest
  // Push sorted data into new dataset
  // Return setDatasets(newDataset)
  // If data needs no sorting, create newDataset as copy of old dataset and push new data into data subarray
  // Return setDatasets(newDataset)
  const [datasets, setDatasets] = useState<Array<DatasetObject>>(
    data.map(({ name, borderColor, backgroundColor }) => {
      return {
        label: name,
        data: [],
        borderColor,
        backgroundColor,
        showLine: true,
      }
    })
  );

  const addDataPoint = useCallback((sortIndex: number) => {
    let datasetIndex = 0;
    // Find data and associated datasetIndex to update in datasets array
    const toUpdate = datasets.find((dataset, i) => {
      if (dataset.label === sorts[sortIndex].name) {
        datasetIndex = i;
        return true;
      }
    });
    // Create new dataset array with identical data
    const newDataset = [...datasets];
    const newTime = sorts[sortIndex].timeSeconds;
    if (newTime === null) return;
    // Insert new data into object array at correct datasetIndex
    newDataset[datasetIndex].data.push({x: n, y: newTime});

    // TO-DO: re-sort the data points if necessary before pushing
    setDatasets(newDataset);

    // Set status to complete on submitted sorts
    sorts[sortIndex].status = 'complete';
    setSubmittedSorts([...sorts]);
  }, [n, sorts, datasets]);

  // Add new data point to graph
  useEffect(() => {
    const dataIndex = sorts.findIndex(sort => sort.status === 'ready');
    if (dataIndex === -1) return;
    addDataPoint(dataIndex);
    setStatus('idle');
  }, [status, addDataPoint, setStatus]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'Time Elapsed (s)',
          color: 'black',
          font: {
            size: 16,
            style: 'italic'
          }
        },
        ticks: {
          color: 'black',
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'n',
          color: 'black',
          font: {
            size: 16,
            style: 'italic'
          }
        },
        ticks: {
          color: 'black'
        }
      }
    }
  };

  const graphData = { datasets };

  return (
    <Scatter options={options} data={graphData} />
  )
}