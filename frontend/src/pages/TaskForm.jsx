// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createTask, reset } from "../features/tasks/taskSlice";
// import { toast } from 'react-toastify';

// const TaskForm = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         priority: 1,
//         team: [],
//     });

//     const { title, description, priority, team } = formData;
//     const { user } = useSelector(state => state.auth);
//     const { isSuccess, isError, message } = useSelector(state => state.task);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }

//         if (isError) {
//             toast.error(message);
//         }

//         dispatch(reset());
//     }, [user, navigate, isError, message, isSuccess, dispatch]);

//     const onChange = (e) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [e.target.name]: e.target.value
//         }));
//     }

//     const onCreateChartClick = () => {
//         navigate('/CreateChart');
//     }

//     const onTeamMemberChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedTeam = [...team];
//         updatedTeam[index][name] = value;

//         setFormData(prevState => ({
//             ...prevState,
//             team: updatedTeam,
//         }));
//     }

//     const addTeamMember = () => {
//         setFormData(prevState => ({
//             ...prevState,
//             team: [...team, { member: '', role: '', responsibilities: '' }],
//         }));
//     }

//     const removeTeamMember = (index) => {
//         const updatedTeam = [...team];
//         updatedTeam.splice(index, 1);

//         setFormData(prevState => ({
//             ...prevState,
//             team: updatedTeam,
//         }));
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
    
//         if (priority < 1 || priority > 5) {
//             toast.error("Priority must be between 1 and 5");
//         } else if (title.length > 300) {
//             toast.error("Maximum number of characters for the title is 300");
//         } else {
//             const taskData = {
//                 title,
//                 description,
//                 priority: parseInt(priority),
//                 team,
//                 chartData: [], // initialize with an empty array
//             };
    
//             dispatch(createTask(taskData));
//             toast.success("New task created");
    
//             setFormData({
//                 title: "",
//                 description: "",
//                 priority: 1,
//                 team: [],
//             });
//         }
//     };
    

//     return (
//         <div className='flex justify-center min-h-screen bg-gray-200'>
//             <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl h-3/4 mt-20'>
//                 <div className='max-w-md mx-auto space-y-6'>
//                     <form onSubmit={onSubmit}>
//                         <h2 className="text-2xl font-bold ">Add new task</h2>
//                         <p className="my-4 opacity-70">Add a new task to help you keep track of your responsibilities and improve your organization.</p>
//                         <hr className="my-4" />
//                         <label className="uppercase text-sm font-bold opacity-70">Title</label>
//                         <input type="text" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
//                             value={title}
//                             onChange={onChange}
//                             name="title"
//                             required
//                         />
//                         <label className="uppercase text-sm font-bold opacity-70">Description</label>
//                         <textarea rows={4} type="text" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
//                             value={description}
//                             onChange={onChange}
//                             name="description"
//                             required
//                         />
//                         <label className="uppercase text-sm font-bold opacity-70">Priority (1-5)</label>
//                         <input type="number" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
//                             value={priority}
//                             onChange={onChange}
//                             name="priority"
//                             required
//                         />

//                         {/* Team Members Section */}
//                         <label className="uppercase text-sm font-bold opacity-70">Team Members</label>
//                         {team.map((member, index) => (
//                             <div key={index} className="flex items-center mb-2">
//                                 <input
//                                     type="text"
//                                     className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
//                                     value={member.member}
//                                     onChange={(e) => onTeamMemberChange(index, e)}
//                                     name="member"
//                                     placeholder="Team Member"
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
//                                     value={member.role}
//                                     onChange={(e) => onTeamMemberChange(index, e)}
//                                     name="role"
//                                     placeholder="Role"
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
//                                     value={member.responsibilities}
//                                     onChange={(e) => onTeamMemberChange(index, e)}
//                                     name="responsibilities"
//                                     placeholder="Responsibilities"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     className="ml-2 p-1 text-red-500 cursor-pointer"
//                                     onClick={() => removeTeamMember(index)}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             type="button"
//                             className="mb-4 px-4 py-2 rounded-md bg-teal-500 text-white font-bold"
//                             onClick={addTeamMember}
//                         >
//                             Add Team Member
//                         </button>

//                         <button
//                             type="button"
//                             className="mt-3 mx-auto block px-4 py-2 rounded-md bg-blue-500 text-white font-bold"
//                             onClick={onCreateChartClick}
//                         >
//                             Create Chart
//                         </button>

//                         <button type="submit" className="mt-3 mx-auto block px-4 py-2 rounded-md bg-teal-500 text-white font-bold">Save</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TaskForm;




