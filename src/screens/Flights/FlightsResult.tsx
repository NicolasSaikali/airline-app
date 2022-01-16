import React, { useEffect, useState } from 'react'
import { Button, FlightRow, Loader } from '../../components'
import { HttpService, StorageService } from '../../services'
import { FlightInterface } from '../../services/types'
import "./styles.css"

export const FlightsResult = (props: any) => {
    const searchPreferences = StorageService.getSearchPreferences()
    const authenticationCredentials = StorageService

    const [flights, setFlights] = useState<FlightInterface[]>([])
    const [flightsLoading, setFlightsLoading] = useState(true)
    const [selectedFlight, setSelectedFlight] = useState<number>(-1)

    const continuePressed = ()=>{
        let selected = flights.find(flight => flight.id === selectedFlight)
        let credentials = StorageService.getAuthenticationCredentials()
        if(selected) StorageService.setSelectedFlight(selected)
        if(!credentials) window.location.href = '/auth?redirect=pax-info'
        else window.location.href = '/pax-info'
    }

    const loadFlights = async () => {
        console.log('EXEC')
        setFlights([])
        setFlightsLoading(true)
        const response = await HttpService({
            url: "/flights/search",
            method: "get",
            params: searchPreferences
        })
        response.data._embedded.flightList?.forEach(async (flight: FlightInterface) => {
            const response = await HttpService({
                url: `/airline/${flight.airline}`,
                method: "get",
            })
            let cur = flights
            cur.push({ ...flight, airline: response.data })
            setFlights(prev => (
                [...prev, { ...flight, airline: response.data }]
            ))
        })
        setFlightsLoading(false)
    }
    useEffect(() => {
        loadFlights()
    }, [])

    useEffect(() => {
        console.log('flights log', flights)
    }, [flights])

    const renderFlights = () => {
        return flights.map((item, index) => <FlightRow
            onPress={()=>{setSelectedFlight(item.id)}}
            key={`flight_${index}`}
            id={item.id}
            price={item.price}
            arrivalDate={item.arrivalDate}
            arrivalTime={item.arrivalTime.toString().substring(0, 5)}
            departureDate={item.departureDate}
            departureTime={item.departureTime.toString().substring(0, 5)}
            airline={item.airline}
            className={selectedFlight === item.id && 'selected'}
        />
        )
    }

    return <>
        <div className="container">
            <div className="row justify-content-center pt-5 mb-5">
                {flightsLoading ? (
                    <div className="col-md-12 text-center">
                        <Loader />
                    </div>
                ) : <>
                <h4 className="font-primary mx-0 px-2 px-md-0">Select a flight</h4>
                <div className="row justify-content-center px-0">
                    <div className="col-6 bckg-primary-o-half d-flex justify-content-center align-items-center">
                        <h4 className="text-bold py-3 text-light text-center flights-headers mb-0">
                            Airline
                        </h4>
                    </div>
                    <div className="col-3 bckg-primary d-flex justify-content-center align-items-center">
                        <h4 className="text-bold py-3 text-light text-center flights-headers mb-0">
                            Dep. time - Arr. time
                        </h4>
                    </div>
                    <div className="col-3 bckg-dark-grey d-flex justify-content-center align-items-center">
                        <h4 className="text-bold py-3 text-light text-center flights-headers mb-0">
                            Price
                        </h4>
                    </div>
                </div>
                {renderFlights()}
                <div className="col-12 pt-3 text-right d-flex justify-content-end px-2 px-md-0">
                    <Button onPress={continuePressed} content='Continue' disabled={selectedFlight === -1}/>
                </div>
                </>}
            </div>
        </div>
    </>
}