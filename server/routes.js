const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const router = express.Router()

const data = './server/data/data.json'

router.get('/:theme', (req, res) => {
  console.log('BOOOOOOOO', req.params)
  const theme = req.params.theme

  fs.readFile(data)
    .then((contents) => {
      const parseData = JSON.parse(contents)
      const storyData = parseData.find((currentTheme) => {
        currentTheme.theme === theme
      })
      res.render('create', storyData)
    })
    .catch((err) => {
      res.send(err.message)
    })
})

router.post('/:theme', (req, res) => {
  const theme = req.params.theme
  fs.readFile(data)
    .then((contents) => {
      parseData = JSON.parse(contents)
      const storyData = parseData.find((element) => {
        element.theme === req.params.theme
      })
      console.log('this is the url:', theme)
      //change these to match data json
      const { noun, verb, adjective1, adjective2, animal, word } = req.body

      storyData.noun = noun
      storyData.verb = verb
      storyData.adjective1 = adjective1
      storyData.adjective2 = adjective2
      storyData.word = word
      storyData.animal = animal

      const newData = JSON.stringify(parseData, null, 2)
      console.log(newData)
      fs.writeFile(__dirname + '/data/data.json', newData).then(() => {
        // res.redirect(302, `/story/${theme}`)
        res.send('working redirect :)')
        console.log(newData)
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// router.get('/:theme', (req, res) => {
//   res.render('story')
// })

module.exports = router