import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask, reset } from "../features/tasks/taskSlice";
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, LinearScale, PointElement, LineElement);

const TaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 1,
        team: [],
    });

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

    const { title, description, priority, team } = formData;
    const { user } = useSelector(state => state.auth);
    const { isSuccess, isError, message } = useSelector(state => state.task);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
    }, [user, navigate, isError, message, isSuccess, dispatch]);

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
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
    }

    const onTeamMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTeam = [...team];
        updatedTeam[index][name] = value;

        setFormData(prevState => ({
            ...prevState,
            team: updatedTeam,
        }));
    }

    const addTeamMember = () => {
        setFormData(prevState => ({
            ...prevState,
            team: [...team, { member: '', role: '', responsibilities: '' }],
        }));
    }

    const removeTeamMember = (index) => {
        const updatedTeam = [...team];
        updatedTeam.splice(index, 1);

        setFormData(prevState => ({
            ...prevState,
            team: updatedTeam,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (priority < 1 || priority > 5) {
            toast.error('Priority must be between 1 and 5');
        } else if (title.length > 300) {
            toast.error('Maximum number of characters for the title is 300');
        } else {
            const taskData = {
                title,
                description,
                priority: parseInt(priority),
                team,
                chartData: lineChartData.datasets[0].data,
            }

            dispatch(createTask(taskData));
            toast.success('New task created');

            setFormData({
                title: '',
                description: '',
                priority: 1,
                team: [],
            })
        }
    }
    

    const onChartValueChange = (e) => {
        setChartData(prevState => ({
            ...prevState,
            [e.target.name]: parseFloat(e.target.value),
        }));
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
                        <h2 className="text-2xl font-bold ">Add new Project</h2>
                        <p className="my-4 opacity-70">Add a new project to help you keep track of your responsibilities and improve your organization.</p>
                        <hr className="my-4" />
                        <label className="uppercase text-sm font-bold opacity-70">Title</label>
                        <input type="text" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                            value={title}
                            onChange={onChange}
                            name="title"
                            required
                        />
                        <label className="uppercase text-sm font-bold opacity-70">Description</label>
                        <textarea rows={4} type="text" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                            value={description}
                            onChange={onChange}
                            name="description"
                            required
                        />
                        <label className="uppercase text-sm font-bold opacity-70">Priority (1-5)</label>
                        <input type="number" className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                            value={priority}
                            onChange={onChange}
                            name="priority"
                            required
                        />

                        {/* Team Members Section */}
                        <label className="uppercase text-sm font-bold opacity-70">Team Members</label>
                        {team.map((member, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                                    value={member.member}
                                    onChange={(e) => onTeamMemberChange(index, e)}
                                    name="member"
                                    placeholder="Team Member"
                                    required
                                />
                                <input
                                    type="text"
                                    className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                                    value={member.role}
                                    onChange={(e) => onTeamMemberChange(index, e)}
                                    name="role"
                                    placeholder="Role"
                                    required
                                />
                                <input
                                    type="text"
                                    className="p-1 mr-2 w-1/3 bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                                    value={member.responsibilities}
                                    onChange={(e) => onTeamMemberChange(index, e)}
                                    name="responsibilities"
                                    placeholder="Responsibilities"
                                    required
                                />
                                <button
                                    type="button"
                                    className="ml-2 p-1 text-red-500 cursor-pointer"
                                    onClick={() => removeTeamMember(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mb-4 px-4 py-2 rounded-md bg-blue-500 text-white font-bold"
                            onClick={addTeamMember}
                        >
                            Add Team Member
                        </button>

                        <div className="my-4">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>

                        <div className="flex space-x-4">
                            <div>
                                <label className="uppercase text-sm font-bold opacity-70">X Value</label>
                                <input
                                    type="number"
                                    className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                                    value={chartData.x}
                                    onChange={onChartValueChange}
                                    name="x"
                                    required
                                />
                            </div>
                            <div>
                                <label className="uppercase text-sm font-bold opacity-70">Y Value</label>
                                <input
                                    type="number"
                                    className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                                    value={chartData.y}
                                    onChange={onChartValueChange}
                                    name="y"
                                    required
                                />
                            </div>
                        </div>


                        <button
                            type="button"
                            className="mt-3 mx-auto block px-4 py-2 rounded-md bg-blue-500 text-white font-bold"
                            onClick={onAddPoint}
                        >
                            Add Data Point
                        </button>

                        <button type="submit" className="mt-3 mx-auto block px-4 py-2 rounded-md bg-blue-500 text-white font-bold">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;
