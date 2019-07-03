import React, { Component } from 'react';
import logo from './logo.svg';
import { ExchangeHouseDataStore } from './data/DataStore';
import { Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ExchangeHouseConnector } from './exchangeHouse/ExchangeHouseConnector'
import './App.css';

function App() {
  return (
    <Provider store={ExchangeHouseDataStore}>
      <Router>
        <Switch>
          <Route path="/exhouse" component={ExchangeHouseConnector} />
          <Redirect to="/exhouse" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
