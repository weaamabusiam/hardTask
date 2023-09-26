const express = require('express');
const router = express.Router()
module.exports = router;

router.post("/Add", function(req,res){
});
let {first_name,last_name,}=req.body;

let Query="INSERT INTO employees ";
Query += "(first_name,last_name) ";
Query += " VALUES ";
Query += `('${first_name}','${last_name}') `;
console.log("Adding employees" , Query);

db_pool.query(Query, function(err, rows, fields){

    if(err){
        res.status(500).json({message: err})
        // throw err;
    }else{
        res.status(200).json({message: "OK",lastId:rows.insertId});
    }

});

//החזרת תשובה לצד קדמי
