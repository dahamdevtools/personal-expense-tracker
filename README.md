# Personal Expense Tracker

A simple web app to track your personal income and expenses. Built as a learning project with Next.js and MySQL.

**Live demo:** [dahamdevtools-personal-expense-tracker.vercel.app](https://dahamdevtools-personal-expense-tracker.vercel.app/)

You can try it right away using the demo link above, or set it up locally by following the steps below.

## Features

- User signup and login with secure, hashed passwords
- Add, edit, and delete expenses and income entries
- Organize entries into custom categories
- Dashboard with a summary of total income, expenses, and balance
- Set a preferred currency per user
- Responsive layout that works on both desktop and mobile

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Database:** MySQL
- **Auth:** JWT sessions (`jose`) with `bcrypt` for password hashing
- **Styling:** Tailwind CSS with shadcn/ui components
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MySQL database (local install or a hosted service like PlanetScale, Railway, etc.)

### 1. Clone the repository

```bash
git clone https://github.com/dahamdevtools/personal-expense-tracker.git
cd personal-expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Run the SQL script in `database/schema.sql` against your MySQL server. This creates the `expense_tracker` schema along with the `users`, `categories`, `expenses`, and `income` tables.

```bash
mysql -u your_username -p < database/schema.sql
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=expense_tracker

JWT_SECRET=a_long_random_secret_string
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Create an account through the signup page to get started.

## Project Structure

```
app/
  (auth)/          Login and signup pages
  (dashboard)/     Dashboard, expenses, income, categories, profile pages
  api/              API routes for auth, expenses, income, and categories
components/         Reusable UI components and modals
lib/                Database connection and auth helpers
database/           SQL schema
types/              Shared TypeScript types
```

## Notes

This project was built for learning purposes, so parts of it are intentionally simple. Feel free to fork it, poke around the code, or use it as a starting point for your own project.

## License

This project is open source and available for anyone to use or learn from.
