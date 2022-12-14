const express = require('express')
const router = express.Router()
const watchListController = require('../controllers/watchList')
const { watch } = require('../models/WatchList')

router.get('/', watchListController.getWatchList)


router.post('/addticker/:id', watchListController.addTicker)
//here, in controller get the latest trade from alpaca

router.delete('/deleteticker/:id', watchListController.deleteTicker)

router.put('/updateticker/:id', watchListController.updateTicker)


module.exports = router