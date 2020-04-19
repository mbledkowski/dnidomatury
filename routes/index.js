const express = require('express')
const router = express.Router()

const PagesController = require('../controllers/PagesController')

/* Get "/" or "/something" */
router.get('/:unit(miesi%C4%85ce|miesiace|dni|godziny|minuty)?', PagesController.index)

module.exports = router