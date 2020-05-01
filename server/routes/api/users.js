const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.status(200).send(await users.find().toArray());
})

// Register 
router.post('/Register', async (req, res) => {
    const { first_name, last_name, email, password, telephone, order } = req.body;
    const users = await loadUsersCollection();
    bcrypt.hash(password, 10, (err, hash) => {
        users.insertOne({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hash,
            telephone: telephone,
            order: order,
        })
    })
    res.status(201).send("successfully");
})

// Login
router.post('/Login', async (req, res) => {
    const users = await loadUsersCollection();
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        res.send("username and password error");
    } else {
        users.find({ 'email': email }).toArray((err, docs) => {
            if (docs.length == 0) {
                res.status(400).send("bad request");
            } else {
                const isCorrect = bcrypt.compareSync(password, docs[0].password)
                if (isCorrect) {
                    res.status(200).send(docs[0]);
                } else {
                    res.status(404).send("Please check for username and password");
                }
            }
        });
    }
});


// Added Items order user
router.post('/addOrder', async (req, res) => {
    const { first_name, orders } = req.body;
    const users = await loadUsersCollection();
    let newItem = [];
    let findUser = { 'first_name': first_name };
    if (first_name === undefined || orders === undefined) {
        res.status(400).send("Bad request");
    } else {
        users.find(findUser).toArray(function (err, result) {
            if (err) {
                res.status(400).send("Bad request");
            }
            console.log(result);
            console.log(result[0].order.length);
            if (result[0].order.length > 0) {
                result[0].order.map((item, index) => {
                    newItem.push(item);
                    if (!index) {
                        newItem.push(orders);
                    }
                })
            } else {
                newItem.push(orders);
            }
            users.updateOne(findUser, { $set: { "order": newItem } }, function (err, result) {
                res.status(201).send(result);
            })
        })
    }
})

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://admin:48613244a@ds041496.mlab.com:41496/e-comerce-db', {
        useNewUrlParser: true
    }
    );
    return client.db('e-comerce-db').collection('users');
}

module.exports = router;