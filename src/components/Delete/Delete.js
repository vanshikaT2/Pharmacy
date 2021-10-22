import React from "react";
import classes from "./Delete.css";
import del from "../../assets/delete.svg";

const Delete =(props)=>{
    return(
        <button className={classes.button} onClick ={props.function}>
            <img src={del}  alt="logout"/>
        </button>
    );
}

export default Delete;