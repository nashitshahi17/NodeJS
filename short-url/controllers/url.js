const {nanoid} = require('nanoid')
const URL = require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body = req.body
    if(!body.url) return res.status(400).json({error: "URL is required"})
    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectURL : body.url,
        visitHistory: []
    })

    return res.render('home',{id: shortId})
}


async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId
    const entry = await URL.findOne({shortId})
    return res.json({totalClicks: entry.visitHistory.length})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}