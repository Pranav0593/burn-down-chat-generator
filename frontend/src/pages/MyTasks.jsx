import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTasks, reset } from "../features/tasks/taskSlice";
import Spinner from '../components/Spinner';
import SingleTask from "../components/SingleTask";
import { BiSad } from 'react-icons/bi';
import { deleteTasks } from "../features/tasks/taskSlice";

const MyTasks = () => {
    const { tasks, isLoading, isSuccess } = useSelector(state => state.task);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(getTasks());
        }
    }, [user, navigate, dispatch])

    const deleteAllTasks = () => {
        dispatch(deleteTasks());
        setTimeout(() => {
            navigate(0);
        }, 30)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <h1 className="text-center pt-16 font-semibold text-4xl text-gray-700">My Projects</h1>
            <div className="bg-blue-500 text-blue-500 w-24 h-1 block mx-auto mt-3 rounded-md"></div>
            <div className="gap-6 grid pb-12 justify-center items-center grid-cols-1 container mx-auto mt-12">
                {tasks.map(task => (
                    <SingleTask task={task} key={task._id} />
                ))}
                {tasks.length === 0 &&
                    (
                        <>
                            <div className="flex items-center justify-center">
                                <p className="text-3xl text-center font-bold rounded-lg mr-2">There is no Project...</p>
                                <BiSad className="text-6xl text-blue-500" />
                            </div>
                            <div className="text-center">
                                <Link to='/tasks' className="text-xl bg-blue-500 p-3 text-white font-bold rounded hover:opacity-75">Add your first task</Link>
                            </div>
                        </>
                    )}
                {tasks.length > 0 &&
                    (
                        <button className="bg-red-600 block mx-auto rounded text-white font-bold p-2 text-lg mt-2 hover:opacity-75 transition duration-150"
                            onClick={() => deleteAllTasks()}>
                            Delete All Tasks
                        </button>
                    )}
            </div>
        </div>
    )
}

export default MyTasks;
