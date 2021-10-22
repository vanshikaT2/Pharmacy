import React,{Component} from "react";
import Executives from "../../components/Executives/Executives";
import Medicines from "../../components/Medicines/Medicines";
import Order from "../../components/Order/Order";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import Sidebar from "../../components/Sidebar/SidebarAdmin";
import {Route, Switch} from 'react-router';
import classes from './StoreManager.css';


class StoreManager extends Component{

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
                        <Route  path='/admin/executives'component={Executives}/>
                        <Route  path='/admin/inventory'component={Medicines}/>
                        <Route  path='/admin/placeorder'component={Order}/>
                        <Route  path='/admin/orders'component={OrderHistory}/>
                    </Switch>
                </div>
            </div>
        );
    }

};

export default StoreManager;