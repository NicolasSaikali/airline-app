import { FlightSearchPreferencesInterface } from "../../services/types";
import { actions } from "../actions";

let initialState : FlightSearchPreferencesInterface = {
    fromLocation : '',
    toLocation: '',
    departureDate: '',
    arrivalDate: '',
}

export const FlightSearchPreferencesReducer = (state : any = initialState, action: any) => {
    switch(action.type){
        case actions.UPDATE_FLIGHT_SEARCH_PREFERENCES : 
        return {...state, [action.key] : action.value}
        default : return state;
    }
}