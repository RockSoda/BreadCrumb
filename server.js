const express = require('express')
const app = express()

app.use(express.json())

const root = require('./routes/root')
app.use('/', root)

app.listen(3001, () => console.log('Server Started'))