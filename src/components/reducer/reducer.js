import { DELETE_TASK, DELETE_TASK_ERROR } from "../actions/deleteTask/types";
import { ALL_TASKS_ERROR, GET_ALL_TASKS } from "../actions/getAllTasks/types";
import { SINGLE_TASK, SINGLE_TASK_ERROR } from "../actions/getSingleTask/types";
import { GET_USER_TOKEN, USER_TOKEN_ERROR } from "../actions/getToken/types";
import { GET_USER_ID, USER_ID_ERROR } from "../actions/getUserId/types";
import { ADD_TASK, ADD_TASK_ERROR, TASK_DATE, TASK_MSG, TASK_TIME } from "../actions/postTask/types";
import { UPDATE_TASK, UPDATE_TASK_ERROR, UPDATE_TASK_ID } from "../actions/updateTask/types";

const initialState = {
    token: "",
    tokenError: "",
    id: "",
    idError: "",
    tasks: [],
    tasksError: "",
    addTask: "",
    addTaskError: "",
    taskDate: "",
    taskTime: 0,
    taskMsg: "",
    taskId: "",
    singleTask: "",
    singleTaskError: "",
    deleteTask: "",
    deleteTaskError: "",
    updateTask: "",
    updateTaskError: ""
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_TOKEN:
            return { ...state, token: action.payload }
        case USER_TOKEN_ERROR:
            return { ...state, tokenError: action.payload }
        case GET_USER_ID:
            return { ...state, id: action.payload }
        case USER_ID_ERROR:
            return { ...state, idError: action.payload }
        case GET_ALL_TASKS:
            return { ...state, tasks: action.payload }
        case ALL_TASKS_ERROR:
            return { ...state, tasksError: action.payload }
        case ADD_TASK:
            return { ...state, addTask: action.payload }
        case ADD_TASK_ERROR:
            return { ...state, addTaskError: action.payload }
        case TASK_DATE:
            return { ...state, taskDate: action.payload }
        case TASK_TIME:
            return { ...state, taskTime: action.payload }
        case TASK_MSG:
            return { ...state, taskMsg: action.payload }
        case SINGLE_TASK:
            return { ...state, singleTask: action.payload }
        case SINGLE_TASK_ERROR:
            return { ...state, singleTaskError: action.payload }
        case DELETE_TASK:
            return { ...state, deleteTask: action.payload }
        case DELETE_TASK_ERROR:
            return { ...state, deleteTaskError: action.payload }
        case UPDATE_TASK:
            return { ...state, updateTask: action.payload }
        case UPDATE_TASK_ERROR:
            return { ...state, updateTaskError: action.payload }
        case UPDATE_TASK_ID:
                return { ...state, taskId: action.payload }
        default:
            return state;
    }
}

export default reducer;