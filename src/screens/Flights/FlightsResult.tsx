import React, { useEffect, useState } from 'react'
import { FlightRow, Loader } from '../../components'
import { HttpService, StorageService } from '../../services'
import { FlightInterface } from '../../services/types'

export const FlightsResult = (props: any) => {
    const searchPreferences = StorageService.getSearchPreferences()

    const [flights, setFlights] = useState<FlightInterface[]>([])
    const [flightsLoading, setFlightsLoading] = useState(true)
    const [selectedFlight, setSelectedFlight] = useState(null)


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
            key={`flight_${index}`}
            price={item.price}
            arrivalDate={item.arrivalDate}
            arrivalTime={item.arrivalTime.toString().substring(0, 5)}
            departureDate={item.departureDate}
            departureTime={item.departureTime.toString().substring(0, 5)}
            airline={item.airline}
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
                ) : renderFlights()}
            </div>
        </div>
    </>
}