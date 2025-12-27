# Quick Setup Guide

Follow these steps to get EcoSphere running on your machine.

## Step 1: Install Node.js

Make sure you have Node.js 18 or higher installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org)

## Step 2: Extract and Navigate

Extract the project files and navigate to the directory:
```bash
cd ecosphere-app
```

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages (React, TypeScript, Tailwind CSS, Supabase client, etc.)

## Step 4: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Choose organization and enter:
   - Project name: `ecosphere`
   - Database password: (save this securely)
   - Region: (choose closest to you)
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

## Step 5: Get Supabase Credentials

1. In your Supabase project dashboard, click **"Project Settings"** (gear icon)
2. Go to **"API"** section
3. Copy these two values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (under "Project API keys")

## Step 6: Configure Environment

1. Rename `.env.example` to `.env`
2. Open `.env` file
3. Replace the placeholder values with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## Step 7: Set Up Database

1. In Supabase dashboard, go to **"SQL Editor"**
2. Click **"New Query"**
3. Open the file: `supabase/migrations/20251227083043_create_ecosphere_schema.sql`
4. Copy ALL the contents
5. Paste into the SQL Editor in Supabase
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see "Success. No rows returned"

This creates all the tables, security policies, and sample data.

## Step 8: Start the App

```bash
npm run dev
```

The app will open at: http://localhost:5173

## Step 9: Create an Account

1. Click **"Sign up for free"**
2. Enter your details:
   - Full Name
   - Email
   - Password (at least 6 characters)
   - Confirm Password
   - Daily Carbon Goal (default: 5.0 kg CO₂)
3. Click **"Create Account"**
4. You'll be automatically logged in

## Step 10: Explore the App

You now have access to all features:
- Dashboard with carbon tracking
- Inventory management
- EcoMiles (transportation tracking)
- EcoWatt (energy usage)
- EcoPlate (meal tracking)
- EcoCycle (waste management)
- Badges and achievements
- Shop for eco-products
- Leaderboards
- Community challenges

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## Installing as Mobile App

On your phone:
1. Open the app in Chrome/Safari
2. Look for "Install" or "Add to Home Screen"
3. Follow prompts
4. App will appear on your home screen like a native app

## Troubleshooting

### "Invalid project URL" error
- Check that your `.env` file has the correct Supabase URL
- Make sure there are no extra spaces or quotes

### "Network request failed"
- Verify your internet connection
- Check Supabase project is active (not paused)

### "User already registered" error
- The email is already in use
- Try logging in instead of signing up

### Database tables not found
- Make sure you ran the SQL migration in Step 7
- Check Supabase dashboard > Table Editor to verify tables exist

### Can't log in
- Verify email and password are correct
- Make sure database migration completed successfully
- Check browser console for errors (F12)

## Need Help?

- Check the full `README.md` for detailed information
- Review Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Check browser console (F12) for error messages

## Next Steps

- Add your own data by using the app features
- Customize the theme in `src/index.css`
- Add more features in the `src/pages/` directory
- Deploy to Vercel or Netlify for production use
