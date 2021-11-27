import React, { Component } from "react";
import classes from './Executives.css';
import Modal from "../Modal/Modal";
import Table from '../Table/Table';


class Executives extends Component {
    state = {
        openModal: false,
        executive: {
            fname: '',
            lname: '',
            dob: '',
            gender: '',
            exp: ''
        },
        index: undefined,
        openUpdateModal: false,
        arr: [],
        data: []
    }

    cancelHandler = () => {
        this.setState({
            openModal: false, openUpdateModal: false, executive: {
                fname: '',
                lname: '',
                dob: '',
                gender: '',
                exp: ''
            }
        })

    };
    addDetails = (event, key) => {

        let updatedExecutive = { ...this.state.executive };
        updatedExecutive[key] = event.target.value;

        this.setState({ executive: updatedExecutive });
    };



    addExec = (event) => {
        event.preventDefault();
        const index = this.state.index
        console.log(index)
        this.state.arr.push(this.state.executive.fname);
        this.state.arr.push(this.state.executive.lname);
        this.state.arr.push(this.state.executive.dob);
        this.state.arr.push(this.state.executive.gender);
        this.state.arr.push(this.state.executive.exp);

        if (index === undefined) {
            this.state.data.push(this.state.arr);
            this.setState({ openModal: false })
        }
        else {
            this.state.data[index] = this.state.arr
            this.setState({ openUpdateModal: false })
        }
        this.setState({
            index: undefined, openModal: false, arr: [],
            executive: {
                fname: '',
                lname: '',
                dob: '',
                gender: '',
                exp: ''
            }
        })

        localStorage.setItem("execData", JSON.stringify(this.state.data));

    };

    updateExec = (index) => {
        this.setState({
            index: index, openUpdateModal: true, executive: {
                fname: this.state.data[index][0],
                lname: this.state.data[index][1],
                dob: this.state.data[index][2],
                gender: this.state.data[index][3],
                exp: this.state.data[index][4],
            }
        });

        localStorage.setItem("execData", JSON.stringify(this.state.data));
    };
    deleteExec = (index) => {
        this.setState({ index: index });
        this.state.data.splice(index, 1);
        console.log(this.state.data)
        this.setState({ index: undefined })
        // console.log(data);
        localStorage.setItem("execData", JSON.stringify(this.state.data));

    };

    componentDidMount() {
        let execs = JSON.parse(localStorage.getItem("execData"));
        console.log(execs)
        let data = execs !== null ? [...execs] : [];
        console.log(data);
        this.setState({ data: data })
    }
    render() {

        const columns = [
            "First Name", "Last Name", "DOB", "Gender", "Experience(in years)", "", ""];

        return (
            <div className={classes.Exec}>

                <button className={classes.button} onClick={() => this.setState({ openModal: true })}>ADD EXECUTIVE</button>
                <Modal open={this.state.openModal}>
                    <input className={classes.ModalInput} value={this.state.executive.fname} onChange={(event) => this.addDetails(event, 'fname')} placeholder='First Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.lname} onChange={(event) => this.addDetails(event, 'lname')} placeholder='Last Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.dob} onChange={(event) => this.addDetails(event, 'dob')} placeholder='DOB'></input>
                    <input className={classes.ModalInput} value={this.state.executive.gender} onChange={(event) => this.addDetails(event, 'gender')} placeholder='Gender'></input>
                    <input className={classes.ModalInput} value={this.state.executive.exp} onChange={(event) => this.addDetails(event, 'exp')} placeholder='Experience(in years)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addExec}>
                        Add
                    </button>
                </Modal>
                <Modal open={this.state.openUpdateModal}>
                    <input className={classes.ModalInput} value={this.state.executive.fname} onChange={(event) => this.addDetails(event, 'fname')} placeholder='First Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.lname} onChange={(event) => this.addDetails(event, 'lname')} placeholder='Last Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.dob} onChange={(event) => this.addDetails(event, 'dob')} placeholder='DOB'></input>
                    <input className={classes.ModalInput} value={this.state.executive.gender} onChange={(event) => this.addDetails(event, 'gender')} placeholder='Gender'></input>
                    <input className={classes.ModalInput} value={this.state.executive.exp} onChange={(event) => this.addDetails(event, 'exp')} placeholder='Experience(in years)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addExec}>
                        Update
                    </button>
                </Modal>
                <Table heading={columns} body={this.state.data} Update={this.updateExec} Delete={this.deleteExec} />
            </div>
        )
    }
};

export default Executives;
