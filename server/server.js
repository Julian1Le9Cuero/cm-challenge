const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json())

const challenge = require('./routes/challenge')
app.use('/challenge', challenge)

const PORT = 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))