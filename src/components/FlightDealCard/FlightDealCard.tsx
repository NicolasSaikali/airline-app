import React, { FC } from 'react'
import "./styles.css"
export interface FlightDealCardProps {
    image: string,
    title?: string,
    description?: string,
    tag?: string | number,
    className?:string,
    onClick?:()=>void,
}

export const FlightDealCard: FC<FlightDealCardProps> = (props) => <>{
    (props.image || (props.title || props.description)) && <>
        <div onClick={props.onClick ? props.onClick : undefined} className={`flight-deal-card ${props.className}`}>
            <div className="flight-deal-card-image">
                <img src={props.image} alt='Broken' className='w-100'/>
            </div>
            <div className="flight-deal-card-footer">
                {(props.title && props.tag) ? <div className="flight-deal-card-upper-footer">
                    <div className="flight-deal-card-title">
                        {props.title}
                    </div>
                    <div className="flight-deal-card-tag">
                        {props.tag}
                    </div>
                </div> : null}
                {props.description ? <div className="flight-deal-card-bottom-footer">
                    <div className="flight-deal-card-description">
                        {props.description}
                    </div>
                    {(!props.title && props.tag) ? <div className="flight-deal-card-tag">
                        {props.tag}
                    </div> : null}
                </div> : null}
            </div>
        </div>
    </>
}</>