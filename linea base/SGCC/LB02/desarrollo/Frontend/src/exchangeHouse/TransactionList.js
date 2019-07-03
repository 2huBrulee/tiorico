import React, { Component } from 'react';

export class TransactionList extends Component {

    render() {
        if (this.props.transactions == null || this.props.transactions.length === 0) {
            return <h5 className="p-2">No hay transacciones</h5>
        }

        return this.props.transactions.map( transaction => 
            <div className="card m-1 p-1 bg-light" key={transaction.idTransaction}>
                <div>
                    {transaction.transactionDate}
                </div>
                <div>
                    {transaction.clientName + ": " + transaction.clientDocumentType + " " + transaction.clientDocumentNumber}
                </div>
                <div>
                    {transaction.mountInt + " A " + transaction.mountOut}
                </div>
                <span></span>
            </div>
        );
    }
}
