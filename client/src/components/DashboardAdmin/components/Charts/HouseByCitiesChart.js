import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { randomBackgroundColorChart } from '../../../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HouseByCitiesChart({ houseByCities }) {
    const data = {
        labels: houseByCities.map(h => h._id),
        datasets: [
            {
                label: '# of Votes',
                data: houseByCities.map(h => h.count),
                backgroundColor: randomBackgroundColorChart(houseByCities),
                borderColor: randomBackgroundColorChart(houseByCities),
                borderWidth: 1,
            },
        ],
    };
    return (
        <Pie data={data} />
    )
}
