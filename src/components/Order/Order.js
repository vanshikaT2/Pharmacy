import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../containers/store/actions/actionTypes';
import classes from './Order.css';
import OrderTable from "../Table/OrderTable/OrderTable";

class Order extends Component {
    state = {
        name: '',
        quantity: 0,
        customerName: '',
        customerID: '',
        total: 0,
        medicines: [],
        arr: [],
        orderArr: [],
        orderHistory: [],
    }
    addDetails = (event, key) => {
        let updatedState = { ...this.state };
        updatedState[key] = event.target.value;
        this.setState(updatedState);
    };

    addMed = (event) => {
        event.preventDefault();
        let price = 0;
        let count = 0;
        for (let i = 0; i < this.props.meds.length; i++) {
            if (this.props.meds[i][0] === this.state.name) {
                price = this.props.meds[i][2];
                break;
            }
            else count++;
        };
        if (count !== this.props.meds.length) {
            this.state.arr.push(this.state.name, this.state.quantity, price);
            this.state.medicines.push(this.state.arr);

        }
        this.setState({
            name: '',
            quantity: 0,
            customerName: this.state.customerName,
            customerID: this.state.customerID,
            total: 0,
            arr: [],
        })
    };
    placeOrder = () => {
        let id = Math.floor(Math.random() * 9000000) + 1000000;
        // this.setState({ orderID: id })
        console.log('orderrrrrrrrrrr')
        let totalAmount = 0;
        for (let i = 0; i < this.state.medicines.length; i++) {
            totalAmount += (this.state.medicines[i][1] * this.state.medicines[i][2]);
            this.state.medicines[i].splice(2, 1);
        }
        this.setState({ total: totalAmount })
        console.log(totalAmount);
        this.state.orderArr.push(this.state.medicines, this.state.customerName, this.state.customerID, totalAmount, id);

        this.state.orderArr !== null ? this.state.orderHistory.push(this.state.orderArr) : this.state.orderHistory;
        this.props.onOrderPlaced(this.state.orderHistory);
        console.log(this.state.orderHistory)
        this.setState({ customerName: '', customerID: '', orderArr: [], medicines: [] })
        if (this.props.match.path === "/admin/placeorder")
            localStorage.setItem("orderHistory", JSON.stringify(this.state.orderHistory));
        else
            localStorage.setItem("salesorderHistory", JSON.stringify(this.state.orderHistory));
        // localStorage.setItem("orderID", this.state.orderID);
    }

    componentDidMount() {
        let opt = JSON.parse(localStorage.getItem("medData"));
        let optD = opt !== null ? [...opt] : [];
        let meds = [];
        this.props.onMedicineAdded(optD)
        if (this.props.match.path === "/admin/placeorder")
            meds = JSON.parse(localStorage.getItem("orderHistory"));
        else
            meds = JSON.parse(localStorage.getItem("salesorderHistory"));
        // let id = localStorage.getItem("orderID");
        // console.log(execs)
        let data = meds !== null ? [...meds] : [];
        console.log(data);
        // this.setState({ data: data })
        this.props.onOrderPlaced(data);
        // this.props.history.push()
        this.setState({ orderHistory: data })
        // this.setState({ orderID: id })
    }
    render() {
        const array = this.props.meds;
        const name = [];

        for (let i = 0; i < array.length; i++) {
            name.push(array[i][0]);
        }

        const options =
            name.map(key => {
                return (
                    <option>{key}</option>
                )

            })

        const columns = ["Medicine Name", "Quantity", "Price (per unit)"]

        let totalAmount = 0;
        for (let i = 0; i < this.state.medicines.length; i++) {
            totalAmount += (this.state.medicines[i][1] * this.state.medicines[i][2])
        }
        return (
            <div className={classes.Order}>
                <form className={classes.Input}>
                    <input value={this.state.customerName} className={classes.formGroupInput} onChange={(event) => this.addDetails(event, 'customerName')} placeholder="Customer name" />
                    <input value={this.state.customerID} className={classes.formGroupInput} onChange={(event) => this.addDetails(event, 'customerID')} placeholder="Customer contact" />
                    <input list="medicines" name="browser" className={classes.Select} value={this.state.name} onChange={(event) => this.addDetails(event, 'name')} />
                    <datalist id="medicines">
                        {options}
                    </datalist>
                    <input type="number" className={classes.Select} value={this.state.quantity} onChange={(event) => this.addDetails(event, 'quantity')}></input>
                    <button className={classes.add} onClick={(e) => this.addMed(e)}>ADD</button>

                </form>
                <OrderTable heading={columns} body={this.state.medicines} />
                <div className={classes.Total}>Total Amount: {totalAmount}</div>
                <button className={classes.PlaceOrder} onClick={this.placeOrder}>Place Order</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        meds: state.inventory
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMedicineAdded: (invent) => dispatch({ type: actionTypes.ADD_INVENTORY, data: invent }),
        onOrderPlaced: (order) => dispatch({ type: actionTypes.ADD_ORDERS, medicines: order })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);