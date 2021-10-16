import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

class Auth extends Component {
    componentDidMount(){
        console.log(this.props);
    }
    state = {
        username: '',
        password: '',
        userType: ''
    }

    userChangedHandler = (event) => {
        this.setState(prevState=>({
            ...prevState,
                username:event.target.value
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
        else
        {
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
            <div>
                <form>
                    <input value={this.state.username} placeholder='Username' onChange={(event) => this.userChangedHandler(event)}></input>
                    <input value={this.state.password} placeholder='Password' onChange={(event) => this.passChangedHandler(event)}></input>
                    <button onClick={this.checkValidity}>LOG IN</button>
                </form>
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