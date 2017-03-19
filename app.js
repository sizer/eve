const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.status(200).json({'message':'hello'})
})
app.listen(process.env.PORT || 3000)

module.exports = app
