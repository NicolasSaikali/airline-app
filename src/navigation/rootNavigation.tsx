import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FlightsResult, Home } from '../screens'

export const RootNavigation = ()=>{
    return <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/flights' element={<FlightsResult/>}/>
        </Routes>
    </Router>
}