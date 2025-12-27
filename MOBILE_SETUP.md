# EcoSphere Mobile App Setup

This guide will help you run the EcoSphere mobile application on your phone.

## Prerequisites

1. Install Node.js (v16 or higher)
2. Install Expo Go app on your phone:
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## Quick Start

### Step 1: Switch to Mobile Configuration

Run the switch script to configure the project for mobile:

```bash
bash switch-to-mobile.sh
```

Or manually copy the mobile package.json:

```bash
cp package-rn.json package.json
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code in your terminal.

### Step 4: Open on Your Phone

1. Open the Expo Go app on your phone
2. Scan the QR code displayed in your terminal:
   - iOS: Use the Camera app to scan the QR code
   - Android: Use the Expo Go app to scan the QR code
3. Wait for the app to load

## Features

The mobile app includes:
- User authentication (Register/Login)
- Dashboard with carbon footprint tracking
- EcoScan for barcode scanning
- Inventory management
- Energy usage tracking (EcoWatt)
- Profile management
- Leaderboard

## Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Open on Android emulator/device
- `npm run ios` - Open on iOS simulator (macOS only)

## Troubleshooting

### App won't load
- Make sure your phone and computer are on the same Wi-Fi network
- Try restarting the Expo development server
- Clear the Expo Go app cache

### Authentication issues
- Check that the Supabase credentials in `.env` are correct
- Ensure you have internet connection

### Module not found errors
- Delete `node_modules` folder
- Run `npm install` again

## Database

The app uses the same Supabase database as the web version. When you register a new account, sample data will be automatically populated for testing.

## Switching Back to Web

To switch back to the web version:

```bash
bash switch-to-web.sh
```

Or manually restore the web package.json:

```bash
# Backup current package.json if needed
# Then restore your web package.json
```
