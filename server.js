const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todo-list"
})

app.get("/",(req,res)=>{
    const sql = "SELECT * FROM taks";
    db.query(sql,(err,data)=>{
        if(err){
            return res.json("Error")
        }
        return res.send(data);
    })
})
app.post('/',(req,res)=>{
    const sql = "INSERT INTO taks (`tasknumber`,`task`) VALUES(?)";
    const VALUES = [
        req.body.tasknumber,
        req.body.task
    ]
    db.query(sql,[VALUES],(err,data)=>{
        if(err){return res.json("error");}
        return res.json(data);
    })
})
app.put('/update/:id',(req,res)=>{
    const sql = `update taks set  task=? where tasknumber=${req.params.id}`;
    const VALUES = [
        req.body.task
    ]
    db.query(sql,[VALUES],(err,data)=>{
        if(err){return res.json("error");}
        return res.json(data);
    })
})
app.delete('/:id',(req,res)=>{
    const sql = `DELETE FROM taks WHERE tasknumber=${req.params.id}`;
    db.query(sql,(err,data)=>{
        if(err){return res.json("error");}
        return res.json(data);
    })
})



app.listen(5500,()=>{
    console.log("server has started");
})