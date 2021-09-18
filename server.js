const express = require('express')
const app = express()
const PORT = 3000
const shortId = require('shortid')

let shortUrls = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', { urls: shortUrls })
})

app.post('/shorten-url', async (req, res) => {
    const fullUrl = req.body.fullUrl
    const shortUrl = shortId.generate()
    shortUrls.push({ Full: fullUrl, Short: shortUrl })
    res.redirect('/')
})

app.get('/:short', (req, res) => {
    const shortUrl = req.params.short
    let fullUrl = {}
    shortUrls.forEach((url) => {
        if (url.Short === shortUrl) {
            fullUrl = url
        }
    })
    res.redirect(fullUrl.Full)
    
})

app.listen(PORT)