import { ActionTypes, DataTypes } from './Types';

export const TransactionReducer = ( storeData, action) => {
    switch(action.type) {
        case ActionTypes.TRANSACTION_LOAD:
            return {
                ...storeData,
                [action.payload.dataType]: action.payload.data
            }
        case ActionTypes.TRANSACTION_STORE:
            if (action.payload.dataType === DataTypes.TRANSACTIONS) {
                return { ...storeData, newTransaction: action.payload.data}
            }
            break;
        default:
            return storeData || {};
    }
}
