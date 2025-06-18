const express = require("express");
const mysql = require("mysql2");
const app = express();
const port =4000;

app.listen(port,()=>{
    console.log("i am listening");
})
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",  // Use MYSQL_HOST from env, fallback to localhost
    user: process.env.MYSQL_USER || "root",      // Use MYSQL_USER from env, fallback to root
    password: process.env.MYSQL_PASSWORD || "1234",  // Use MYSQL_PASSWORD from env, fallback to rootpassword
    database: process.env.MYSQL_DB || "stuffmama"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database successfully!");
    }
});


app.post("/stuffmama",(req,res)=>{
    let {email,password} = req.body;
    console.log(password);
    res.send(`hey ${email}`);
})

app.get("/stuffmamalogin",(req,res)=>{
    res.render("login.ejs");       
});
app.post("/stuffmamalogin",(req,res)=>{
    let {email:formemail,password:formpassword} = req.body;
    let q = `select password from users where email =?;`

    try{
        connection.query(q,[formemail],(err,result)=>{
            if(err) throw err;
            let storedpassword = result[0].password;
            if(storedpassword!=formpassword){
                res.send("invalid credentials")
            }else{
                res.send("valid credentials")
            }
        })
    }catch(err){
        console.log(err);
    }
});
app.get("/stuffmama/signin",(req,res)=>{
    res.render("signin.ejs");
})
app.post("/stuffmama/signin",(req,res)=>{
    let{name,email,password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    
    let q = `insert into users(name,email,password) values(?,?,?);`
    try{
    connection.query(q,[name,email,password],(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render("")
    })

    }catch(err){
        console.log(err);

    }
})
app.get("/stuffmama/forgotpassword",(req,res)=>{
    res.render("forgotpassword.ejs");
})



