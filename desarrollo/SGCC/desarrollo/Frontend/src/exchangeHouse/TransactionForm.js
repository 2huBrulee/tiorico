import React, { Component } from 'react';
import moduleName from 'module'

export class TransactionForm extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            
        };
        this.formElements = {};
    }

    handleSubmit = () => {
        this.setState(state => {
            const newState = {...state}
            Object.values(this.formElements).forEach(elem => {

            })
            return newState;
        }, () => {
            if (true) {
                const data = Object.assign(...Object.entries(this.formElements)
                    .map(element => ({[element[0]]: element[1].value})));
                    console.log(data);
                this.props.submitCallback(data);
            }
        })
    }

    registerRef = element => {
        if (element !== null) {
            this.formElements[element.name] = element;
        }
    }

    renderElement = modelItem => {
        const name = modelItem.name || modelItem.label;
        return <div className="form-group" key={ modelItem.label }>
            <label>{modelItem.label}</label>
            <input className="form-control" name={ name } ref={this.registerRef}
                { ...this.props.defaultAttrs } { ...modelItem.attrs }/>
        </div>
    }

    render() {
        return <React.Fragment>
            {this.props.formModel.map(item => this.renderElement(item))}
            <div className="text-center">
                <button className="btn btn-secondary m-1"
                    onClick={this.props.cancelCallback}>
                    {this.props.cancelText || "Cancelar"}    
                </button>
                <button className="btn btn-primary m-1"
                    onClick={this.handleSubmit}>
                    {this.props.submitText || "Registrar"}    
                </button>
            </div>
        </React.Fragment>
    }
}