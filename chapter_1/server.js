///


const express = require("express");

const app = express();
const PORT = 8181

app.get("/user", (req, res)=>{
    res.send(`<h1>Html code<h1/>`)
    console.log("home page");
})


app.listen(PORT, (req, res) => {
    console.log("Server started on ", PORT);
})
// MiddleWare

// app.use(express.json())
// // website endpoint
// app.get("/", (req, res)=>{
//     console.log("This is for / endpoint");
//     res.send(`<body><p> Users : ${data}</p></body>`);
//     // res.status(200);
// })

// // api endpoint
// app.get("/api/data", (req, res) => {
//     console.log("This one is for sending data")
//     res.send(data)
// })

// app.post("/api/data", (req, res) => {
//     console.log("This is for adding users - POST Method");
//     const entry = req.body;
//     console.log(entry.name);
//     data.push(entry.name);


// })

// app.listen(PORT, () => console.log("Server Started"));