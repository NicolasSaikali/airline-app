import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { RootNavigation } from './navigation';
import { NavigationBar } from './fragments';
import { FlightSearchPreferencesReducer } from './redux/reducers';

const rootStore = combineReducers({
  flightSearchPreferences : FlightSearchPreferencesReducer
})
const store = createStore(rootStore)

function App() {
  return (
    <Provider store={store}>
      <NavigationBar/>
      <RootNavigation/>
    </Provider>
  );
}

export default App;
