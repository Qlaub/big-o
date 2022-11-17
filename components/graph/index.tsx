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
import { data } from "../../lib/data";
import { PointObject } from '../../pages/demonstration';

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

export default function Graph({ point }: { point: PointObject }) {
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

  useEffect(() => {
    if (point.n === 0) return;

    let index = 0;
    const set = datasets.find((o, i) => {
      if (o.label === point.sortName) {
        index = i;
        return true;
      }
    });
    const newDataset = [...datasets]
    newDataset[index].data.push({x: point.n, y: point.time})
    setDatasets(newDataset);
  }, [point]);

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
          display: true,
          text: 'Time',
          color: 'white',
          font: {
            size: 24,
          }
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'n',
          color: 'white',
          font: {
            size: 24,
            style: 'italic'
          }
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  const graphData = { datasets };

  return (
    <Scatter options={options} data={graphData} />
  )
}