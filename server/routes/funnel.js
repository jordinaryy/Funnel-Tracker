const express = require('express')
const router = express.Router()
const pool = require('../db')

// Log a funnel event
router.post('/', async (req, res) => {
  const { user_id, stage } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO funnel_events (user_id, stage) VALUES ($1, $2) RETURNING *',
      [user_id, stage]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get funnel analytics
router.get('/analytics', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT stage, COUNT(user_id) as count 
       FROM funnel_events 
       GROUP BY stage 
       ORDER BY count DESC`
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router