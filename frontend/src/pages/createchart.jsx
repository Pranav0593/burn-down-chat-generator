import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask, reset } from "../features/tasks/taskSlice";
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, LinearScale, PointElement, LineElement);

const CreateChart = () => {
    const [chartData, setChartData] = useState({
        x: 0,
        y: 0,
    });

    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Chart Data',
                data: [],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const taskData = useSelector(state => state.task);
    const { isSuccess, isError, message } = taskData;

    const onChange = (e) => {
        setChartData({
            ...chartData,
            [e.target.name]: parseFloat(e.target.value),
        });
    }

    const onAddPoint = () => {
        const newPoint = { x: chartData.x, y: chartData.y };

        setLineChartData((prevData) => ({
            ...prevData,
            labels: [...prevData.labels, chartData.x],
            datasets: [{
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data, newPoint],
            }],
        }));

        setChartData({ x: 0, y: 0 });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await dispatch(
                createTask({
                    ...taskData,
                    chartData: lineChartData.datasets[0].data,
                })
            );
    
            toast.success("Chart data updated successfully");
            dispatch(reset());
            navigate("/tasks");
        } catch (error) {
            console.error("Error updating chart data:", error);
            toast.error("Error updating chart data");
        }
    };
    

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'linear',
                position: 'left',
            },
        },
    };

    return (
        <div className='flex justify-center min-h-screen bg-gray-200'>
            <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl h-3/4 mt-20'>
                <div className='max-w-md mx-auto space-y-6'>
                    <form onSubmit={onSubmit}>
                        <h2 className="text-2xl font-bold ">Create Line Chart</h2>
                        <p className="my-4 opacity-70">Enter data for the line chart.</p>
                        <hr className="my-4" />

                        <label className="uppercase text-sm font-bold opacity-70">X Value</label>
                        <input
                            type="number"
                            className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                            value={chartData.x}
                            onChange={onChange}
                            name="x"
                            required
                        />

                        <label className="uppercase text-sm font-bold opacity-70">Y Value</label>
                        <input
                            type="number"
                            className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                            value={chartData.y}
                            onChange={onChange}
                            name="y"
                            required
                        />

                        <div className="my-4">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>

                        <button
                            type="button"
                            className="mt-3 mx-auto block px-4 py-2 rounded-md bg-teal-500 text-white font-bold"
                            onClick={onAddPoint}
                        >
                            Add Data Point
                        </button>

                        <button
                            type="submit"
                            className="mt-3 mx-auto block px-4 py-2 rounded-md bg-teal-500 text-white font-bold"
                            onClick={onSubmit}
                        >
                            Save Chart Data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateChart;
