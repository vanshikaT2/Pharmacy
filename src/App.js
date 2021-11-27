import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth'
import Error from './components/error'
import Executives from "./components/Executives/Executives";
import Medicines from "./components/Medicines/Medicines";
import Order from "./components/Order/Order";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import SidebarAdmin from './components/Sidebar/SidebarAdmin';
import Sidebar from './components/Sidebar/SidebarSales';
import { withRouter } from 'react-router';
import classes from './App.css';

class App extends Component {

  logOut = () => {
    this.props.history.push('/')
    localStorage.setItem('userType', 'null')
  }
  render() {
    // console.log(this.props)
    let sidebar = null;
    if (localStorage.getItem('userType') === 'admin')
      sidebar = <SidebarAdmin logout={this.logOut} />
    else if (localStorage.getItem('userType') === 'sales')
      sidebar = <Sidebar logout={this.logOut} />
    return (
      <div className={classes.Content}>
        <div className={classes.empty}></div>
        {sidebar}
        <Switch>
          <Route path="/admin/executives" component={Executives} />
          <Route path='/admin/inventory' component={Medicines} />
          <Route path='/admin/placeorder' component={Order} />
          <Route path='/admin/orders' component={OrderHistory} />
          <Route path='/sales/placeorder' component={Order} />
          <Route path='/sales/orders' component={OrderHistory} />
          <Route path="/error" component={Error} />
          <Route path="/" exact component={Auth} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
