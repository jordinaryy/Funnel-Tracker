const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//test route
app.get('/', (req, res) => {
  res.json({ message: 'Funnel Tracker is running!'})
})

app.listen(PORT, () => {
  console.log('server running on port ${PORT}')
})