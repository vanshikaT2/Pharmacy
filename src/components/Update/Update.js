import React from "react";
import up from "../../assets/update.png";
import classes from "./Update.css"

const update=(props)=>{
    return(
        <button className={classes.button} onClick ={props.function}>
              <img src={up}  alt="logout"/>
        </button>
    );
}

export default update;