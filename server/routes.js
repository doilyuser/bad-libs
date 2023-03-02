const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const router = express.Router()

const data = __dirname + '/data/data.json'

router.get('/spooky', (req, res) => {
  res.render('create')
})

router.post('/:theme', (req, res) => {
  fs.readFile(data)
    .then((parseData) => {
      parseData = JSON.parse(data)
      const theme = parseData.find((e) => {
        e.theme === req.params.theme
      })
      const { noun, verb, adjective, word } = req.body

      theme.noun = noun
      theme.verb = verb
      theme.adjective = adjective
      theme.word = word

      const newData = JSON.stringify(parseData, null, 2)

      fs.writeFile(__dirname + '/data/data.json', newData)
    })
    .then(() => {
      res.redirect(302, `/story/${theme}`)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

router.get('/spooky', (req, res) => {
  res.render('story')
})

module.exports = router
