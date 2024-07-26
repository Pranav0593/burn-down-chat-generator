import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
    tasks: [],
    task: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const createTask = createAsyncThunk('task/create', async (taskData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        
        // Check if the task already has an ID (indicating it's an existing task)
        if (taskData._id) {
            // Update an existing task
            return await taskService.updateTask(taskData._id, taskData, token);
        } else {
            // Create a new task
            return await taskService.createTask(taskData, token);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getTasks = createAsyncThunk('task/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.getTasks(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTask = createAsyncThunk('task/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.deleteTask(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getTask = createAsyncThunk('task/getOne', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.getTask(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTasks = createAsyncThunk('task/deleteAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.deleteTasks(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.task = action.payload
            })
            .addCase(getTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
