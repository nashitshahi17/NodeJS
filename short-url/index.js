const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connect');
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');

const app = express();
const PORT = 8001;

// Connect MongoDB
connectMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// API Routes
app.use('/url', urlRoute);
app.use('/',staticRoute)

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({shortId},{$push: {visitHistory:{timestamp: Date.now() }}})
    if(!entry) return res.status(404).json({msg: "Not Found"})
    return res.redirect(entry.redirectURL)
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});