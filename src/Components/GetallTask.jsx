import React, { useEffect, useState } from 'react';
import {  TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from '@material-ui/core';
import { Typography,FormLabel, TablePagination, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { deleteTask ,getallTasks } from '../service/api';
import { Link } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import Taskrecords from './Taskrecords';

const GetallTask = () => {
    const classes = useStyle();
    const [task, setTask] = useState([]);
    const [reminder, setReminder] = useState([]);
    const [dataPage, setDataPage] = useState(0);
    const [spinner, setSpinner] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
        const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 2));
        setPage(0);
    };
    useEffect(() => {
        getTasks();
        setPage(0);
    },[dataPage])
 
    const getTasks = async () =>{
        const response = await getallTasks();
        setTask(response.data);
        setSpinner(false);
    }

    let listContent;
    let count=0
    if (spinner) {
        listContent = <tr><td colSpan='10'>Loading...</td></tr>//<div className="list-msg"><Spinner/></div>;
    }
    else {
        count = task.length;
        //  alert(count)
        if (count > 0) {
            listContent = task.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((taskc) => (<Taskrecords Taskrecord={taskc} />))
        }
        else {
            listContent = <tr><td colSpan='9'><h3>No Task Card Found!!</h3></td></tr>
        }
    }
    return (
       <><Typography variant="h5"><center>All Task Card </center></Typography>
        <div className='container mt-5' >
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                        <h4>Task Cards
                            <Link to={'/add'} className="btn btn-primary btn-sm float-end">Add Task Card</Link>
                        </h4>
                        </div>
                        <Table
                            striped
                            bordered
                            responsive
                            className='table-sm text-center'>
                            <thead className={classes.thead}>
                                <tr className={classes.th}>
                                    <th>Task Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Reminder</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                listContent
                            }
                            </tbody>
                             </Table>
                            <TablePagination
                                            rowsPerPageOptions={[0]}
                                            component="div"
                                            count={count}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                        
                    </div>
                </div>
            </div>
        </div></> 
    )
}

export default GetallTask;
const Ptags =  styled('p')`
font-size:10px;
`
const useStyle = makeStyles({
    table: {
        width: '80%',
        margin: '50px 100px 100px 140px',
    },
    thead:{
        '& > *':{
            background: '#000000',
            color:'#FFFFFF',
            fontSize: '16px'
        }
    },
    trow:{
        '& > *':{
            fontSize: '16px'
        }
    }
})