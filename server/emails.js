const { faker } = require('@faker-js/faker')
const pool = require('./db')
//funnel stages in order that the users will progress through
const stages = ['Sign Up', 'Profile Setup', 'First Action', 'Return Visit']

//async seed function used to populate the database with fake user data
const seed = async () => {
  for (let i = 0; i < 30; i++) {
    //looping 30 times to create 30 fake users
    const email = faker.internet.email()
    //generates fake emails addresses using faker


    //inserts the fake user into the users table
    //ON CONFLICT DO NOTHING skips the insert if the email already exists
    const result = await pool.query(
        'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
        [email]
    )
    //below we have random being used to decide how many funnel stages a user completes
    if (result.rows[0]) {
        const user = result.rows[0]
        console.log(`Created user: ${user.email}`)

        const stagesCompleted = Math.floor(Math.random() * stages.length) + 1 
        
        for (let j = 0; j < stagesCompleted; j++) {
            await pool.query(
                'INSERT INTO funnel_events (user_id, stage) VALUES ($1, $2)',
                [user.id, stages[j]]
            )
            console.log(` logged stage: ${stages[j]}`)
        }
    }else {
        //skip an email if it already exists within the database
        console.log(`skip duplicates: ${email}`)
    }
}
pool.end()
console.log('Done.')
}

seed()
    
   