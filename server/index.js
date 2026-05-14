const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pool = require('./db')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//test route
app.get('/', (req, res) => {
  res.json({ message: 'Funnel Tracker is running!'})
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ message : 'Database connected', time: result.rows[0].now })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log('server running on port ${PORT}')
})