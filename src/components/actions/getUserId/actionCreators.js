import { GET_USER_ID, USER_ID_ERROR } from "./types"

export const getUserId = (data) => ({
    type: GET_USER_ID,
    payload: data
})

export const userIdError = (error) => ({
    type: USER_ID_ERROR,
    payload: error
})