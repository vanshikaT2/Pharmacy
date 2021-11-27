import React, { Component } from "react";
import classes from './Medicines.css';
import Modal from "../Modal/Modal";
import { connect } from 'react-redux';
import * as actionTypes from '../../containers/store/actions/actionTypes';
import Table from '../Table/Table';

class Medicines extends Component {
    state = {
        openModal: false,
        medicine: {
            name: '',
            manu: '',
            price: '',
            stock: '',
            disc: ''
        },
        index: undefined,
        openUpdateModal: false,
        arr: [],
        data: []
    }
    cancelHandler = () => {
        this.setState({
            openModal: false, openUpdateModal: false, medicine: {
                name: '',
                manu: '',
                price: '',
                stock: '',
                disc: ''
            }
        })
    };
    addDetails = (event, key) => {

        let updatedMedicine = { ...this.state.medicine };
        updatedMedicine[key] = event.target.value;

        this.setState({ medicine: updatedMedicine });
    };

    addMed = () => {
        const index = this.state.index
        console.log(index)
        this.state.arr.push(this.state.medicine.name);
        this.state.arr.push(this.state.medicine.manu);
        this.state.arr.push(this.state.medicine.price);
        this.state.arr.push(this.state.medicine.stock);
        this.state.arr.push(this.state.medicine.disc);

        if (index === undefined) {

            this.state.data.push(this.state.arr);
            this.setState({ openModal: false })
            // console.log(arr);
        }
        else {
            this.state.data[index] = this.state.arr
            this.setState({ openUpdateModal: false })
        }
        this.setState({
            index: undefined, openModal: false, arr: [], medicine: {
                name: '',
                manu: '',
                price: '',
                stock: '',
                disc: ''
            }
        })
        localStorage.setItem("medData", JSON.stringify(this.state.data));
        this.props.onMedicineAdded(this.state.data);
    };

    updateMed = (index) => {
        // let index = event.target.parentNode.parentNode.id;
        this.setState({
            index: index, openUpdateModal: true, medicine: {
                name: this.state.data[index][0],
                manu: this.state.data[index][1],
                price: this.state.data[index][2],
                stock: this.state.data[index][3],
                disc: this.state.data[index][4],
            }
        });
        localStorage.setItem("medData", JSON.stringify(this.state.data));
    };

    deleteMed = (index) => {
        this.setState({ index: index });
        this.state.data.splice(index, 1);
        this.setState({ index: undefined })
        // console.log(data);
        localStorage.setItem("medData", JSON.stringify(this.state.data));
    };

    componentDidMount() {
        let meds = JSON.parse(localStorage.getItem("medData"));
        // console.log(execs)
        let data = meds !== null ? [...meds] : [];
        console.log(data);
        // this.setState({ data: data })
        this.props.onMedicineAdded(data);
        this.setState({ data: data })
    }

    render() {

        const columns = [
            "Medicine Name", "Manufacturer", "Price", "Stock", "Discount(in %)", "", ""];

        return (
            <div className={classes.Med}>

                <button className={classes.button} onClick={() => this.setState({ openModal: true })}>ADD MEDICINE</button>
                <Modal open={this.state.openModal}>
                    <input className={classes.ModalInput} value={this.state.medicine.name} onChange={(event) => this.addDetails(event, 'name')} placeholder='Medicine Name'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.manu} onChange={(event) => this.addDetails(event, 'manu')} placeholder='Manufacturer'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.price} onChange={(event) => this.addDetails(event, 'price')} placeholder='Price'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.stock} onChange={(event) => this.addDetails(event, 'stock')} placeholder='Stock'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.disc} onChange={(event) => this.addDetails(event, 'disc')} placeholder='Discount(in %)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addMed}>
                        Add
                    </button>
                </Modal>
                <Modal open={this.state.openUpdateModal}>
                    <input className={classes.ModalInput} value={this.state.medicine.name} onChange={(event) => this.addDetails(event, 'name')} placeholder='Medicine Name'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.manu} onChange={(event) => this.addDetails(event, 'manu')} placeholder='Manufacturer'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.price} onChange={(event) => this.addDetails(event, 'price')} placeholder='Price'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.stock} onChange={(event) => this.addDetails(event, 'stock')} placeholder='Stock'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.disc} onChange={(event) => this.addDetails(event, 'disc')} placeholder='Discount(in %)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addMed}>
                        Update
                    </button>
                </Modal>

                <Table heading={columns} body={this.state.data} Update={this.updateMed} Delete={this.deleteMed} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMedicineAdded: (invent) => dispatch({ type: actionTypes.ADD_INVENTORY, data: invent })
    }
}

export default connect(null, mapDispatchToProps)(Medicines);