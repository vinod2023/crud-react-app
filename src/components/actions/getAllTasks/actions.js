import axios from "axios";
import { allTasksError, getAllTasks } from "./actionCreators";

export const getAllTasksData = (headers) => {
    return async(dispatch) => {
        var response;
        try {
            let url = "https://stage.api.sloovi.com/task/lead_04412ba1d622466cab1f0ad941fcf303";
            response = await axios.get(url, headers);
            if(response.data.code === 200)
                await dispatch(getAllTasks(response.data.results))
            else 
                await dispatch(allTasksError(response.data.message))
        }
        catch(e) {
            await dispatch(allTasksError(response.data.message))
        }
    }
}