import axios from "axios";
import { getReqBody } from "../../common/getReqBody";
import { getHeaders } from "../../common/headers";
import {addTask, addTaskError} from "./actionCreators";

export const addTaskData = (props) => {
    var response;
    return async(dispatch) => {
        try {
            let url = "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303";
            response = await axios.post(url,getReqBody(props), getHeaders(props.token));
            if(response.data.code === 201) {
                await dispatch(addTask(response.data.results.id))
            }
            else 
                await dispatch(addTaskError(response.data.message))
        }
        catch(e) {
            await dispatch(addTaskError(response.data.message))
        }
    }
}