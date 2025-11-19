const mysql = require('mysql')
const express= require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const conn = mysql.createConnection({
    host: "localhost" ,
    database: "watchbox",
    user: "root",
    password: ""
})

app.post('/login',(req,res) => {
    conn.query("SELECT users.UserName , users.Password FROM users WHERE users.UserName =? AND users.Password = ?",(req.body.username,req.body.password),(err,result) => {
        if (err) res.json({ error: err });
        else res.json({ data: result });
      })
    console.log(result)
})

app.listen(8000, () => {
    console.log("Serwer działa na porcie 8000");
  });