const express = require('express')
const router = express.Router()
const {client} = require('../../config/db.config')
const { ObjectId } = require('mongodb')
const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')

const usersCollection = client.db('bistroBoss').collection('users')

router.get('/isAdmin/:email',verifyToken, async(req, res) => {
    try {
        const decodedEmail = req.decoded?.email;
        const email = req.params.email;
        if(decodedEmail !== email){
            return res.status(403).json({message: 'forbidden access!'})
        }
       const query = {email: req.params.email}
       const userData = await usersCollection.findOne(query)
       const isAdmin = userData?.role === 'admin';
       res.send(isAdmin)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/makeAdmin/:id', verifyToken, verifyAdmin, async(req, res) => {
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