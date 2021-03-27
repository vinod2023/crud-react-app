import { SINGLE_TASK, SINGLE_TASK_ERROR } from "./types"

export const getSingleTask = (data) => ({
    type: SINGLE_TASK,
    payload: data
})

export const getSingleTaskError = (error) => ({
    type: SINGLE_TASK_ERROR,
    payload: error
})