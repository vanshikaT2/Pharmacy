// import { Backdrop } from '@material-ui/core';
import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css';

class modal extends Component {

    render() {
        return (
            <div>
                <Backdrop show={this.props.open}/>
                <div
                    open={this.props.open}
                    className={classes.Modal}
                    style={{
                        transform: this.props.open ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.open ? '1' : '0'
                    }}>
                    <div className={classes.Bg}/>
                    {this.props.children}
                </div>
                
            </div>
        )
    }
}

export default modal;