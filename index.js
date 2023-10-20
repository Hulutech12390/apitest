const express = require("express");
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

require("./db/config");
const user = require('./db/user');


app.use(cors());
app.use(express.json());



app.post("/register", async(req, resp) => {
    let userss = new user(req.body);
    let result = await userss.save();
    result = result.toObject();
    delete result.password
    resp.send(result)
});

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if(req.body.password && req.body.username){
        let usersss = await user.findOne(req.body).select("-password");
        if(usersss){
            resp.send(usersss);
        }else{
            resp.send("no user found")
        }
    }else{
        resp.send("no user found")
    }
    
})

app.listen(port, () => console.log(`listen ${port}`));