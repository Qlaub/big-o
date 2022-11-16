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
import { Line, Scatter } from 'react-chartjs-2';

export default function Graph() {
  // const [graphData, setGraphData] = useState(
  //   {

  //   }
  // );
  const [labels, setLabels] = useState<Array<number>>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  // Note: Labels seem unnecessary
  // Populate labels
  useEffect(() => {
    const temp = [];
    for (let i = 0; i <= 1000; i++) {
      temp.push(i);
    }
    setLabels(temp);
  }, []);

  const graphData = {
    // labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [{x: 1, y: 100}, {x: 100, y: 200}, {x: 900, y: 250}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        showLine: true,
      },
      {
        label: 'Dataset 2',
        data: [{x: 20, y: 100}, {x: 50, y: 500}, {x: 100, y: 420}, {x: 150, y: 250}],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        showLine: true,
      },
      {
        label: 'Dataset 3',
        data: [],
        borderColor: 'rgb(100, 100, 255)',
        backgroundColor: 'rgba(100, 100, 100, 0.5)'
      },
    ],
    options: {
      scales: {
        xAxes: [{
         display: true,
          scaleLabel: {
            display: true,
          },
          ticks: {
            min: 0,
            max: 30,
            stepSize: 1
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Size (no. of elements)"
          }
        }]
      }
    }
  };

  return (
    <Scatter options={options} data={graphData} />
  )
}