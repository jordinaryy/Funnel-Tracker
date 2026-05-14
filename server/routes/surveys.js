const express = require('express')
const router = express.Router()
const pool = require('../db')

// Save a survey response
router.post('/', async (req, res) => {
  const { user_id, stage, reason } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO survey_responses (user_id, stage, reason) VALUES ($1, $2, $3) RETURNING *',
      [user_id, stage, reason]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all survey responses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT stage, reason, COUNT(*) as count 
       FROM survey_responses 
       GROUP BY stage, reason 
       ORDER BY count DESC`
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router