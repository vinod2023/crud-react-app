import { ALL_TASKS_ERROR, GET_ALL_TASKS } from "./types"

export const getAllTasks = (data) => ({
    type: GET_ALL_TASKS,
    payload: data
})

export const allTasksError = (error) => ({
    type: ALL_TASKS_ERROR,
    payload: error
})