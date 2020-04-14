const express = require('express')
const router = express.Router()

const PagesController = require('../controllers/PagesController')

/* Get "/" or "/something" */
router.get('/(|:unit)/', PagesController.index)

module.exports = router