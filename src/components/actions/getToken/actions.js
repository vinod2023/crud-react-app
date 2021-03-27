import axios from "axios";
import { getUserIdData } from "../getUserId/actions";
import { getUserToken, userTokenError } from "./actionCreators";

export const getTokenData = () => {
    return async(dispatch) => {
        var response;
        try {
            let url = "https://stage.api.sloovi.com/login";
            let data = {
                email : "spicebluetest2@gmail.com",
                password : "12345678"
            }
            let headers = {
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",          
                  }
            }
            response = await axios.post(url,data, headers);
            if(response.data.code === 200) {
                await dispatch(getUserToken(response.data.results.token))
                await dispatch(getUserIdData(response.data.results.token))
            }
            else 
                await dispatch(userTokenError(response.data.message))
        }
        catch(e) {
            await dispatch(userTokenError(response.data.message))
        }
    }
}