import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { deleteTask ,getallTasks } from '../service/api';
import {  makeStyles,Button } from '@material-ui/core';
import { Table, Row, Col } from 'react-bootstrap';
const Taskrecords = ({Taskrecord}) => {
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
    const [task, setTask] = useState([]);
    const classes = useStyle();
    const deleteData = async (e,id) => {
        const targetSet = e.currentTarget;
        targetSet.innerText='Deleting';
        await deleteTask(id);
        setTimeout(()=>{window.location.reload()},0);
    } 

return (
                    <tr className={classes.trow} key={Taskrecord.id}>
                        <td>{Taskrecord.task}</td>
                        <td>{Taskrecord.day}</td>
                        <td>{Taskrecord.time}</td>
                        <td>{Taskrecord.reminder ? 'Reminder is set': 'Reminder is not set'}</td>
                        <td>
                            <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/edit/${Taskrecord.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={(e) => deleteData(e,Taskrecord.id)}>Delete</Button>
                        </td>
                    </tr>
  )
}

export default Taskrecords;