import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Todolist() {
    const [tasks , setTasks] = useState([])
    const [task,setTask] = useState("");
    const [tasknumber,setTasknumber] = useState("");
    useEffect(()=>{
        axios.get('http://localhost:5500/')
        .then(res => setTasks(res.data))
        .catch(err => console.log(err));
    })
    async function handlesubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5500/', { tasknumber, task });
            setTask("");
            setTasknumber("");
            alert("Task is saved");
        } catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async (id) =>{
        try{
            await axios.delete('http://localhost:5500/'+id)
            alert("Task is Deleted")
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

    return (<div className='container-fluid mt-5'>
        <h3>TODO-LIST</h3>
        <div className='d-flex justify-content-center'>
            <Form onSubmit={handlesubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Task-Number and Task</InputGroup.Text>
                    <Form.Control aria-label="Task-Number" placeholder='Enter task-number'onChange={e=>setTasknumber(e.target.value)} />
                    <Form.Control aria-label="Task" placeholder='Enter task' onChange={e=>setTask(e.target.value)}/>
                </InputGroup>
                <Button type="submit">Add the Task</Button>
            </Form>
        </div>
        <div>
        <Table striped bordered hover className='mt-5'>
            <thead>
                <tr>
                <th>No.</th>
                <th>Task</th>
                </tr>
            </thead>
            <tbody>
               {tasks.map((data, i) => (
                            <tr key={i}>
                                <td>{data.tasknumber}.</td>
                                <td className='d-flex justify-content-between'>
                                    {data.task} 
                                    <div>
                                        <Link to={`update/${data.tasknumber}`} className='btn btn-success'>UPDATE</Link>
                                        <button className='btn btn-danger mx-3' onClick={e => handleDelete(data.tasknumber)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                            ))}
            </tbody>
            </Table>
        </div>
    </div>);
}

export default Todolist;