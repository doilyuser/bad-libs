const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const router = express.Router()

const data = __dirname + '/data/data.json'

router.get('/:theme', (req, res) => {
  res.render('create')
})

router.post('/:theme', (req, res) => {
  fs.readFile(data)
    .then((parseData) => {
      parseData = JSON.parse(data)
      const theme = parseData.find((e) => {
        e.theme === req.params.theme
      })

      //change these to match data json
      const { noun, verb, adjective, word } = req.body

      theme.noun = noun
      theme.verb = verb
      theme.adjective = adjective
      theme.word = word

      const newData = JSON.stringify(parseData, null, 2)

      fs.writeFile(__dirname + '/data/data.json', newData)
    })
    .then(() => {
      // res.redirect(302, `/story/${theme}`)
      res.send('working redirect :)')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// router.get('/:theme', (req, res) => {
//   res.render('story')
// })

module.exports = router
