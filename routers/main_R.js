const express = require('express');
const router = express.Router();
const { format } = require('date-fns'); // הוסף את החבילה date-fns

module.exports = router;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", function (req, res) {
    res.render("main", {});
});

// ... כאן נשאר הקוד הקודם שלך

function saveEntry(employeeId, name, id, date) {
    const formattedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const query = `INSERT INTO entry_exit (employee_id, name, id, date, entry_time) VALUES (${employeeId}, '${name}', '${id}', '${date}', '${formattedTime}')`;

    db_pool.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Entry saved successfully');
        }
    });
}

function saveExit(employeeId) {
    const formattedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const query = `UPDATE entry_exit SET exit_time = '${formattedTime}' WHERE employee_id = ${employeeId} AND exit_time IS NULL`;

    db_pool.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Exit saved successfully');
        }
    });
}

router.post('/clockIn', function (req, res) {
    const { name, id } = req.body;
    const date = new Date().toLocaleDateString();

    // שמור את הכניסה במסד הנתונים
    saveEntry(id, name, id, date);

    // עבור הדוגמה, אני משתמש בזמן רנדומלי כזמן הכניסה
    const randomTime = format(new Date(), "HH:mm:ss");

    // אתה יכול לשנות את randomTime לזמן המתקבל מהשרת או לשימוש בזמן אמיתי אחר
    res.json({ date: date, exactTime: randomTime });
});

router.post('/clockOut', function (req, res) {
    const { name, id } = req.body;

    // שמור את היציאה במסד הנתונים
    saveExit(id);

    // עבור הדוגמה, אני משתמש בזמן רנדומלי כזמן היציאה
    const randomTime = format(new Date(), "HH:mm:ss");

    // אתה יכול לשנות את randomTime לזמן המתקבל מהשרת או לשימוש בזמן אמיתי אחר
    res.json({ exactTime: randomTime });
});
