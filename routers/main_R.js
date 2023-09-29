const express = require('express');
const router = express.Router();
module.exports = router;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/",function (req,res){
    res.render("main",{});
});

function saveEntry(employeeId, name, id, date) {
    const currentTime = new Date().toISOString();
    const query = `INSERT INTO entry_exit (employee_id, name, id, date, entry_time) VALUES (${employeeId}, '${name}', '${id}', '${date}', '${currentTime}')`;

    db_pool.query(query, function(err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Entry saved successfully');
        }
    });
}

function saveExit(employeeId) {
    const currentTime = new Date().toISOString();
    const query = `UPDATE entry_exit SET exit_time = '${currentTime}' WHERE employee_id = ${employeeId} AND exit_time IS NULL`;

    db_pool.query(query, function(err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Exit saved successfully');
        }
    });
}

router.get('/entry-exit', function(req, res) {
    const selectQuery = 'SELECT * FROM employees';

    db_pool.query(selectQuery, function(err, employees, fields) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('entry-exit', { employees });
        }
    });
});

router.get('/employees-management', function(req, res) {
    const selectQuery = 'SELECT * FROM employees';

    db_pool.query(selectQuery, function(err, employees, fields) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('employees-management', { employees });
        }
    });
});

router.post('/employees-management/add', function(req, res) {
    const { first_name, last_name } = req.body;
    const insertQuery = `INSERT INTO employees (first_name, last_name) VALUES ('${first_name}', '${last_name}')`;

    db_pool.query(insertQuery, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/employees-management');
        }
    });
});

router.post('/employees-management/update', function(req, res) {
    const { employee_id, first_name, last_name } = req.body;
    const updateQuery = `UPDATE employees SET first_name = '${first_name}', last_name = '${last_name}' WHERE employee_id = ${employee_id}`;

    db_pool.query(updateQuery, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/employees-management');
        }
    });
});

router.post('/employees-management/delete', function(req, res) {
    const { employee_id } = req.body;
    const deleteQuery = `DELETE FROM employees WHERE employee_id = ${employee_id}`;

    db_pool.query(deleteQuery, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/employees-management');
        }
    });
});

router.get("/getEmployees", (req, res) => {
    const query = "SELECT * FROM employees";
    db_pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "שגיאה בשאלה למסד נתונים" });
        } else {
            res.json(results);
        }
    });
});

router.post("/addEmployee", (req, res) => {
    const { name, id, date, entry, exit } = req.body;
    const query = `INSERT INTO employees (name, id, date, entry, exit) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, id, date, entry, exit];

    db_pool.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "שגיאה בהוספת העובד למסד נתונים" });
        } else {
            res.json({ message: "העובד נוסף בהצלחה" });
        }
    });
});

router.put("/updateEmployee/:id", (req, res) => {
    const id = req.params.id;
    const { name, date, entry, exit } = req.body;
    const query = `UPDATE employees SET name = ?, date = ?, entry = ?, exit = ? WHERE id = ?`;
    const values = [name, date, entry, exit, id];

    db_pool.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "שגיאה בעדכון פרטי העובד במסד נתונים" });
        } else {
            res.json({ message: "פרטי העובד עודכנו בהצלחה" });
        }
    });
});

router.delete("/deleteEmployee/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM employees WHERE id = ?";
    const values = [id];

    db_pool.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "שגיאה במחיקת העובד ממסד הנתונים" });
        } else {
            res.json({ message: "העובד נמחק בהצלחה" });
        }
    });
});

module.exports = router;
