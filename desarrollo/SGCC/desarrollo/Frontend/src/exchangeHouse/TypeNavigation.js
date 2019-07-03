import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TypeNavigation extends Component {

    render() {
        return <React.Fragment>
            <Link className="btn btn-secondary btn-block"
                    to={ this.props.baseUrl }>
            Todos
            </Link>
            {
                this.props.types && this.props.types.map( type =>
                    <Link className="btn btn btn-secondary btn-block"
                            key={ type }
                            to={`${this.props.baseUrl}/${type.toLowerCase()}`}>
                        {type}        
                    </Link>    
                )
            }
        </React.Fragment>
    }
}