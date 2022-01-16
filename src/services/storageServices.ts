import { AuthenticationInterface, FlightInterface, FlightSearchPreferencesInterface } from "./types"

export class StorageService{
    public static getSearchPreferences(){
        const result = localStorage.getItem('search-preferences')
        if(!result) return false
        return JSON.parse(result)
    }
    public static setSearchPreferences(prefs:FlightSearchPreferencesInterface){
        localStorage.setItem('search-preferences', JSON.stringify(prefs))
    }
    public static getAuthenticationCredentials(){
        const result = localStorage.getItem('authentication-credentials')
        if(!result) return false
        return JSON.parse(result)
    }
    public static setAuthenticationCredentials(credentials : AuthenticationInterface){
        localStorage.setItem('authentication-credentials',JSON.stringify(credentials))
    }
    public static setSelectedFlight(flight: FlightInterface){
        localStorage.setItem('selected-flight',JSON.stringify(flight))
    }
    public static getSelectedFlight(){
        const result = localStorage.getItem('selected-flight')
        if(!result) return false
        return JSON.parse(result)
    }
    public static flush(key:string){
        localStorage.removeItem(key)
    }
}