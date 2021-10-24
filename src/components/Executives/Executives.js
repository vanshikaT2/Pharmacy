import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import classes from './Executives.css';
import Modal from "../Modal/Modal";
import Update from '../Update/Update';
import Delete from '../Delete/Delete';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Table from '../Table/Table';

// let arr = [];
// let data = [];

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
        this.setState({ index: undefined })
        this.setState({ openModal: false, arr: [] })
        this.setState({
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
        this.setState({ index: index });
        this.setState({ openUpdateModal: true });
        this.setState({
            executive: {
                fname: this.state.data[index][0],
                lname: this.state.data[index][1],
                dob: this.state.data[index][2],
                gender: this.state.data[index][3],
                exp: this.state.data[index][4],
            }
        })
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



    // getMuiTheme = () => createTheme({
    //     overrides: {
    //         MUIDataTableHeadCell: {
    //             root: {
    //                 borderColor: "black"
    //             },
    //             data: {
    //                 fontSize: "18px"
    //             }
    //         },
    //         MuiIconButton: {
    //             label: {
    //                 display: "none"
    //             }
    //         },
    //         MuiTablePagination: {
    //             toolbar: {
    //                 display: "none"
    //             }
    //         },
    //         MUIDataTableToolbar: {
    //             root: {
    //                 backgroundColor: "#FFE7E7"
    //             }
    //         },
    //         MuiTypography: {
    //             h6: {
    //                 fontSize: "1.5rem",
    //                 fontFamily: "Noto Sans Mono, monospace"
    //             }
    //         },
    //         MUIDataTableBodyCell: {
    //             root: {
    //                 fontSize: "1rem",
    //                 color: "#4f4e4e"
    //             }
    //         },
    //     }
    // })


    // componentWillUnmount() {
    //     // localStorage.setItem("execData", JSON.stringify(this.state.arr));
    //     console.log('Hellooooooo')
    //     localStorage.setItem("execData", JSON.stringify(this.state.data));
    // }
    componentDidMount() {
        let execs = JSON.parse(localStorage.getItem("execData"));
        console.log(execs)
        let data = execs !== null ? [...execs] : [];
        console.log(data);
        this.setState({ data: data })
    }
    render() {

        // window.onbeforeunload=function(){
        //     localStorage.setItem("execData", JSON.stringify(data)); 
        // }
        // window.onload=function(){
        //     const execs = JSON.parse(localStorage.getItem("execData"));
        //     console.log(execs)
        //         data=execs!==null?[...execs]:[];
        //         console.log(data);
        // };

        const columns = [
            "First Name", "Last Name", "DOB", "Gender", "Experience(in years)", "", ""];
        // {
        //     name: "",
        //     options: {
        //         customBodyRender: (value, tableMeta, updateValue) => {

        //             return (

        //                 <Update
        //                     function={() => this.updateExec(tableMeta.rowIndex)}
        //                 />
        //             );
        //         }
        //     }
        // },
        // {
        //     name: "",
        //     options: {
        //         customBodyRender: (value, tableMeta, updateValue) => {

        //             return (

        //                 <Delete
        //                     function={() => this.deleteExec(tableMeta.rowIndex)}
        //                 />
        //             );
        //         }
        //     }
        // }];

        const options = {
            viewColumns: false,
            print: false,
            download: false
        };
        return (
            <div className={classes.Exec}>

                <button className={classes.button} onClick={() => this.setState({ openModal: true })}>ADD EXECUTIVE</button>
                <Modal open={this.state.openModal}>
                    <input className={classes.ModalInput} value={this.state.executive.fname} onChange={this.addFName} placeholder='First Name'></input>
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
                {/* <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={"Sales Executives"}
                        data={this.state.data}
                        columns={columns}
                        options={options}

                    />
                </MuiThemeProvider> */}
                <Table heading={columns} body={this.state.data} Update={this.updateExec} Delete={this.deleteExec} />
            </div>
        )
    }
};

export default Executives;
