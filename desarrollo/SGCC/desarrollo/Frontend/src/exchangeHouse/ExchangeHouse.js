import React, { Component } from 'react';
import { TypeNavigation } from './TypeNavigation';
import { TransactionList } from './TransactionList';
import { Link } from 'react-router-dom';

export class ExchangeHouse extends Component {

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">CASA DE CAMBIO</div>
                </div>
            </div>
            <h3>LISTA DE TRANSACCIONES</h3>
            <div className="row">
                <div className="col-3 p-2">
                    <TypeNavigation baseUrl="/exhouse/transactions"
                        types={ this.props.types } />
                    <div>
                        <Link className="btn btn-primary m-1" to="/exhouse/new">
                            Nueva transaccion
                        </Link>
                    </div>
                </div>
                <div className="col-9 p-2">
                    <TransactionList transactions={ this.props.transactions } />
                </div>
            </div>
            <div>
            </div>
        </div>
    }
}