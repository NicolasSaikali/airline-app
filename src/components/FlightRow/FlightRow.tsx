import React, { FC } from 'react'
import { Airlines } from '../../services/types';
import "./styles.css"
export interface FlightRowInterface {
    id: number,
    airline: Airlines,
    departureDate: Date | string,
    departureTime: Date | string,
    arrivalDate: Date | string,
    arrivalTime: Date | string,
    price: number,
    onPress?: (id: number) => void,
    className?: string | boolean,
    hideAirlineLogo?: boolean,
}

export const FlightRow: FC<FlightRowInterface> = (props) => {
    console.log(props.airline)
    return <>
        <div
            onClick={() => {
                if (props.onPress)
                    props.onPress(props.id)
            }}
            className={`d-flex align-items-center justify-content-between px-2 flight-row ${props.className}`}>
            {props.hideAirlineLogo ? null : <div className="col-3 image-wrapper text-left">
                <img src={props.airline.logo} alt="" className="airline-logo" height={50} />
            </div>}
            <div className="col-3 airline-name">
                {props.airline.name}
            </div>
            <div className="col-3 flight-timestamp text-center">
                {props.departureTime} - {props.arrivalTime}
            </div>
            <div className="col-3 flight-price d-flex justify-content-end">
                {props.price}$
            </div>
        </div>
    </>
}