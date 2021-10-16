import React, { Component } from 'react';
// import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/action';
import SalesExecutive from './containers/SalesExecutive/SalesExecutive';
import StoreManager from './containers/StoreManager/StoreManager';
import Error from './components/error'

// let main=null;

// if(this.props.uType==='test-admin')
// main={StoreManager}
// else if(this.props.uType==='test-admin')
// main={SalesExecutive}
// else
// main={Error}

class App extends Component {

  render() {
    // console.log(this.props.uType)
    // let main = null;

    // if (this.props.uType === 'storeManager')
    //   main = StoreManager
    // else if (this.props.uType === 'salesExecutive')
    //   main = SalesExecutive
    // else
    //   main =  Error
    return (
      <div>
        <Switch>
          <Route path="/admin" component={StoreManager} />
          <Route path="/sales" component={SalesExecutive} />
          <Route path="/error" component={Error} />
          <Route path="/" exact component={Auth} />
          {/* <Route path="/main" component={main} /> */}
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     uType: state.userType
//   }
// }

export default App;
