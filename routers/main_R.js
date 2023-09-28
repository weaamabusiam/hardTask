const express = require('express');
const router = express.Router();
module.exports = router;


 router.get("/",function (req,res){
   res.render("main",{});
});

router.post('/add', function (req, res) {
    const { name, firstname, lastname, email } = req.body;
    const query = `INSERT INTO Employees (name, firstname, lastname, email) VALUES ('${name}', '${firstname}', '${lastname}', '${email}')`;
    console.log("Adding Employee", query);
    db_pool.query(query, function(err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK", lastId: rows.insertId });
        }
    });
});


router.post('/delete/:id', function (req, res) {
    const id = req.params.id;
    const query = `DELETE FROM Employees WHERE id = ${id}`;
    db_pool.query(query, function(err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});


router.post('/update/:id', function (req, res) {
    const id = req.params.id;
    const { name, firstname, lastname, email } = req.body;
    const query = `UPDATE Employees SET name = '${name}', firstname = '${firstname}', lastname = '${lastname}', email = '${email}' WHERE id = ${id}`;
    db_pool.query(query, function(err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});

