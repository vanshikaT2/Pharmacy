import React, { Component } from "react";
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import classes from './OrderHistory.css';
import Delete from "../Delete/Delete";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';


class OrderHistory extends Component {

    delete=(orderID)=>{
        const orders = this.props.orders; 
        for(let i=0; i<orders.length; i++)
        {
            const order = orders[i];
            if ( orderID === order[4])
            {
                orders.splice(i, 1);
                break;
            }
        }
        window.location.reload();
    };

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
        let arr = this.props.orders;
        console.log(arr)
        const opt = {
            viewColumns: false,
            print: false,
            download: false
        };
        const columns = ["Medicine Name", "Quantity"]
        let order = null;
        if (arr.length !== 0) {
            order = arr.map(ord => {
                console.log(ord)
                const data = ord[0];
                const total = ord[3]
                const ordID = ord[4]
                return (
                    <div className={classes.Margin}> 
                        <div >
                        <span className={classes.Customer}>Customer Name: {ord[1]}</span>
                        <span className={classes.Customer}>Customer Contact: {ord[2]}</span>
                        <span className={classes.Customer}>Order ID: {ordID}</span>
                        </div>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Total Amount: " + total}
                            data={data}
                            columns={columns}
                            options={opt}

                        />
                        </MuiThemeProvider>
                        <Delete className={classes.button} function={() => {this.delete(ordID)}}>Delete</Delete>
                    </div>
                )
            })
        }
        else{
            order=<div className={classes.NoOrder}>
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


export default connect(mapStateToProps)(OrderHistory);