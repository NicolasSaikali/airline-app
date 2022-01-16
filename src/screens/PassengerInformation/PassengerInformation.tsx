import React from 'react'
import { useSelector } from 'react-redux'
import { Button, DatePcker, FlightRow, TextInput } from '../../components'
import { StorageService } from '../../services'
import { RootState } from '../../services/types'
import "./styles.css"

export const PassengerInformation = (props: any) => {
    const prefs = StorageService.getSearchPreferences()
    const selectedFlight = StorageService.getSelectedFlight()
    const toLocation = prefs?.toLocation

    const reservePressed = ()=>{
        StorageService.flush('selected-flight')
        StorageService.flush('search-preferences')
        window.location.href = '/'
    }

    return <>
        <div className="container pt-5">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="font-primary color-primary text-bold">
                                Passenger Information
                            </h4>
                            <p className='color-grey'>
                                Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 pt-3 pt-lg-0">
                            <TextInput placeholder='First name*' />
                        </div>
                        <div className="col-lg-4 pt-3 pt-lg-0">
                            <TextInput placeholder='Middle name*' />

                        </div>
                        <div className="col-lg-4 pt-3 pt-lg-0">
                            <TextInput placeholder='Last name*' />
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-lg-start pt-3">
                        <div className="col-lg-4">
                            <TextInput placeholder='Suffix' />
                        </div>
                        <div className="col-lg-5 pt-3 pt-lg-0">
                            <DatePcker placeholder='Date of Birth' className='text-input' />
                        </div>
                    </div>
                    <div className="row justify-content-center pt-5 justify-content-lg-start">
                        <div className="col-lg-4">
                            <TextInput placeholder='Phone no.' />
                        </div>
                        <div className="col-lg-4 pt-3 pt-lg-0">
                            <TextInput placeholder='Redress no.' />
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-lg-start pt-5 mt-3">
                        <div className="col-lg-3">
                            <Button onPress={reservePressed} content="Reserve" style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 pt-5 pt-lg-0">
                    <div className="row">
                        <h4 className="color-grey font-primary text-grey">
                            Trip to <span className='color-primary text-bold'>{toLocation}</span>
                        </h4>
                        <div className="flight-details">
                            <FlightRow
                                hideAirlineLogo
                                key={`flight_${1}`}
                                id={selectedFlight.id}
                                price={selectedFlight.price}
                                arrivalDate={selectedFlight.arrivalDate}
                                arrivalTime={selectedFlight.arrivalTime.toString().substring(0, 5)}
                                departureDate={selectedFlight.departureDate}
                                departureTime={selectedFlight.departureTime.toString().substring(0, 5)}
                                airline={selectedFlight.airline}
                                className={selectedFlight === selectedFlight.id && 'selected'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}