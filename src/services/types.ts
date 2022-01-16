export interface FlightSearchPreferencesInterface {
    fromLocation?:string,
    toLocation?:string,
    departureDate?:Date | string | null,
    arrivalDate?:Date | string | null,
    nbAdults?:number,
    nbChildren?:number,
    class?:string,
}

export interface TripInterface{
    fromLocation:string,
    toLocation:string,
    departureDate:Date,
    arrivalDate:Date,
    images:string[],
    title:string,
    description:string,
    price:number,
}

export interface Airlines{
    id: number,
    name: string,
    logo: string,
    country: string,
}

export interface FlightSegment{
    id: string,
    airline: string,
    timestamp: Date,
    location: string,
}

export interface FlightStopInterface{
    time:string,
    location: string,
}

export interface FlightInterface{
    id:number,
    airline: Airlines,
    departureDate: Date | string,
    arrivalDate: Date | string,
    arrivalTime:Date|string,
    departureTime:Date|string,
    fromLocation : string,
    toLocation: string,
    price: number,
}

export interface PassengerInformation{
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: Date,
    email: string,
    nbBags: number
}

export interface RootState{
    flightSearchPreferences : FlightSearchPreferencesInterface
}

export interface AuthenticationInterface{
    id:number | null,
    email:string,
    apiKey:string,
}