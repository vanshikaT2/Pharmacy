import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../containers/store/actions/actionTypes';
import classes from './Order.css';
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

let medicines = [];
let arr = [];
let orderArr = [];
let orderHistory = [];
let orderID=527196;

class Order extends Component {
    state = {
        name: '',
        quantity: 0,
        customerName: '',
        customerID: '',
        total: 0
    }

    updateName = (event) => {
        this.setState(prevState => ({
            ...prevState,
            name: event.target.value
        }))
        orderID++;
    };
    updateQuantity = (event) => {
        this.setState(prevState => ({
            ...prevState,
            quantity: event.target.value
        }))
    };
    updateCustomerName = (event) => {
        this.setState(prevState => ({
            ...prevState,
            customerName: event.target.value
        }))
    };
    updateCustomerID = (event) => {
        this.setState(prevState => ({
            ...prevState,
            customerID: event.target.value
        }))
    };

    addMed = (event) => {
        event.preventDefault();
        arr = [];
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
            arr.push(this.state.name, this.state.quantity, price);
            medicines.push(arr);
           
        }
        this.setState({
            name: '',
            quantity: 0,
            customerName: this.state.customerName,
            customerID: this.state.customerID,
            total: 0
        })
    };
    placeOrder=()=>{
        console.log('orderrrrrrrrrrr')
        let totalAmount=0;
        for (let i = 0; i < medicines.length; i++) {
            totalAmount += (medicines[i][1] * medicines[i][2]);
            medicines[i].splice(2,1);
        }
        this.state.total=totalAmount;
        console.log(medicines);
        orderArr.push(medicines,this.state.customerName, this.state.customerID,this.state.total,orderID);
        orderHistory.push(orderArr);
        this.props.onOrderPlaced(orderHistory);
        console.log(orderHistory)
        orderArr=[];
        medicines=[];
        this.setState({customerName:'',customerID:''})
    }

    getMuiTheme = () => createTheme({
        overrides: {
          MUIDataTableHeadCell: {
            root: {
              borderColor: "black"
            },
            data:{
                fontSize:"18px"
            }
          },
          MuiIconButton:{
              label:{
                  display:"none"
              }
          },
          MuiTablePagination:{
              toolbar:{
                  display:"none"
              }
          },
          MUIDataTableToolbar:{
              root:{
                backgroundColor: "#FFE7E7"
              }
          },
          MuiTypography:{
              h6:{
                fontSize: "1.5rem",
                fontFamily: "Noto Sans Mono, monospace"
              }
          },
          MUIDataTableBodyCell:{
              root:{
                  fontSize:"1rem",
                  color:"#4f4e4e"
              }
          },
        }
      })
    render() {

        const array = this.props.meds;

        const name = [];

        for (let i = 0; i < array.length; i++) {
            name.push(array[i][0]);
        }
        console.log(name)
        
        const options =
            name.map(key => {
                return (
                    <option>{key}</option>
                )

            })

        const columns = ["Medicine Name", "Quantity", "Price (per unit)"]
        const opt = {
            viewColumns: false,
            print: false,
            download: false
        };

        let totalAmount = 0;
        for (let i = 0; i < medicines.length; i++) {
            totalAmount += (medicines[i][1] * medicines[i][2])
        }
        return (
            <div className={classes.Order}>
                <form className={classes.Input}>
                    <input value={this.state.customerName} className={classes.formGroupInput} onChange={this.updateCustomerName} placeholder="Customer name" />
                    <input value={this.state.customerID} className={classes.formGroupInput} onChange={this.updateCustomerID} placeholder="Customer contact" />
                    <input list="medicines" name="browser" className={classes.Select} value={this.state.name} onChange={this.updateName} />
                    <datalist id="medicines">
                        {options}
                    </datalist>
                    <input type="number" className={classes.Select} value={this.state.quantity} onChange={this.updateQuantity}></input>
                    <button className={classes.add} onClick={(e) => this.addMed(e)}>ADD</button>

                </form>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Order Summary "}
                    data={medicines}
                    columns={columns}
                    options={opt}

                />
                </MuiThemeProvider>
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
        onOrderPlaced: (order) => dispatch({ type: actionTypes.ADD_ORDERS, medicines: order })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);