import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader, FlightDealCard, FlightDealCardProps, FlightSearchPreferences, Button } from '../../components'
import { updateSearchPreferences } from '../../redux/actions/flightSearchPreferencesActions'
import { StorageService } from '../../services'
import { RootState } from '../../services/types'
import { loadTrips, MapTrips } from './HomeController'
import "./styles.css"
export const Home = (props: any) => {

    const dispatch = useDispatch()
    const searchPreferences = useSelector((state: RootState) => state.flightSearchPreferences)

    const [trips, setTrips] = useState<any>(null)
    const [tripsLoading, setTripsLoading] = useState(false)

    const [searchPrefsValid, setSearchPrefsValid] = useState(false)

    const _updateSearchPreferences = (key: string, value: any) => {
        dispatch(updateSearchPreferences({ key, value }))
    }

    const _loadTrips = async () => {
        setTripsLoading(true)
        const promise = await loadTrips()
        const mappedTrips = MapTrips(promise)
        setTrips(mappedTrips)
        setTripsLoading(false)
    }

    useEffect(() => {
        const valid = searchPreferences.arrivalDate !== '' &&
        searchPreferences.departureDate !== '' &&
        searchPreferences.fromLocation !== '' &&
        searchPreferences.toLocation !== ''

        StorageService.setSearchPreferences(searchPreferences)

        setSearchPrefsValid(valid)
    }, [searchPreferences])


    useEffect(() => { console.log(searchPreferences) })

    useEffect(() => {
        _loadTrips()
    }, [])

    const renderTrips = () => <>{
        <div className="row justify-content-center">
            {tripsLoading ? <Loader /> : (
                trips?.map((elt: FlightDealCardProps, index: number) => (
                    <div className="col-md-4">
                        <FlightDealCard key={`trips_${index}`} {...elt} />
                    </div>
                ))
            )}
        </div>
    }</>

    return <>
        <div className="home-header position-relative">
            <img src={`${process.env.PUBLIC_URL}/assets/world.svg`} alt="" className="world-img w-100" />
            <div className="header-content d-flex justify-content-center align-items-center">
                <div className="container">
                    <h1 className='home-title'>
                        It's more than just a trip.
                    </h1>
                    <div className="search-preferences-input">
                        <FlightSearchPreferences
                            fromLocations={[{ label: 'France', value: 'france' }, { label: 'Lebanon', value: 'Lebanon' }, { label: 'Italy', value: 'Italy' }, { label: 'Turkey', value: 'Turkey' }, { label: 'UAE', value: 'UAE' }, { label: 'France', value: 'France' }]}
                            toLocations={[{ label: 'Germany', value: 'germany' }, { label: 'Lebanon', value: 'Lebanon' }, { label: 'Italy', value: 'Italy' }, { label: 'Turkey', value: 'Turkey' }, { label: 'UAE', value: 'UAE' }, { label: 'France', value: 'France' }]}
                            onAdultCountChange={() => { }}
                            onArrivalDateChange={(date) => _updateSearchPreferences('arrivalDate', date)}
                            onChildrenCountChange={() => { }}
                            onDepartureDateChange={(date) => _updateSearchPreferences('departureDate', date)}
                            onFromLocationChange={(loc) => { _updateSearchPreferences('fromLocation', loc?.value) }}
                            onToLocationChange={(loc) => { _updateSearchPreferences('toLocation', loc?.value) }}
                        />
                        <div className="row justify-content-center">
                            <div className="col-md-3 pt-5 text-center">
                                <Link to="/flights">
                                    <Button disabled={!searchPrefsValid} content='Search flights' style={{ width: '100%' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-100 py-1"></div>
        <div className="container">
            <h3 className='subtitle'>Find your next adventure with these flight deals</h3>
            <div className="w-100 py-1"></div>
            {renderTrips()}
        </div>
    </>
}