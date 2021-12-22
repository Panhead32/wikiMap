const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config/config')
const mainPage = require('./router/router')
const pointActions = require('./router/mapObject')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cors())
app.use('/', mainPage)
app.use('/points', pointActions)

app.listen(config.port || process.env.port, () => {
  console.log(`Server has started on ${config.port || process.env.port}`);
})

