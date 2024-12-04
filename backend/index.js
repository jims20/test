import express from "express"
import mysql from "mysql"

const app= express()

const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "james",
    database: "marketplacee"
})

app.use(express.json())

app.get("/", (reg, res)=>{
    res.json("hello this is the backend")

})

app.get("/shoes", (req, res)=>{
    const q= "SELECT * FROM shoes"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
            return res.json(data)

    })

})

app.post("/shoes", (req, res)=>{
    const q="INSERT INTO shoes (`id`,`prod_name`,`prod_description`,`image`,`price`) VALUES(?)";
    const values = [
        req.body.id,
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price,
    ]
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
                return res.json("Succesfully executed")
        })

})  

app.listen(8800, ()=>{
    console.log("connected to backendss")
})