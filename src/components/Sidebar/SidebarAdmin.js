import React, { Component, useState } from "react";
import classes from './Sidebar.css'
import exec from "../../assets/person-bounding-box.svg";
import med from "../../assets/bag-plus-fill.svg";
import order from "../../assets/pencil-square.svg";
import history from "../../assets/card-checklist.svg";
import logout from "../../assets/power.svg";
import menu from "../../assets/reshot-icon-hospital-JMW2QKSHZG.svg";
import SidebarItems from "./SidearItems/SidebarItems";


const SidebarAdmin = (props) => {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const c = click ? classes.Menu : classes.MenuU;
   const s = click ? classes.Sidebar : classes.SidebarU;
   const t = click ? classes.Text : classes.TextU;
   const cont = click ? classes.Container : classes.ContainerU;


   return (
      <div className={classes.Page}>
         <button className={c} clicked={click} onClick={() => handleClick()}></button>
         <div className={cont}>
            <div className={classes.Logo}>
               <img src={menu} alt="logo" />
            </div>
            <ul className={s} clicked={click}>
               <SidebarItems path='/admin/inventory' classt={t} click={click} img={med}>
                  INVENTORY
               </SidebarItems>
               <SidebarItems path='/admin/executives' classt={t} click={click} img={exec}>
                  EXECUTIVES
               </SidebarItems>
               <SidebarItems path='/admin/placeorder' classt={t} click={click} img={order}>
                  PLACE ORDER
               </SidebarItems>
               <SidebarItems path='/admin/orders' classt={t} click={click} img={history}>
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

export default SidebarAdmin;