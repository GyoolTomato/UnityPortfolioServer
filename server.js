const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userTable = {};

app.get('/user', (req, res) => {
    const uid = req.query.uid;

    if (!uid) {
        return res.status(400).json({ error: "uid required" });
    }

    let userData = userTable[uid];

    if (!userData) {
        userData = {
            uid: uid,
            nickname: "NewUser",
            level: 1,
            gold: 1000
        };

        userTable[uid] = userData;
    }

    console.log("GET /user uid =", uid);

    return res.json(userData);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`server running on port ${port}`);
});

app.post('/user/save', (req, res) => {
    const userData = req.body;

    if (!userData || !userData.uid) {
        return res.status(400).json({
            error: "valid userData with uid is required"
        });
    }

    userTable[userData.uid] = userData;

    console.log(`[POST] /user/save uid=${userData.uid}`);

    return res.json({
        success: true,
        savedData: userTable[userData.uid]
    });
});