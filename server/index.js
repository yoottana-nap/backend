const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.process || 5000;
const products = require('./routes/api/products');
const users = require('./routes/api/users');
// Parse body text to json 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// router import form route
app.use('/routes/api/products', products);
app.use('/routes/api/users', users);

app.listen(port, () => {
    console.log(`app listening port : ${port}`);
})