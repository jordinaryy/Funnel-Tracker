const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pool = require('./db') //importing database connection to pool
const app = express()//initializing the express app
const PORT = process.env.PORT || 5000 //set port default to 5000

//importing route files for each section of the API
const usersRoute = require('./routes/users') 
const funnelRoute = require('./routes/funnel')
const surveysRoute = require('./routes/surveys')

//middleware for every request
app.use(cors())
app.use(express.json())

//API routes with their paths
app.use('/api/users', usersRoute)
app.use('/api/funnel', funnelRoute)
app.use('/api/surveys', surveysRoute)


//starting the server and listen to any incoming requets
app.listen(PORT, () => {
  console.log('server running on port ${PORT}')
})