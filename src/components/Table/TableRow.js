import React, { Component } from "react";
import Delete from "../Delete/Delete";
import Update from "../Update/Update";
import classes from './Table.css'

class TableRow extends Component {
    render() {
        var row = this.props.row;
        return (
            <tr className={classes.TableRow}>
                {row.map(val => <td className={classes.TableCell}>{val}</td>)}
                <td className={classes.UD}><Update function={this.props.Update} /></td>
                <td className={classes.UD}><Delete function={this.props.Delete} /></td>
            </tr>
        )
    }
}
export default TableRow;