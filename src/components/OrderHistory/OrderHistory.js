import React, { Component } from "react";
import { connect } from 'react-redux';
import classes from './OrderHistory.css';
import Delete from "../Delete/Delete";
import * as actionTypes from '../../containers/store/actions/actionTypes';
import OrderTable from "../Table/OrderTable/OrderTable";


class OrderHistory extends Component {

    delete = (orderID) => {
        const orders = this.props.orders;
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (orderID === order[4]) {
                orders.splice(i, 1);
                break;
            }
        }
        if (this.props.match.path === "/admin/orders")
            localStorage.setItem("orderHistory", JSON.stringify(orders));
        else
            localStorage.setItem("salesorderHistory", JSON.stringify(orders));
        this.props.onOrderPlaced(orders);
        window.location.reload();
    };

    componentDidMount() {
        let meds = [];
        if (this.props.match.path === "/admin/orders")
            meds = JSON.parse(localStorage.getItem("orderHistory"));
        else
            meds = JSON.parse(localStorage.getItem("salesorderHistory"));
        // console.log(execs)
        let data = meds !== null ? [...meds] : [];
        // console.log(data);
        // this.setState({ data: data })
        this.props.onOrderPlaced(data);
    }

    render() {
        console.log(this.props)
        let arr = this.props.orders;
        console.log(arr)
        const columns = ["Medicine Name", "Quantity"]
        let order = null;
        if (arr.length !== 0) {
            order = arr.map(ord => {
                console.log(ord)
                const data = ord[0];
                const total = ord[3]
                const ordID = ord[4]
                console.log(total)
                return (
                    <div className={classes.Margin}>
                        <div >
                            <span className={classes.Customer}>Customer Name: {ord[1]}</span>
                            <span className={classes.Customer}>Customer Contact: {ord[2]}</span>
                            <span className={classes.Customer}>Order ID: {ordID}</span>
                        </div>
                        <OrderTable heading={columns} body={data} />
                        <div>
                            <div className={classes.Amount} >Total Amount: {total}</div>
                            <div className={classes.button}>
                                <Delete function={() => { this.delete(ordID) }}>Delete</Delete>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            order = <div className={classes.NoOrder}>
                No Order History.
                Place Order to view history.
            </div>
        }

        return (
            <div className={classes.OrderH}>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderH
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderPlaced: (order) => dispatch({ type: actionTypes.ADD_ORDERS, medicines: order })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);