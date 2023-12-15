//import React, { useState } from 'react';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function Updatetask() {
    const [task , setTask] = useState("")
    const navigate = useNavigate();
    const {id} = useParams();
    async function handleupdate(e){
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5500/update/${id}`, { task });
            setTask("");
            alert("updated the Task ");
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (<div>
        <h3>Update the Task</h3>
        <div className='mt-5 d-flex justify-content-center'>
            <Form onSubmit={handleupdate}>
                <InputGroup size="default">
                    <InputGroup.Text id="inputGroup-sizing-default">Updatetask</InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={e=>setTask(e.target.value)}
                    />
                </InputGroup>
                <button type='submit' className='btn btn-primary mt-3'>UPDATE</button>
            </Form>
        </div>
    </div>);
}

export default Updatetask;