import { DELETE_TASK, DELETE_TASK_ERROR } from "./types"

export const deleteTask = (data) => ({
    type: DELETE_TASK,
    payload: data
})

export const deleteTaskError = (error) => ({
    type: DELETE_TASK_ERROR,
    payload: error
})