const express = require('express')
const router = express.Router()
const controller = require('../controllers/rootControl')

//Enable CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


router.get('/:current', controller.getChildren)

module.exports = router