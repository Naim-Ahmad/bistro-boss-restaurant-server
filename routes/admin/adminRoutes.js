const express = require('express')
const router = express.Router()
const {client} = require('../../config/db.config')
const { ObjectId } = require('mongodb')
const verifyToken = require('../../middlewares/verifyToken')

const usersCollection = client.db('bistroBoss').collection('users')

router.put('/makeAdmin/:id', verifyToken, async(req, res) => {
    console.log('make admin');
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const doc = {
            $set: {
                role: 'admin'
            }
        }
        const result = await usersCollection.updateOne(query, doc, {upsert: true})
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router