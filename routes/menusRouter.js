const express = require('express')

const router = express.Router()
const {client} = require('../config/db.config')
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

const menusCollection = client.db('bistroBoss').collection('menus')

router.get('/menus', async (req, res)=>{
    // console.log(req.query);
    const query = {}
    const category = req.query.category
    if(category){
        query.category = category
    }
    const result = await menusCollection.find(query).toArray()
    res.send(result)
})

router.post('/menu', verifyToken, verifyAdmin, async(req, res) => {
    try {
        const menuData = await menusCollection.insertOne(req.body)
        res.send(menuData)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router