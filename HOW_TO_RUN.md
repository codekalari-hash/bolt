# How to Run EcoSphere from ZIP File

This guide will help you extract and run the EcoSphere application.

## Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- A code editor (VS Code recommended)
- For mobile: Expo Go app on your phone

## Step 1: Extract the ZIP File

1. Locate the `ecosphere-complete.zip` file
2. Extract it to a folder on your computer
3. Open terminal/command prompt in the extracted folder

## Step 2: Install Dependencies

### For Web Version (Default)

```bash
npm install
```

### For Mobile Version

```bash
bash switch-to-mobile.sh
```

This will automatically configure the project for mobile and install dependencies.

## Step 3: Run the Application

### Option A: Run Web Version

```bash
npm run dev
```

Then open your browser to: http://localhost:5173

### Option B: Run Mobile Version on Your Phone

**First time setup:**
```bash
bash switch-to-mobile.sh
```

**Start the app:**
```bash
npm start
```

**On your phone:**
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code shown in terminal
   - iPhone: Use Camera app
   - Android: Use Expo Go app's scanner
3. App will load on your phone

**Important:** Phone and computer must be on same Wi-Fi network

## Step 4: Create an Account

1. When the app opens, you'll see the login screen
2. Click/tap "Sign Up" or "Register"
3. Enter your details:
   - Name
   - Email
   - Password (minimum 6 characters)
4. Submit the form
5. Sample data will be automatically added to your account

## Environment Variables (Already Configured)

The `.env` file is already included with Supabase credentials:

```
VITE_SUPABASE_URL=https://qaxrqbeqvrhtngeedrso.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

For mobile:
```
EXPO_PUBLIC_SUPABASE_URL=https://gmpfbcwwjraakccobkpm.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

These are pre-configured and ready to use.

## Project Structure

```
ecosphere/
├── src/                    # Web app source code
│   ├── pages/             # Web pages
│   ├── components/        # UI components
│   └── contexts/          # Auth & theme
├── app/                   # Mobile app source code
│   ├── (auth)/            # Login/register
│   └── (tabs)/            # Main screens
├── lib/                   # Supabase client
├── services/              # Database functions
├── package.json           # Web dependencies
├── package-rn.json        # Mobile dependencies
└── .env                   # Environment variables
```

## Available Commands

### Web Version
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Mobile Version
- `npm start` - Start Expo dev server
- `npm run android` - Open on Android device
- `npm run ios` - Open on iOS simulator (macOS only)

### Switch Between Versions
- `bash switch-to-mobile.sh` - Configure for mobile
- `bash switch-to-web.sh` - Configure for web

## Features

### Web Application
- Responsive design works on desktop and mobile browsers
- Dashboard with carbon tracking
- Product scanning simulation
- Inventory management
- Energy tracking
- Profile and settings
- Leaderboard
- Dark mode support

### Mobile Application
- Native mobile experience
- All web features
- Optimized touch interface
- Pull-to-refresh
- Native navigation

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules
npm install
```

### Web app won't start
```bash
# Make sure you're in web mode
bash switch-to-web.sh
npm install
npm run dev
```

### Mobile app won't connect
- Verify phone and computer are on same Wi-Fi
- Try restarting: Press Ctrl+C, then `npm start`
- Check firewall isn't blocking port 8081

### Build errors
```bash
npm run build
```
Check terminal output for specific errors

### Database connection issues
- Check `.env` file exists
- Verify Supabase URLs are correct
- Check internet connection

## Quick Start Summary

**For Web:**
```bash
npm install
npm run dev
# Open http://localhost:5173
```

**For Mobile:**
```bash
bash switch-to-mobile.sh
npm start
# Scan QR code with Expo Go app
```

## First Time Using the App

1. **Register**: Create a new account
2. **Explore Dashboard**: View sample data automatically loaded
3. **Try Features**:
   - Track carbon footprint
   - Manage inventory items
   - Monitor energy usage
   - Check leaderboard
4. **Customize**: Update profile and settings

## Database

The application uses Supabase (PostgreSQL):
- Authentication built-in
- Sample data auto-populated on signup
- Real-time updates
- Secure row-level security

## Support & Documentation

- `README.md` - Project overview
- `PHONE_APP_QUICKSTART.md` - Mobile app guide
- `MOBILE_SETUP.md` - Detailed mobile setup
- `RUN_ON_PHONE.md` - Simple phone instructions
- `START_MOBILE.txt` - Quick reference

## Tips

💡 **Web App**: Works in any modern browser (Chrome, Firefox, Safari, Edge)

💡 **Mobile App**: First load takes 1-2 minutes, then it's fast

💡 **Data Persistence**: Your data is saved automatically to Supabase

💡 **Development**: Code changes auto-reload in both web and mobile

💡 **Production**: Run `npm run build` for optimized web version

---

That's it! You're ready to run EcoSphere. Enjoy tracking your environmental impact! 🌱
