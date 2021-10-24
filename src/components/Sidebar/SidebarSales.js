import React, { Component, useState } from "react";
import classes from './Sidebar.css'
import order from "../../assets/pencil-square.svg";
import history from "../../assets/card-checklist.svg";
import logout from "../../assets/power.svg";
import menu from "../../assets/reshot-icon-hospital-JMW2QKSHZG.svg";
import SidebarItems from "./SidearItems/SidebarItems";


const Sidebar = (props) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const c = click ? classes.Menu : classes.MenuU;
    const s = click ? classes.Sidebar : classes.SidebarU;
    const t = click ? classes.Text : classes.TextU;
    const cont = click ? classes.Container : classes.ContainerU;

    return (
        <div className={classes.Page}>
            <button className={c} clicked={click} onClick={() => handleClick()}>Click</button>
            <div className={cont}>
                <div className={classes.Logo}>
                    <img src={menu} alt="logo" />
                </div>
                <ul className={s} clicked={click}>
                    <SidebarItems path='/sales/placeorder' classt={t} click={click} img={order}>
                        PLACE ORDER
                    </SidebarItems>
                    <SidebarItems path='/sales/orders' classt={t} click={click} img={history}>
                        ORDER HISTORY
                    </SidebarItems>

                </ul>
                <button onClick={props.logout} className={classes.Logout} title="LOG OUT">
                    <img src={logout} alt="logout" />
                </button>

            </div>
        </div>
    )
};

export default Sidebar;