import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { mergeClasses } from "@material-ui/styles";
import classes from './Auth.css';

class Auth extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    state = {
        username: '',
        password: '',
        userType: ''
    }

    userChangedHandler = (event) => {
        this.setState(prevState => ({
            ...prevState,
            username: event.target.value
        }))
        // console.log(event.target.value)
    }
    passChangedHandler = (event) => {
        this.setState(prevState => ({
            ...prevState,
            password: event.target.value
        }))
    }

    checkValidity = () => {
        if (this.state.username === 'test-admin' && this.state.password === 'test-admin') {
            // this.setState(prevState => ({
            //     ...prevState,
            //     userType: 'storeManager',
            // }))
            this.props.history.push('/admin');
        }
        else if (this.state.username === 'test-sales' && this.state.password === 'test-sales') {
            // this.setState(prevState => ({
            //     ...prevState,
            //     userType: 'salesExecutive',
            // }))
            this.props.history.push('/sales');
        }
        else {
            this.props.history.push('/error');
        }

        // if (this.state.userType === 'storeManager')
        //     this.props.history.push('/admin');
        // else if (this.state.userType === 'salesExecutive')
        //     this.props.history.push('/sales');
        // else if (this.state.userType === '')
        //     this.props.history.push('/error');

    };

    render() {
        console.log(this.state.username, this.state.password)
        return (
            // <div>
            //     <form className={classes.Form}>
            //         <div>LOG IN</div>
            //         <input className={classes.Input} value={this.state.username} placeholder='Username' onChange={(event) => this.userChangedHandler(event)}></input>
            //         <input className={classes.Input} type="password" value={this.state.password} placeholder='Password' onChange={(event) => this.passChangedHandler(event)}></input>
            //         <button onClick={this.checkValidity}>LOG IN</button>
            //     </form>
            // </div>
            <div className={classes.Login}>
                <div className={classes.formBlockWrapper} ></div>
                <section className={classes.formBlock}>
                    <header className={classes.formBlockHeader}>
                        <h1>Log In</h1>
                    </header>
                    <div className={classes.formBlockInputWrapper}>
                        <div className={classes.formGroup}>
                            <input className={classes.formGroupInput} value={this.state.username} placeholder='Username' onChange={(event) => this.userChangedHandler(event)} type="text" id="username" placeholder="user name" />
                            <input className={classes.formGroupInput} value={this.state.password} placeholder='Password' onChange={(event) => this.passChangedHandler(event)} type="password" id="password" placeholder="password" />
                        </div>
                    </div>
                    <button className={classes.button} type="submit" onClick={this.checkValidity}>Log In</button>
                </section>
            </div>
        );
    }
}

// const mapStateToProps=state=>{
//     return{
//     user: state.username,
//     pass:state.password,
//     uType:state.userType
//     }
// }

// const mapDispatchToProps=dispatch=>{
//     return{
//         onUserChanged:(evt)=>dispatch({type: actionTypes.USER_CHANGED,event:evt}),
//         onPassChanged:(evt)=>dispatch({type: actionTypes.PASS_CHANGED, event:evt}),
//         onLogging:()=>dispatch({type: actionTypes.CHECK_VALIDITY})
//     }
// }

export default Auth;