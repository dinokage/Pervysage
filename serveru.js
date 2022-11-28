const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/pages/index.html')
})

app.post('/appointment', (req, res) => {
    res.json(req.body)

})

app.listen(5500, () => {console.log('running')})