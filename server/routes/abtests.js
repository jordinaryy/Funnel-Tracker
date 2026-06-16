// Import Express and create a router instance
const express = require('express')
const router = express.Router() 


const pool = require('../db')

// returns conversion rates for each variant
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        variant,
        COUNT(*) as total_users,
        SUM(CASE WHEN converted = true THEN 1 ELSE 0 END) as conversions,
        ROUND(SUM(CASE WHEN converted = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) as conversion_rate
       FROM ab_test
       GROUP BY variant
       ORDER BY variant`
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const result = await pool.query(
      'UPDATE ab_test SET converted = true WHERE user_id = $1 RETURNING *',
      [userId]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router