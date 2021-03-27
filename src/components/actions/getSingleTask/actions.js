import axios from "axios";
import { getHeaders } from "../../common/headers";
import { getSingleTask, getSingleTaskError } from "./actionCreators";

export const getSingleTaskData = (token,taskId) => {
    return async(dispatch, getState) => {
        var response;
        try {
            let url = "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303/"+taskId;
            response = await axios.get(url, getHeaders(token));
            if(response.data.code === 200){ 
                await dispatch(getSingleTask(response.data.results))
            }
            else 
                await dispatch(getSingleTaskError(response.data.message));
        }
        catch(e) {
            await dispatch(getSingleTaskError(response.data.message));
        }
    }
}