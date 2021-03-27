import axios from "axios";
import { getHeaders } from "../../common/headers";
import {  deleteTask, deleteTaskError } from "./actionCreators";

export const deleteTaskData = (token,taskId) => {
    var response;
    return async(dispatch) => {
        try {
            let url = "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303/"+taskId;
            response = await axios.delete(url, getHeaders(token));
            if(response.data.code === 204) 
                await dispatch(deleteTask(response.data.message))
            else 
                await dispatch(deleteTaskError(response.data.message))
        }
        catch(e) {
            await dispatch(deleteTaskError(response.data.message))
        }
    }
}