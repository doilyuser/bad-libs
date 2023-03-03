const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const router = express.Router()

const data = './server/data/data.json'

router.get('/:theme', (req, res) => {
  const theme = req.params.theme

  fs.readFile(data)
    .then((contents) => {
      const parseData = JSON.parse(contents)
      const storyData = parseData.genres.find(
        (element) => element.theme === theme
      )
      res.render('story', storyData)
    })
    .catch((err) => {
      res.send(err.message)
    })
})

module.exports = router
