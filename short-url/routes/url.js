const express = require('express')
const router = express.Router()
const { handleGenerateNewShortURL, handleRedirect, handleGetAnalytics }  = require("../controllers/url")

router.post('/',handleGenerateNewShortURL)
router.get('/:shortId',handleRedirect)
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports = router