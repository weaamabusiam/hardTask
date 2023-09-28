const express = require('express');
const router = express.Router();
module.exports = router;


app.get("/",(req, res) => {
    res.sendFile("./Views/main.html", {root: __dirname});
});
app.get("/List",(req, res) => {
    let data=AllData;
    for(let k in data){
        data[k].idxOnServer=k;
    }

    res.send(data).json();
});
app.post("/Add",(req, res) => {
    let line={};
    line.name = req.body.name;
    line.id = req.body.id;
    line.email = req.body.email;
    AllData.push(line);
    console.log(req.body);
    res.send("Ready to Add EndPoint");
});
app.post("/Add2",(req, res) => {
    let line={};
    line.name = req.body.name;
    line.id = req.body.id;
    line.email = req.body.email;
    AllData.push(line);
    line={};
    line.name = req.body.name2;
    line.id = req.body.id2;
    line.email = req.body.email;
    AllData.push(line);
    res.send("Ready to Add EndPoint");
});
app.post("/Delete",(req, res) => {
    let idx= req.body.idx;
    console.log("del",idx);
    AllData.splice(Number(idx),1);
    res.send("Ready to Delete");
});
app.post("/Update",(req, res) => {
    let idx=req.body.idx;
    AllData[idx].name = req.body.name;
    AllData[idx].id = req.body.id;
    AllData[idx].email = req.body.email;
    res.send("updated");
});

//------------------------------------------------
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

