import { ActionTypes, DataTypes } from './Types';
import { RestDataSource } from './RestDataSource';

const dataSource = new RestDataSource();

export const loadTransactions = (dataType, params) => ({
    type: ActionTypes.TRANSACTION_LOAD,
    payload: dataSource.GetData(dataType, params)
        .then(response =>({ dataType, data: response.data.data}))
});

export const createTransaction = (transaction) => ({
    type: ActionTypes.TRANSACTION_STORE,
    payload: dataSource.StoreData(DataTypes.TRANSACTIONS, transaction)
        .then(response => {
            console.log(response)
            return({
            dataType: DataTypes.TRANSACTIONS, data: response.data
        })})
})