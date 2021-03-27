import axios from "axios";
import { getReqBody } from "../../common/getReqBody";
import { getHeaders } from "../../common/headers";
import { updateTask, updateTaskError } from "./actionCreators";

export const updateTaskData = (props) => {
    var response;
    return async(dispatch) => {
        try {
            let url = "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303/"+props.taskId;
            response = await axios.put(url,getReqBody(props), getHeaders(props.token));
            if(response.data.code === 202) {
                await dispatch(updateTask(response.data.results.id))
            }
            else 
            {
                await dispatch(updateTaskError(response.data.message))
            }
        }
        catch(e) {
            await dispatch(updateTaskError(response.data.message))
        }
    }
}