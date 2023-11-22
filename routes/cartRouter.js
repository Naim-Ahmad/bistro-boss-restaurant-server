const express = require('express')

const router = express.Router()

const { ObjectId } = require('mongodb')
const {client} = require('../config/db.config')

const cartCollection = client.db('bistroBoss').collection('cart')


router.get('/cart', async (req, res)=>{
    const result = await cartCollection.find().toArray()
    res.send(result)
})

router.get('/cart/:email', async (req, res)=>{
    const query = {email: req.params.email}
    const result = await cartCollection.find(query).toArray()
    res.send(result)
})

router.post('/cart', async (req, res)=>{
    const result = await cartCollection.insertOne(req.body)
    res.send(result)
})

router.delete('/cart/:id', async (req, res)=>{
    const query = {_id: new ObjectId(req.params.id)}
    const result = await cartCollection.deleteOne(query)
    res.send(result)
})

module.exports = router;