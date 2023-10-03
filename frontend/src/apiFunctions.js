import axios from 'axios';

export const getAllTasks = async () => {

    const url = 'http://localhost:8080/tasks/'

    let error_catch = null

    const client = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const response = await client.get('/').catch(function (error) {
        console.error("apiGetTasks: " + error)
        error_catch = error
    });

    if (error_catch === null) {
        return [response.data, null]
    }
    else {
        return [null, error_catch]
    }
}


//
export const getTasksById = async (task_id) => {

    const url = 'http://localhost:8080/tasks/'

    let error_catch = null

    const client = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const response = await client.get(`/${task_id}`).catch(function (error) {
        console.error("apiGetTasks: " + error)
        error_catch = error
    });

    if (error_catch === null) {
        return [response.data, null]
    }
    else {
        return [null, error_catch]
    }
}



//
export const createTask = async (task) => {

    const url = 'http://localhost:8080/tasks/'

    let error_catch = null

    const client = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const response = await client.post(`/`, task).catch(function (error) {
        console.error("apiPostTasks: " + error)
        error_catch = error
    });

    if (error_catch === null) {
        return [response.data, null]
    }
    else {
        return [null, error_catch]
    }
}


//
export const updateTaskById = async (task_id, task) => {

    const url = 'http://localhost:8080/tasks/'

    let error_catch = null

    const client = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const response = await client.put(`/${task_id}`, task_id, task).catch(function (error) {
        console.error("apiPutTasks: " + error)
        error_catch = error
    });

    if (error_catch === null) {
        return [response.data, null]
    }
    else {
        return [null, error_catch]
    }
}


//
export const deleteTaskById = async (task_id) => {

    const url = 'http://localhost:8080/tasks/'

    let error_catch = null

    const client = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const response = await client.delete(`/${task_id}`).catch(function (error) {
        console.error("apiDeleteTasks: " + error)
        error_catch = error
    });

    if (error_catch === null) {
        return [response.data, null]
    }
    else {
        return [null, error_catch]
    }
}

//module.exports = { getAllTasks, getTasksById, createTask, updateTaskById, deleteTaskById};