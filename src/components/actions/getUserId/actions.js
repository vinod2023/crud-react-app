import axios from "axios";
import { getAllTasksData } from "../getAllTasks/actions";
import { getUserId, userIdError } from "./actionCreators";

export const getUserIdData = (token) => {
    return async(dispatch) => {
        var response;
        try {
            let url = "https://stage.api.sloovi.com/user";
            let headers = {
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer "+token       
                  }
            }
            response = await axios.get(url, headers);
            if(response.data.code === 200){ 
                await dispatch(getUserId(response.data.results.id));
                await dispatch(getAllTasksData(headers));
            }
            else 
                await dispatch(userIdError(response.data.message));
        }
        catch(e) {
            await dispatch(userIdError(response.data.message));
        }
    }
}