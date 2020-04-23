const express = require('express')
const router = express.Router()

const PagesController = require('../controllers/PagesController')

/* Get "/" or "/something" */
router.get('/:unit(miesi%C4%85ce|miesiace|dni|godziny|minuty)?/:year(2020|2021|2022|2023|2024)?', PagesController.index)

module.exports = router