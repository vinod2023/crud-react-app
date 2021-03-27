import { UPDATE_TASK, UPDATE_TASK_ERROR } from "./types"

export const updateTask = (data) => ({
    type: UPDATE_TASK,
    payload: data
})

export const updateTaskError = (error) => ({
    type: UPDATE_TASK_ERROR,
    payload: error
})