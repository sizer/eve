const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.status(200).send('hello')
})
app.listen(process.env.PORT || 3000)

module.exports = app
