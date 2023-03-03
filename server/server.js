const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const createRouter = require('./create-router')
const storyRouter = require('./story-router')

const server = express()
// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here
server.use('/create', createRouter)
server.use('/story', storyRouter)

// server.use('/theme', router)

server.get('/', (req, res) => {
  fs.readFile(__dirname + '/data/data.json')
    .then((data) => {
      res.render('home', JSON.parse(data))
    })
    .catch((err) => {
      console.log(err.message)
    })
})

module.exports = server
