import React, { Component } from "react";
import classes from '../Table.css';

class OrderTableRow extends Component {
    render() {
        var row = this.props.row;
        return (
            <tr className={classes.TableRow}>
                {row.map(val => <td className={classes.TableCell}>{val}</td>)}
            </tr>
        )
    }
}
export default OrderTableRow;