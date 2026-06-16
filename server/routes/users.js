const express = require('express')
const router = express.Router() // Router handles requests for the /api/users path

// Import the database connection pool
const pool = require('../db')

// POST /api/users — Create a new user
// Accepts an email in the request body and inserts it into the users table
// Automatically assigns the user to Variant A or B for A/B testing
router.post('/', async (req, res) => {
  const { email } = req.body
  try {
    // Insert new user into the users table
    const result = await pool.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    )
    const newUser = result.rows[0]

    // Randomly assign user to Variant A or B (50/50 split)
    const variant = Math.random() < 0.5 ? 'A' : 'B'

    // Save the variant assignment to the ab_tests table
    await pool.query(
      'INSERT INTO ab_test (user_id, variant) VALUES ($1, $2)',
      [newUser.id, variant]
    )

    // Return the new user record along with their assigned variant
    res.json({ ...newUser, variant })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/users, Retrieves all users
// Returns every user record from the users table
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router