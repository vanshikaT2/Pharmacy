import React, { Component, useState } from "react";
import classes from './Sidebar.css'
import order from "../../assets/pencil-square.svg";
import history from "../../assets/card-checklist.svg";
import logout from "../../assets/power.svg";
import menu from "../../assets/reshot-icon-hospital-JMW2QKSHZG.svg";
import SidebarItems from "./SidearItems/SidebarItems";


const Sidebar=(props)=>{
    const[click,setClick]=useState(false);
    const handleClick=()=>setClick(!click);
    const c= click ? classes.Menu: classes.MenuU;
    const s=click ? classes.Sidebar:classes.SidebarU;
    const t=click ? classes.Text:classes.TextU;
    const cont=click ? classes.Container:classes.ContainerU;

    return(
        <div className={classes.Page}>
            <button className={c} clicked={click} onClick={()=>handleClick()}>Click</button>
            <div className={cont}>
                <div className={classes.Logo}>
                <img src={menu} alt="logo"/>
                </div>
                <ul className={s} clicked={click}>
                    {/* <NavLink exact activeClassName={classes.active} to='/admin/inventory' className={classes.Item}>
    //                    <img src={med} alt="logo"/>
    //                    <span className={t} clicked={click}>INVENTORY</span>
    //                </NavLink>
    //                <NavLink exact activeClassName={classes.active} to='/admin/executives' className={classes.Item}>
    //                    <img src={exec} alt="logo"/>
    //                    <span className={t} clicked={click}>SALES EXECUTIVES</span>
    //                </NavLink>
    //                <NavLink exact activeClassName={classes.active} to='/admin/placeorder' className={classes.Item}>
    //                    <img src={order} alt="logo"/>
    //                    <span className={t} clicked={click}>PLACE ORDER</span>
    //                </NavLink>
    //                <NavLink exact activeClassName={classes.active} to='/admin/orders' className={classes.Item}>
    //                    <img src={history} alt="logo"/>
    //                    <span className={t} clicked={click}>ORDER HISTORY</span>
    //                </NavLink> */}
                   {/* <SidebarItems path='inventory' classt={t} click={click} img={med}>
                     INVENTORY
                    </SidebarItems>
                    <SidebarItems path='executives' classt={t} click={click} img={exec}>
                       EXECUTIVES
                    </SidebarItems> */}
                    <SidebarItems path='/sales/placeorder' classt={t} click={click} img={order}>
                       PLACE ORDER
                    </SidebarItems>
                    <SidebarItems path='/sales/orders' classt={t} click={click} img={history}>
                       ORDER HISTORY
                    </SidebarItems>
                   
               </ul> 

               {/* <div>
                    <img src="https://picsum.photos/200"/>
               </div> */}

                <button onClick={props.logout} className={classes.Logout} title="LOG OUT">
               <img src={logout} alt="logout"/>
               </button> 

          </div> 
        </div>
    )
};

export default Sidebar;