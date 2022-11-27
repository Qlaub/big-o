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
import { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { data, SortAlgoObj } from "../../lib/data";

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
  sort: SortAlgoObj;
  n: number;
  time: number;
}

export default function Graph({ sort, n, time }: GraphProps) {
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

  // Add new data point to graph
  useEffect(() => {
    if (time === -1) return;

    (() => {
      let index = 0;
      // Find data and associated index to update in datasets array
      const toUpdate = datasets.find((dataset, i) => {
        if (dataset.label === sort.name) {
          index = i;
          return true;
        }
      });
      // Create new dataset array with identical data
      const newDataset = [...datasets];
      // Insert new data into object array at correct index
      newDataset[index].data.push({x: n, y: time});
  
      // TO-DO: re-sort the data points if necessary before pushing
  
      setDatasets(newDataset);
    })();
  }, [time]);

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