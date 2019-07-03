import { createStore, applyMiddleware } from 'redux';
import { TransactionReducer } from './TransactionReducer';
import { asyncActions } from './AsyncMiddleware';

export const ExchangeHouseDataStore 
    = createStore(TransactionReducer,
        applyMiddleware(asyncActions));