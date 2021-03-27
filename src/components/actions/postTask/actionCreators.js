import { ADD_TASK, ADD_TASK_ERROR } from "./types";

export const addTask = (data) => ({
    type: ADD_TASK,
    payload: data
})

export const addTaskError = (error) => ({
    type: ADD_TASK_ERROR,
    payload: error
})