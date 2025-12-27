# EcoSphere - Carbon Tracking Mobile App

A Progressive Web App for tracking your carbon footprint and making sustainable choices.

## Features

- **User Authentication** - Secure email/password registration and login
- **Carbon Tracking** - Monitor daily, weekly, and monthly carbon emissions
- **Food Inventory** - Track food items and expiration dates to reduce waste
- **EcoMiles** - Log transportation and view emissions by mode
- **EcoWatt** - Track energy usage and costs
- **EcoPlate** - Monitor meal carbon footprint
- **EcoCycle** - Log waste and recycling activities
- **Badges & Achievements** - Earn rewards for eco-friendly actions
- **Shop** - Browse and purchase sustainable products
- **Leaderboards** - Compete with other users
- **Community** - Join groups and participate in challenges
- **PWA Support** - Install on mobile devices for offline use

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

### 1. Clone the Repository

Extract the project files to your desired location.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **Project Settings > API**
3. Copy your project URL and anon public key
4. The database schema is already included in the migration file

### 4. Configure Environment Variables

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Database Migrations

The database schema has already been created. If you need to recreate it:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/20251227083043_create_ecosphere_schema.sql`
4. Run the migration

Alternatively, install the Supabase CLI and run:

```bash
supabase db push
```

### 6. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 7. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Project Structure

```
ecosphere-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   └── ui/           # UI components (Button, Card, Input, etc.)
│   ├── contexts/         # React contexts (Auth, Theme)
│   ├── lib/              # Library configurations (Supabase)
│   ├── pages/            # Page components
│   ├── services/         # API and database services
│   └── App.tsx           # Main app component
├── public/               # Static assets
├── supabase/            # Database migrations
└── package.json
```

## Database Schema

The app uses the following main tables:

- **profiles** - User profiles and settings
- **carbon_tracking** - Daily carbon emission records
- **inventory_items** - Food inventory management
- **trips** - Transportation logs
- **energy_usage** - Energy consumption tracking
- **meals** - Meal carbon footprint records
- **waste_actions** - Waste and recycling logs
- **badges** - Achievement badges
- **user_badges** - User earned badges
- **alerts** - User notifications
- **shop_products** - Eco-friendly products
- **community_groups** - User communities
- **challenges** - Community challenges
- **user_challenges** - User challenge participation

All tables have Row Level Security (RLS) enabled to protect user data.

## PWA Installation

The app can be installed as a Progressive Web App:

1. Open the app in a mobile browser
2. Look for the install prompt or "Add to Home Screen" option
3. Follow the prompts to install
4. The app will appear as an icon on your home screen

## Features to Add (Optional)

- Push notifications for expiring items
- Data export/import
- Social sharing of achievements
- Integration with fitness trackers
- Carbon offset marketplace
- AI-powered sustainability tips

## Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon public key

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel settings
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

## Credits

Built with React, TypeScript, Tailwind CSS, and Supabase.
