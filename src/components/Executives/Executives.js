import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import classes from './Executives.css';
import Modal from "../Modal/Modal";
import Update from '../Update/Update';
import Delete from '../Delete/Delete';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

let arr = [];
let data = [];

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
        index:undefined,
        openUpdateModal:false,
        // refresh:data
    }
    cancelHandler = () => {
        this.setState({ openModal: false })
        this.setState({ openUpdateModal: false })
        this.setState({
            executive: {
                fname: '',
                lname: '',
                dob: '',
                gender: '',
                exp: ''
            }
            
        })
    };
    addFName = (event) => {
        this.setState(prevState => ({
            ...prevState,
            executive: {
                ...prevState.executive,
                fname: event.target.value
            }
        }))
    };
    addLName = (event) => {
        this.setState(prevState => ({
            ...prevState,
            executive: {
                ...prevState.executive,
                lname: event.target.value
            }
        }))
    };
    addDOB = (event) => {
        this.setState(prevState => ({
            ...prevState,
            executive: {
                ...prevState.executive,
                dob: event.target.value
            }
        }))
    };
    addGender = (event) => {
        this.setState(prevState => ({
            ...prevState,
            executive: {
                ...prevState.executive,
                gender: event.target.value
            }
        }))
    };
    addExp = (event) => {
        this.setState(prevState => ({
            ...prevState,
            executive: {
                ...prevState.executive,
                exp: event.target.value
            }
        }))
    };

    addExec = (event) => {
        event.preventDefault();
        const index = this.state.index
        console.log(index)
        arr = [];
        arr.push(this.state.executive.fname);
        arr.push(this.state.executive.lname);
        arr.push(this.state.executive.dob);
        arr.push(this.state.executive.gender);
        arr.push(this.state.executive.exp);
        
        if (index === undefined)
        {
        data.push(arr);
        this.setState({ openModal: false })
        }
        else{
            data[index] = arr
            this.setState({ openUpdateModal: false })
        }
        this.setState( {index: undefined})
        this.setState({ openModal: false })
        this.setState({
            executive: {
                fname: '',
                lname: '',
                dob: '',
                gender: '',
                exp: ''
            }
            
        })
        
    };

    updateExec = (index) =>  {
        this.setState( { index: index});
        this.setState({ openUpdateModal: true});
        this.setState({executive:{
            fname:data[index][0],
            lname:data[index][1],
            dob:data[index][2],
            gender:data[index][3],
            exp:data[index][4],
        }})

    }; 
    deleteExec = (index) =>  {
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

        // window.onbeforeunload=function(){
        //     localStorage.setItem("execData", JSON.stringify(data)); 
        // }
        // window.onload=function(){
        //     const execs = JSON.parse(localStorage.getItem("execData"));
        //     console.log(execs)
        //         data=[...execs];
        //         console.log(data);
        // };

        const columns = [
            "First Name", "Last Name", "DOB", "Gender", "Experience(in years)",
            {
                name: "",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        
                        return (
                            
                            <Update 
                             function = {() => this.updateExec(tableMeta.rowIndex)}
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
                             function = {() => this.deleteExec(tableMeta.rowIndex)}
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
            <div className={classes.Exec}>

                <button className={classes.button} onClick={() =>this.setState({ openModal: true })}>ADD EXECUTIVE</button>
                <Modal open={this.state.openModal}>
                    <input className={classes.ModalInput}  value={this.state.executive.fname} onChange={this.addFName} placeholder='First Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.lname} onChange={this.addLName} placeholder='Last Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.dob} onChange={this.addDOB} placeholder='DOB'></input>
                    <input className={classes.ModalInput} value={this.state.executive.gender} onChange={this.addGender} placeholder='Gender'></input>
                    <input className={classes.ModalInput} value={this.state.executive.exp} onChange={this.addExp} placeholder='Experience(in years)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addExec}>
                        Add
                    </button>
                </Modal>
                <Modal open={this.state.openUpdateModal}>
                    <input className={classes.ModalInput} value={this.state.executive.fname} onChange={this.addFName} placeholder='First Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.lname} onChange={this.addLName} placeholder='Last Name'></input>
                    <input className={classes.ModalInput} value={this.state.executive.dob} onChange={this.addDOB} placeholder='DOB'></input>
                    <input className={classes.ModalInput} value={this.state.executive.gender} onChange={this.addGender} placeholder='Gender'></input>
                    <input className={classes.ModalInput} value={this.state.executive.exp} onChange={this.addExp} placeholder='Experience(in years)'></input>
                    <button className={classes.cancel} type="button" onClick={this.cancelHandler}>
                        Cancel
                    </button>
                    <button className={classes.add} type="button" onClick={this.addExec}>
                        Update
                    </button>
                </Modal>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Sales Executives"}
                    data={data}
                    columns={columns}
                    options={options}

                />
                </MuiThemeProvider>
            </div>
        )
    }
};

export default Executives;
