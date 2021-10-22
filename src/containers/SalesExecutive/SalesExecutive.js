import React,{Component} from "react";
import Order from "../../components/Order/Order";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import Sidebar from "../../components/Sidebar/SidebarSales";
import {Route, Switch} from 'react-router';
import classes from './SalesExecutive.css';


class SalesExecutive extends Component{

    logOut=()=>{
        this.props.history.push('/')
    }

    render(){
        return(
            <div className={classes.Content}>
                <div className={classes.empty}></div>
                <Sidebar logout={this.logOut} />
                <div>
                    <Switch>
                        <Route  path='/sales/placeorder'component={Order}/>
                        <Route  path='/sales/orders'component={OrderHistory}/>
                    </Switch>
                </div>
            </div>
        );
    }

};

export default SalesExecutive;