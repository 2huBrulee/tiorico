import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTransactions, createTransaction } from '../data/ActionCreators';
import { DataTypes } from '../data/Types';
import { ExchangeHouse } from './ExchangeHouse';
import { NewTransaction} from './NewTransaction';

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadTransactions,
    createTransaction
}

const filterTransactions = (transactions = [], type) =>
    (!type || type === "todos")
        ? transactions
        : transactions.filter(transaction =>
            transaction.transactionType.toLowerCase() === type.toLowerCase()    
        );

export const ExchangeHouseConnector = connect(mapStateToProps,mapDispatchToProps)(
    class extends Component {
        render() {
            return <Switch>
                <Route path="/exhouse/transactions/:type?"
                    render={ (routeProps) =>
                        <ExchangeHouse {...this.props} {...routeProps} types={["COMPRAR", "VENDER"]}
                            transactions={filterTransactions(this.props.transactions, routeProps.match.params.type)}/>
                    }/>
                <Route path="/exhouse/new"
                    render={ routeProps => 
                        <NewTransaction {...this.props} {...routeProps}/>} />
                <Redirect to="/exhouse/transactions" />
            </Switch>
        }

        componentDidMount() {
            this.props.loadTransactions(DataTypes.TRANSACTIONS,{idHouse: 1});            
        }
    }
)