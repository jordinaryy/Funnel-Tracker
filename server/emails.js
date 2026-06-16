const { faker } = require('@faker-js/faker')
const pool = require('./db')
//funnel stages in order that the users will progress through
const stages = ['Sign Up', 'Email Verified', 'Profile Setup', 'First Action', 'Return Visit']
//reasons for not finishing the onboarding flow
const reasons = [
    'Too many steps',
    'Not sure what to do',
    'Just exploring',
    'Will come back later'
]

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

        const variant = Math.random() < 0.5 ? 'A' : 'B'
        await pool.query(
            'INSERT INTO ab_test (user_id, variant) VALUES ($1, $2)',
            [user.id, variant]
        )
        console.log(` assigned variant: ${variant}`)

        const stagesCompleted = Math.floor(Math.random() * stages.length) + 1 
        
        for (let j = 0; j < stagesCompleted; j++) {
            await pool.query(
                'INSERT INTO funnel_events (user_id, stage) VALUES ($1, $2)',
                [user.id, stages[j]]
            )
            console.log(` logged stage: ${stages[j]}`)

        }
        //this allows the users/fake emails to use the survey if they decide not to complete the onboarding process
         if (stagesCompleted < stages.length) {
          const reason = reasons[Math.floor(Math.random() * reasons.length)]
          await pool.query(
            'INSERT INTO survey_responses (user_id, stage, reason) VALUES ($1, $2, $3)',
            [user.id, stages[stagesCompleted], reason]
          )
          console.log(` survey response: ${reason}`)
        } else {
          await pool.query(
            'UPDATE ab_test SET converted = true WHERE user_id = $1',
            [user.id]
          )
          console.log(` marked as converted`)
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
    
   