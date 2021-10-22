import React, { Component, useState } from "react";
import classes from './SidebarItems.css';
import { NavLink } from "react-router-dom";

const SidebarItems = (props) => {
    return (
        <NavLink exact activeClassName={classes.active} to={props.path} className={classes.Item}>
            <img src={props.img} alt="logo" />
            <span className={props.classt} clicked={props.click}>{props.children}</span>
        </NavLink>
    )
};

export default SidebarItems;