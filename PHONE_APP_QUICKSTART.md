# EcoSphere Phone App - Quick Start Guide

Get the EcoSphere app running on your phone in under 5 minutes!

## What You Need

1. A smartphone (iPhone or Android)
2. Your computer with this project
3. Both devices on the same Wi-Fi network

## Installation Steps

### 1️⃣ Install Expo Go on Your Phone

**iPhone Users:**
- Open App Store
- Search for "Expo Go"
- Install the app

**Android Users:**
- Open Google Play Store
- Search for "Expo Go"
- Install the app

### 2️⃣ Set Up the Project (On Your Computer)

Open terminal in the project folder and run:

```bash
bash switch-to-mobile.sh
```

Wait for it to complete. This configures everything you need.

### 3️⃣ Start the Development Server

```bash
npm start
```

You'll see:
- A QR code in your terminal
- A metro bundler interface
- Instructions on the screen

### 4️⃣ Open on Your Phone

**iPhone:**
1. Open the default Camera app
2. Point at the QR code on your screen
3. Tap the notification banner
4. App will open in Expo Go

**Android:**
1. Open Expo Go app
2. Tap "Scan QR code"
3. Point at the QR code on your screen
4. App will load automatically

## First Time Using the App

1. **Create Account**: Register with email and password
2. **Sample Data**: Your account will be populated with sample data automatically
3. **Explore**: Navigate using the bottom tab bar

## App Features

### 🏠 Dashboard
- View your daily carbon savings
- Track weekly and monthly progress
- See your environmental impact

### 📱 EcoScan
- Scan product barcodes
- Check carbon footprint
- Find eco-friendly alternatives

### 📦 Inventory
- Manage your items
- Track expiry dates
- Reduce food waste

### ⚡ EcoWatt
- Monitor energy usage
- Track appliance consumption
- Get energy-saving tips

### 👤 Profile
- View achievements
- Check statistics
- Manage settings

### 🏆 Leaderboard
- See your ranking
- Compare with others
- Stay motivated

## Troubleshooting

### ❌ "Unable to connect to development server"
**Solution:** Make sure your phone and computer are on the same Wi-Fi network

### ❌ QR code won't scan
**Solution:**
- Use the manual URL option in Expo Go
- Type the URL shown in your terminal

### ❌ App crashes on startup
**Solution:**
```bash
# Clear everything and reinstall
rm -rf node_modules
bash switch-to-mobile.sh
npm start
```

### ❌ "Expo Go" not found error
**Solution:** Make sure Expo Go app is actually installed on your phone

## Making Changes

While the dev server is running:
- Edit any file in the `app/` folder
- Save your changes
- App will automatically reload on your phone
- No need to restart!

## Switching Back to Web

When you want to run the web version:

```bash
bash switch-to-web.sh
npm install
npm run dev
```

## Pro Tips

💡 **Shake your phone** while app is open to access developer menu

💡 **Pull down** on most screens to refresh data

💡 **Check terminal** for error messages if something doesn't work

💡 **Use headphones** - Some errors give audio feedback

## Common Questions

**Q: Do I need to be a developer to use this?**
A: No! Just follow the steps above.

**Q: Will this work on my phone?**
A: Yes! Works on any iPhone (iOS 13+) or Android (5.0+)

**Q: Is my data safe?**
A: Yes! It's stored securely in Supabase with authentication.

**Q: Can I use this without Wi-Fi?**
A: After initial load, the app works offline. New installs need Wi-Fi.

**Q: How do I update the app?**
A: Just save changes in the code - it updates automatically!

## Need More Help?

- Read `MOBILE_SETUP.md` for detailed documentation
- Check `START_MOBILE.txt` for quick reference
- Look at terminal output for error messages

## Project Structure

```
app/
├── (auth)/          # Login and register screens
├── (tabs)/          # Main app screens (dashboard, scan, etc.)
├── _layout.tsx      # Root layout with auth & theme
└── index.tsx        # App entry point

contexts/            # React contexts (auth, theme)
lib/                # Supabase client setup
services/           # Database functions
```

## Environment

The app automatically uses:
- Supabase database (same as web version)
- Sample data generation on signup
- Secure authentication
- Real-time updates

---

**That's it!** You're now running a full-featured environmental tracking app on your phone.

Enjoy tracking your eco-friendly journey! 🌱
