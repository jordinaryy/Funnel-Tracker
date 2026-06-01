const express = require('express')
const router = express.Router()
const pool = require('../db')

// Creating a new user
router.post('/', async (req, res) => {
  const { email } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all users and will return user records from the user table
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router