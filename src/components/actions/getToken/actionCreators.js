import { GET_USER_TOKEN, USER_TOKEN_ERROR } from "./types";

export const getUserToken = (data) => ({
    type: GET_USER_TOKEN,
    payload: data
})

export const userTokenError = (error) => ({
    type: USER_TOKEN_ERROR,
    payload: error
})