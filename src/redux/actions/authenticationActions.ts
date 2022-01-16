import { AuthenticationInterface } from "../../services/types";
import { actions } from "../actions";

export const updateCredentials = (credentials : AuthenticationInterface)=>{
    return {
        type : actions.UPDATE_CREDENTIALS,
        credentials
    }
}