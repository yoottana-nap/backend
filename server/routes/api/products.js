const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
// router  get request
router.get('/', async (req, res) => {
    const product = await loadProductCollection();
    res.send(await product.find({}).toArray());
})

// router  post request
router.post('/', async (req, res) => {
    const product = await loadProductCollection();
    await product.insertOne({
        createdAt: new Date(),
        image_banner: req.body.image_banner,
        type: req.body.type,
        name: req.body.name,
        product_title: req.body.product_title,
        price: req.body.price,
        detail: req.body.detail,
        images: req.body.images
    })
    res.status(201).send();
})

// router  delete request
router.delete('/:id', async (req, res) => {
    const product = await loadProductCollection();
    await product.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send("successful");
})

async function loadProductCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://admin:48613244a@ds041496.mlab.com:41496/e-comerce-db', {
        useNewUrlParser: true
    }
    );
    return client.db('e-comerce-db').collection('products');
}

module.exports = router;