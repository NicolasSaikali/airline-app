import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthenticationScreen, FlightsResult, Home, PassengerInformation } from '../screens'

export const RootNavigation = ()=>{
    return <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/flights' element={<FlightsResult/>}/>
            <Route path='/auth' element={<AuthenticationScreen/>}/>
            <Route path='/pax-info' element={<PassengerInformation/>}/>
        </Routes>
    </Router>
}