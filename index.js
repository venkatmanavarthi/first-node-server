const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const connectToMongo = require('./db')
const Person = require('./models/Person')

connectToMongo()

const app = express()
const port = 3000

console.log()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + '/public'))
app.use(logger_middleware)

app.get('/', root)
app.get('/json', json_route)


function logger_middleware(req, res, next) {
    console.log(req.method, req.path, req.ip)
    next()
}


function root(req, res) {
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
}

function json_route(req, res) {
    data = { 'key': 'data' }
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        data['key'] = data['key'].toUpperCase()
    }
    res.json(data)
}

app.get('/user', function (req, res, next) {
    req['time'] = new Date().toString()
    next()
}, function (req, res) {
    res.json({ 'time': req.time })
})

app.get('/:word/echo', (req, res) => {
    res.send(req.params.word)
})

app.post('/name', (req, res) => {
    console.log(req.body)
    res.json({ 'name': `${req.body.first} ${req.body.second}` })
})

app.post('/create-new-user', (req, res) => {
    const person = new Person({name: 'venkat', age: 20})
    person.save()
    res.send()
})

app.listen(port, () => {
    console.log("server started on", port)
})
