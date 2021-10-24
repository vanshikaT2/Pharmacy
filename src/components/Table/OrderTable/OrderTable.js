import React, { Component } from "react";
import OrderTableRow from "./OrderTableRow";
import classes from '../Table.css';

class OrderTable extends Component {
    render() {
        var heading = this.props.heading;
        var body = this.props.body;
        return (
            <table className={classes.Table}>
                <thead>
                    <tr className={classes.TableHead}>
                        {heading.map(head => <th>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map((row) => {
                        return <OrderTableRow row={row} />;
                    })}
                </tbody>
            </table>
        );
    }
}

export default OrderTable;