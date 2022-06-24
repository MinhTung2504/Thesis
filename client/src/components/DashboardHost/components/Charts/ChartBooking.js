import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { randomBackgroundColorChart } from '../../../../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartBooking({ bookingStat }) {
    const options = {
        parsing: {
            xAxisKey: "period",
            yAxisKey: "count",
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month',
                    color: '#A9A9A9',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                    padding: { top: 20, left: 0, right: 0, bottom: 0 }
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Quantity',
                    color: '#A9A9A2',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2
                    },
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        ticks: {
            stepSize: 1
        }
    }

    const data = {
        datasets: [
            {
                data: bookingStat,
                backgroundColor: randomBackgroundColorChart(bookingStat),
                fill: false
            },
        ]
    }
    return (
        <Bar options={options} data={data} />
    )
}
