import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, taskData, config);

    return response.data;
}

const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

const deleteTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config);

    return response.data;
}

const getTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + id, config);

    return response.data;
}

const deleteTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL, config);

    return response.data;
}

const taskService = {
    createTask,
    getTasks,
    deleteTask,
    getTask,
    deleteTasks
}

export default taskService;
