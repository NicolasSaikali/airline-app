import React, { FC } from 'react'
import { Airlines } from '../../services/types';
import "./styles.css"
export interface FlightRowInterface{
    airline:Airlines,
    departureDate:Date | string,
    departureTime:Date | string,
    arrivalDate:Date|string,
    arrivalTime:Date|string,
    price:number
}

export const FlightRow:FC<FlightRowInterface> = (props) => {
    console.log(props.airline)
    return <>
        <div className="d-flex align-items-center justify-content-between px-2 flight-row">
            <div className="col-3 image-wrapper text-left">
            <img src={props.airline.logo} alt="" className="airline-logo" height={50} />
            </div>
            <div className="col-3 airline-name">
                {props.airline.name}
            </div>
            <div className="col-3 flight-timestamp">
                {props.departureTime} - {props.arrivalTime}
            </div>
            <div className="col-3 flight-price text-right">
                {props.price}$
            </div>
        </div>
    </>
}