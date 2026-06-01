const express = require('express')
const router = express.Router()
const pool = require('../db')

// post a funnel event and will be called every time a user completes the onboarding phase

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

// Get funnel analytics and powers the dashboard chart by counting the users who have reach certain stages
router.get('/analytics', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT stage, COUNT(user_id) as count 
       FROM funnel_events 
       GROUP BY stage 
       ORDER BY count DESC` //orders the stages from most to least users
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router