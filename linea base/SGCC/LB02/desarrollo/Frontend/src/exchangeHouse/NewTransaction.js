import React, { Component } from 'react';
import { TransactionForm } from './TransactionForm';

export class NewTransaction extends Component {

    constructor(...props) {
        super(...props);
        this.defaultAttrs = { type: "text", required: true};
        this.formModel = [
            {label: "idUser"},
            {label: "idCoinIn"},
            {label: "idCoinOut"},
            {label: "clientName"},
            {label: "clientAddress"},
            {label: "clientDocumentType"},
            {label: "clientDocumentNumber"},
            {label: "transactionType"},
            {label: "quantity"}
        ]
    }

    handleSubmit = (formData) => {
        this.props.createTransaction(formData);
        this.props.history.push("/exhouse/transactions");
    }

    handleCancel = () => {
        this.props.history.push("/exhouse/transactions");
    }

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">NUEVA TRANSACCION</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    <TransactionForm formModel={this.formModel}
                        defaultAttrs={this.defaultAttrs}
                        submitCallback={this.handleSubmit}
                        cancelCallback={this.cancelCallback} />
                </div>
            </div>
        </div>
    }
}