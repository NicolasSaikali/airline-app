import { FlightSearchPreferencesInterface } from "./types"

export class StorageService{
    public static getSearchPreferences(){
        const result = localStorage.getItem('search-preferences')
        if(!result) return false
        return JSON.parse(result)
    }
    public static setSearchPreferences(prefs:FlightSearchPreferencesInterface){
        localStorage.setItem('search-preferences', JSON.stringify(prefs))
    }
}