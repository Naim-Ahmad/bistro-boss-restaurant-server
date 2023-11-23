const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')
const {client} = require('../config/db.config')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.use(express.json())

const usersCollection = client.db('bistroBoss').collection('users')

router.get('/users', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const result = await usersCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/user', async(req, res) => {
    try {
        const query = {}
        if(req.body.email){
            query.email = req.body.email
        }
        console.log(query, req.body);
        const isExist = await usersCollection.findOne(query)
        if(isExist){
            return res.send({message: "user already exists", insertedId: null})
        }
        const result = await usersCollection.insertOne(req.body)
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/user/:id', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const result = await usersCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;