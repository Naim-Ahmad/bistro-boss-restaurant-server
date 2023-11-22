const express = require('express')

const router = express.Router()
const {client} = require('../config/db.config')

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

module.exports = router