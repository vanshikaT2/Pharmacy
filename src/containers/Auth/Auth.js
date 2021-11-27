import React, { Component } from "react";
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
    }
    passChangedHandler = (event) => {
        this.setState(prevState => ({
            ...prevState,
            password: event.target.value
        }))
    }

    checkValidity = () => {
        if (this.state.username === 'test-admin' && this.state.password === 'test-admin') {
            this.props.history.push('/admin/inventory');
            localStorage.setItem('userType', 'admin')
        }
        else if (this.state.username === 'test-sales' && this.state.password === 'test-sales') {
            this.props.history.push('/sales/placeorder');
            localStorage.setItem('userType', 'sales')
        }
        else {
            this.props.history.push('/error');
            localStorage.setItem('userType', 'null')
        }

    };

    render() {
        console.log(this.state.username, this.state.password)
        return (
            <div className={classes.Login}>
                <div className={classes.formBlockWrapper} ></div>
                <section className={classes.formBlock}>
                    <header className={classes.formBlockHeader}>
                        <h1>Log In</h1>
                    </header>
                    <div className={classes.formBlockInputWrapper}>
                        <form className={classes.formGroup}>
                            <input className={classes.formGroupInput} value={this.state.username} placeholder='Username' onChange={(event) => this.userChangedHandler(event)} type="text" id="username" />
                            <input className={classes.formGroupInput} value={this.state.password} placeholder='Password' onChange={(event) => this.passChangedHandler(event)} type="password" id="password" />
                        </form>
                    </div>
                    <button className={classes.button} type="submit" onClick={this.checkValidity}>Log In</button>
                </section>
            </div>
        );
    }
}

export default Auth;