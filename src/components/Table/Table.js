import React, { Component } from "react";
import TableRow from "./TableRow";
import classes from './Table.css';

class Table extends Component {
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
                    {body.map((row, index) => {
                        return <TableRow row={row} Update={() => this.props.Update(index)} Delete={() => this.props.Delete(index)} />;
                    })}
                </tbody>
            </table>
        );
    }
}

export default Table;