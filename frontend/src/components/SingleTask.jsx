import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { AiOutlineCheck } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const SingleTask = ({ task }) => {
    const dispatch = useDispatch();

    const deleteTemp = (id) => {
        dispatch(deleteTask(id));
        setTimeout(() => {
            window.location.reload();
        }, 30)
    }

    return (
        <div className="rounded-lg shadow-xl px-12 py-8 flex flex-col mx-20 relative w-2/3 justify-self-center bg-gray-100">
            <div className='flex flex-row items-center'>
                <h1 className="text-gray-600 text-2xl font-semibold">{task.title}</h1>
                <AiOutlineCheck className='text-3xl ml-2 font-bold text-teal-500' />
            </div>
            <p className="text-lg my-4">{task.description}</p>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <span className='mr-2 font-bold'>Priority:</span>
                    <Rating value={task.priority} color={'#14B8A6'} />
                </div>
                <Link to={`/tasks/${task._id}`} className='bg-teal-500 text-white rounded-md px-4 py-2 font-bold hover:opacity-80 transition duration-200'>View More</Link>
            </div>
            <div className='absolute top-4 right-3'>
                <CgClose onClick={() => deleteTemp(task._id)} className='text-3xl text-red-600 font-bold cursor-pointer hover:opacity-70' />
            </div>
        </div>
    )
}

export default SingleTask;
