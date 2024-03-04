const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_channelfan"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha = req.body.fecha;
    const email = req.body.email;
    const contra = req.body.contra;
    const sexo = req.body.sexo;

    db.query('INSERT INTO user (Nombre_user, Apellido_user, Fecha_user, Email_user, Contra_user, Genero_user) VALUES (?,?,?,?,?,?);',[nombre,apellido,fecha,email,contra,sexo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario registrado con exito!!");
        }
    });
});

app.get("/usuarios",(req,res)=>{
    db.query('SELECT * FROM user',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put("/updateUser",(req,res)=>{
    const id_user = req.body.id_user;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha = req.body.fecha;
    const email = req.body.email;
    const contra = req.body.contra;
    const sexo = req.body.sexo;

    db.query('UPDATE user SET Nombre_user=?, Apellido_user=?, Fecha_user=?, Email_user=?, Contra_user=?, Genero_user=? WHERE Id_user=?;',[nombre,apellido,fecha,email,contra,sexo,id_user],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Usuario actualizado con exito!!");
        }
    });
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})