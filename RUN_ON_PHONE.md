# Run EcoSphere on Your Phone

Follow these simple steps to run the EcoSphere app on your phone.

## Step 1: Install Expo Go App

First, install the Expo Go app on your phone:

**For iPhone:**
1. Open the App Store
2. Search for "Expo Go"
3. Download and install it

**For Android:**
1. Open the Google Play Store
2. Search for "Expo Go"
3. Download and install it

## Step 2: Switch to Mobile Mode

Open your terminal in the project folder and run:

```bash
bash switch-to-mobile.sh
```

This will:
- Configure the project for mobile development
- Install all required packages
- Set up the React Native environment

## Step 3: Start the App

In your terminal, run:

```bash
npm start
```

You'll see a QR code appear in your terminal.

## Step 4: Open on Your Phone

**For iPhone:**
1. Open the Camera app
2. Point it at the QR code on your computer screen
3. Tap the notification that appears
4. Wait for the app to load in Expo Go

**For Android:**
1. Open the Expo Go app
2. Tap "Scan QR code"
3. Point your camera at the QR code on your computer screen
4. Wait for the app to load

## Important Notes

- **Same Network**: Make sure your phone and computer are connected to the same Wi-Fi network
- **First Load**: The first time you open the app, it may take 1-2 minutes to load
- **Reload**: If you make changes to the code, the app will automatically reload

## Using the App

1. **Register**: Create a new account on the login screen
2. **Explore**: Sample data will be automatically loaded so you can try all features
3. **Navigate**: Use the bottom navigation bar to switch between screens

## Features Available on Mobile

- Dashboard with carbon tracking
- Product scanning (EcoScan)
- Inventory management
- Energy usage tracking (EcoWatt)
- Profile and settings
- Leaderboard

## Troubleshooting

### App Won't Load
- Check that your phone and computer are on the same Wi-Fi
- Try restarting the development server (press Ctrl+C, then run `npm start` again)
- Restart the Expo Go app on your phone

### "Something went wrong" Error
- Make sure you ran `bash switch-to-mobile.sh` first
- Delete the `node_modules` folder and run `npm install` again

### Can't Scan QR Code
- Try typing the URL shown in the terminal manually in the Expo Go app
- Make sure your camera has permission to access the camera

## Switch Back to Web Version

When you want to run the web version again:

```bash
bash switch-to-web.sh
npm install
npm run dev
```

## Need Help?

Check the detailed guide in `MOBILE_SETUP.md` for more information.
