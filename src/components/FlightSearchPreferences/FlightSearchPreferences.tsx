import React, { FC, useEffect, useState } from 'react'
import { SingleValue } from 'react-select'
import { Button, DatePcker, InputList, ModalComponent } from '..'
export interface FlightSearchPreferencesProps {
    fromLocations: Array<{ value: string, label: string }>,
    toLocations: Array<{ value: string, label: string }>,
    onFromLocationChange: (newValue: SingleValue<{ value: string; label: string; }>) => void,
    onToLocationChange: (newValue: SingleValue<{ value: string; label: string; }>) => void,
    onDepartureDateChange: (loc: string | null) => void;
    onArrivalDateChange: (loc: string | null) => void;
    onAdultCountChange: (count: number) => void;
    onChildrenCountChange: (count: number) => void;
    onSearchClick?: () => void;
}

export const FlightSearchPreferences: FC<FlightSearchPreferencesProps> = (props) => {
    const [paxSelectEngaged, setPaxSelectEngages] = useState(false)
    const [departureDate, setDepartureDate] = useState<any>('')
    const [arrivalDate, setArrivalDate] = useState<any>('')
    
    useEffect(() => {
        if (arrivalDate !== '' && departureDate !== '') {
            console.log('engaging')
            const arrDate = new Date(arrivalDate)
            const depDate = new Date(departureDate)
            if (arrDate < depDate) {
                setArrivalDate('')
                console.log('true')
            }

        }

    }, [arrivalDate, departureDate])

    return <>
        <div className="row justify-content-center">
            <div className="col-md-3 px-2 mb-3 mb-md-0">
                <InputList
                    onChange={props.onFromLocationChange ? props.onFromLocationChange : undefined}
                    placeholder='From where?' id='fromLocation' data={props.fromLocations} />
            </div>
            <div className="col-md-3 px-2 mb-3 mb-md-0">
                <InputList
                    onChange={props.onToLocationChange ? props.onToLocationChange : undefined}
                    placeholder='Where to?' id='toLocation' data={props.toLocations} />
            </div>
            <div className="col-md-3 px-2 mb-3 mb-md-0">
                <DatePcker
                    value={departureDate}
                    placeholder='Departure date'
                    className='css-1s2u09g-control'
                    minDate={new Date().toLocaleDateString().replace(/\//,'-').replace(/\//,'-')    }
                    onDateChange={(date) => {
                        if (props.onDepartureDateChange) props.onDepartureDateChange(date)
                        setDepartureDate(date)
                    }}
                />
            </div>
            <div className="col-md-3 px-2 px-md-0 mb-3 mb-md-0">
                <DatePcker
                    value={arrivalDate}
                    placeholder='Arrival date'
                    className='css-1s2u09g-control'
                    minDate={departureDate ? departureDate : new Date().toString()}
                    onDateChange={(date) => {
                        if (props.onArrivalDateChange) props.onArrivalDateChange(date)
                        setArrivalDate(date)
                    }}
                />
            </div>
        </div>
    </>
}