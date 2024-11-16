import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getUserToken from '../../utils/auth/getUserToken';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    console.log('volcano id: ', data.id);

    const labels = ["5km", "10km", "30km", "100km"];
    const [chartData, setChartData] = useState([]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    // Get the selected volcano data 
    const getChartData = () => {
        const userToken = getUserToken();

        if (userToken !== null) {
            const request = { method: "GET", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${userToken}` } };

            fetch(`http://4.237.58.241:3000/volcano/${data.id}`, request)
                .then((response) => response.json())
                .then((data) => {
                    const res_data = [data.population_5km, data.population_10km, data.population_30km, data.population_100km];
                    console.log('res_data: ', res_data);
                    setChartData(res_data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }

    // Define the dataset of the bar chart
    const dataset = {
        labels,
        datasets: [
            {
                label: 'population',
                data: chartData,
                backgroundColor: 'rgba(23, 235, 160, 0.8)',
                borderColor: 'rgba(23, 235, 160, 1)',
                borderWidth: 2,
            }
        ],
    };

    useEffect(() => {
        getChartData();
    }, []);

    return (
        <Bar options={options} data={dataset} />
    )
}
export default BarChart;
