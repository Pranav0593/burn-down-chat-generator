import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <nav className="bg-blue-500 p-6">
            <div className="container mx-auto flex items-center justify-between flex-wrap ">
                <Link to='/tasks'>
                    <h2 className="text-white font-bold text-xl mx-4">Burn Down Chart Generator</h2>
                </Link>
                <div className='flex space-x-8'>
                    {user ? (
                        <div className='mx-4 flex'>
                            <button className='text-white text-lg font-bold mr-3'>Welcome, {user.name} |</button>
                            <Link to='/my-tasks' className='text-white font-semibold text-lg flex items-center mx-6 hover:opacity-80'>
                                <FaTasks className='mr-2' /> My Projects
                            </Link>
                            <Link to='/tasks' className='text-white font-semibold text-lg flex items-center mr-6 hover:opacity-80'>
                                <IoIosCreate className='mr-2' /> Create Project
                            </Link>
                            <button onClick={onLogout} className='text-white font-semibold text-lg flex items-center hover:opacity-80'>
                                <FaSignOutAlt className='mr-2' /> Logout
                            </button>
                        </div>
                    )
                        : (
                            <div className='flex space-x-8 mx-4'>
                                <Link to='/login' className='text-white font-semibold text-lg flex items-center'>
                                    <FaSignInAlt className='mr-2' /> Login
                                </Link>
                                <Link to='/' className='text-white font-semibold text-lg flex items-center'>
                                    <FaUser className='mr-2' /> Register
                                </Link>
                            </div>
                        )}
                </div>
            </div >
        </nav >
    )
}

export default Header;
