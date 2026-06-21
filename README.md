# Funnel-Tracker
Full Stack Funnel Analysis Web Tracker

The project I made is a full stack funnel analysis web application that tracks user behavior through an onboarding flow, shows the drop off rates at each stage, and includes A/B testing and an exit survey for those who do not finish the onboarding process.

This project was built as my capstone project for CS 499 at Southern New Hampshire University.

## Live Demo

- **Live App:** [funnel-tracker-app.vercel.app](https://funnel-tracker-app.vercel.app)
- **ePortfolio:** [jordinaryy.github.io](https://jordinaryy.github.io)

## Software Used

**Frontend**
- React
- React Bootstrap
- Chart.js / react-chartjs-2
- Axios

**Backend**
- Node.js
- Express
- PostgreSQL 

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## Features

- An onboarding flow that the user will follow
- Real time funnel analytics dashboard
- Has A/B testing that is randomized and uses conversion rates
- If you exit the onboarding process you will be met with an exit survey 
- Admin dashboard has live charts and metrics pulled from the database

## Database Schema

The application has four tables listed below:

- `users` — stores user email and account creation timestamp
- `funnel_events` — logs each funnel stage a user completes, linked to `users` by foreign key
- `ab_test` — stores each user's assigned A/B variant and conversion status
- `survey_responses` — stores exit survey answers when a user abandons onboarding

All database queries use parameterized queries (`$1`, `$2`, etc.) to prevent SQL injection.

