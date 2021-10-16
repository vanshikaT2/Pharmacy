import React, { Component } from "react";
import { withRouter } from "react-router";

class error extends Component{

    onclick=()=>{
        this.props.history.push('/');
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <p>Error</p>
                <button onClick={this.onclick}>Go back</button>
            </div>
        )
    }
}

export default withRouter(error);