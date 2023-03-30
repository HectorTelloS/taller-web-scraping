const express = require('express')
const { getTravels } = require('../controllers/apiController')

const router = express.Router()



//http://localhost:3000/api/v1/travels
router.get('/travels', getTravels)

module.exports = router