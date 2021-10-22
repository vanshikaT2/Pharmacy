import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import classes from './Medicines.css';
import Modal from "../Modal/Modal";
import Update from '../Update/Update';
import Delete from '../Delete/Delete';
import { connect } from 'react-redux';
import * as actionTypes from '../../containers/store/actions/actionTypes';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';


let arr = [];
let data = [];

class Medicines extends Component{
    state = {
        openModal:false,
        medicine: {
            name: '',
            manu: '',
            price: '',
            stock: '',
            disc: ''
        },
        index:undefined,
        openUpdateModal:false,
    }
    cancelHandler = () => {
        this.setState({ openModal: false })
        this.setState({ openUpdateModal: false })
        this.setState({
            medicine: {
                name: '',
                manu: '',
                price: '',
                stock: '',
                disc:''
            }
        })
    };
    addName = (event) => {
        this.setState(prevState => ({
            ...prevState,
            medicine: {
                ...prevState.medicine,
                name: event.target.value
            }
        }))
    };
    addManu = (event) => {
        this.setState(prevState => ({
            ...prevState,
            medicine: {
                ...prevState.medicine,
                manu: event.target.value
            }
        }))
    };
    addPrice = (event) => {
        this.setState(prevState => ({
            ...prevState,
            medicine: {
                ...prevState.medicine,
                price: event.target.value
            }
        }))
    };
    addStock = (event) => {
        this.setState(prevState => ({
            ...prevState,
            medicine: {
                ...prevState.medicine,
                stock: event.target.value
            }
        }))
    };
    addDisc = (event) => {
        this.setState(prevState => ({
            ...prevState,
            medicine: {
                ...prevState.medicine,
                disc: event.target.value
            }
        }))
    };

    addMed = () => {
        const index = this.state.index
        console.log(index)
        arr = [];
        arr.push(this.state.medicine.name);
        arr.push(this.state.medicine.manu);
        arr.push(this.state.medicine.price);
        arr.push(this.state.medicine.stock);
        arr.push(this.state.medicine.disc);
        
        if (index === undefined){
        
        data.push(arr);
        this.setState({ openModal: false })
        console.log(arr);
        }
        else{
            data[index] = arr
            this.setState({ openUpdateModal: false })
        }
        this.setState( {index: undefined})
        this.setState({ openModal: false })
        this.props.onMedicineAdded(data); 
        this.setState({
            medicine: {
                name: '',
                manu: '',
                price: '',
                stock: '',
                disc:''
            }
            
        })
        
    };

    updateMed = (index) =>  {
        this.setState( { index: index});
        this.setState({ openUpdateModal: true});
        this.setState({medicine:{
            name:data[index][0],
            manu:data[index][1],
            price:data[index][2],
            stock:data[index][3],
            disc:data[index][4],
        }})

    }; 
    deleteMed = (index) =>  {
        this.setState( { index: index});
        data.splice(index, 1);
        this.setState( {index: undefined})
        console.log(data);

    }; 

    
    getMuiTheme = () => createTheme({
        overrides: {
          MUIDataTableHeadCell: {
            root: {
              borderColor: "black"
            },
            data:{
                fontSize:"18px"
            }
          },
          MuiIconButton:{
              label:{
                  display:"none"
              }
          },
          MuiTablePagination:{
              toolbar:{
                  display:"none"
              }
          },
          MUIDataTableToolbar:{
              root:{
                backgroundColor: "#FFE7E7"
              }
          },
          MuiTypography:{
              h6:{
                fontSize: "1.5rem",
                fontFamily: "Noto Sans Mono, monospace"
              }
          },
          MUIDataTableBodyCell:{
              root:{
                  fontSize:"1rem",
                  color:"#4f4e4e"
              }
          },
        }
      })





    render() {

        const columns = [
            "Medicine Name", "Manufacturer", "Price", "Stock", "Discount(in %)",
            {
                name: "",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                        return (
                            
                            <Update 
                             function = {() => this.updateMed(tableMeta.rowIndex)}
                            />
                        ); 
                    }
                }
            },
            {
                name: "",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                        return (
                            
                            <Delete 
                             function = {() => this.deleteMed(tableMeta.rowIndex)}
                            />
                        ); 
                    }
                }
            }];

        const options = {
            viewColumns: false,
            print: false,
            download: false
        };
        return (
            <div className={classes.Med}>

                <button className={classes.button} onClick={() => this.setState({ openModal: true })}>ADD MEDICINE</button>
                <Modal open={this.state.openModal}>
                    <input className={classes.ModalInput} value={this.state.medicine.name} onChange={this.addName} placeholder='Medicine Name'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.manu} onChange={this.addManu} placeholder='Manufacturer'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.price} onChange={this.addPrice} placeholder='Price'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.stock} onChange={this.addStock} placeholder='Stock'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.disc} onChange={this.addDisc} placeholder='Discount(in %)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addMed}>
                        Add
                    </button>
                </Modal>
                <Modal open={this.state.openUpdateModal}>
                    <input className={classes.ModalInput} value={this.state.medicine.name} onChange={this.addName} placeholder='Medicine Name'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.manu} onChange={this.addManu} placeholder='Manufacturer'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.price} onChange={this.addPrice} placeholder='Price'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.stock} onChange={this.addStock} placeholder='Stock'></input>
                    <input className={classes.ModalInput} value={this.state.medicine.disc} onChange={this.addDisc} placeholder='Discount(in %)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addMed}>
                        Update
                    </button>
                </Modal>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Inventory"}
                    data={data}
                    columns={columns}
                    options={options}

                />
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onMedicineAdded: (invent) => dispatch({type:actionTypes.ADD_INVENTORY, data:invent})
    }
}

export default connect( null,mapDispatchToProps)(Medicines);