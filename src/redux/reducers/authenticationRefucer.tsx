import { AuthenticationInterface } from "../../services/types";
import { actions } from "../actions";

const initialState : AuthenticationInterface = {
    id:null,
    email: '',
    apiKey:'',
}

export const AuthenticationReducer = (state :any = initialState, action: any) => {
    switch(action.type){
        case actions.UPDATE_CREDENTIALS: 
            return action.credentials
        default : return state
    }
}