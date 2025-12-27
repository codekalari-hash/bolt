# EcoSphere React Native - Setup Instructions

## What Changed

Your EcoSphere app has been converted from a React web app to a **React Native mobile app** using Expo. The entire codebase has been rewritten with:

- ✅ **Expo Router** for file-based navigation
- ✅ **Glassmorphic UI** with BlurView components
- ✅ **Linear Gradients** throughout
- ✅ **Unique designs** for every feature page
- ✅ **Same Supabase database** integration
- ✅ **Bottom tab navigation** for main features
- ✅ **Native animations** and interactions

## New Structure

```
app/
├── (auth)/
│   ├── login.tsx           # Beautiful gradient login
│   └── register.tsx        # Gradient registration
├── (tabs)/
│   ├── _layout.tsx         # Tab navigation setup
│   ├── dashboard.tsx       # Main dashboard with stats
│   ├── ecoscan.tsx         # Product scanning (unique design)
│   ├── ecowatt.tsx         # Energy tracking (unique design)
│   ├── leaderboard.tsx     # Rankings (unique design)
│   └── profile.tsx         # User profile (unique design)
└── _layout.tsx             # Root layout with providers
```

## Installation Steps

### 1. Backup Current Files (Optional)

```bash
# Save your current web app
mv package.json package-web.json
mv tsconfig.json tsconfig-web.json
```

### 2. Setup React Native

```bash
# Use the React Native package.json
cp package-rn.json package.json
cp tsconfig-rn.json tsconfig.json

# Install dependencies
npm install

# Or with yarn
yarn install
```

### 3. Configure Environment

Your `.env` file already has the Supabase credentials. Just make sure they're prefixed correctly:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the App

```bash
# Start Expo dev server
npm start

# Or specifically:
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator
npm run web     # Run in browser (for testing)
```

### 5. Test on Your Phone

1. Install **Expo Go** app from App Store or Play Store
2. Run `npm start`
3. Scan the QR code with your phone camera (iOS) or Expo Go app (Android)

## Unique Features Per Page

### Dashboard
- Large gradient hero card with rotating icon
- Weekly and monthly stats in glassmorphic cards
- Monthly goal progress with animated bar
- Quick action buttons with gradient backgrounds

### EcoScan
- Full-screen gradient header
- Search bar with blur effect
- Giant scan button with gradient and shadow
- Product cards showing alternatives with savings
- Modal scanner with corner markers

### EcoWatt
- Energy summary card with gradient icon
- Appliance breakdown with colored progress bars
- Each appliance has unique gradient colors
- Bottom sheet modal for adding entries
- Energy tips section with blur effect

### Leaderboard
- 3D podium display for top 3 users
- Crown on #1 position
- Gold/silver/bronze gradient colors
- Scrollable list of other rankings
- "Your ranking" card with boost button

### Profile
- Large gradient avatar circle
- 4-stat grid with gradient icons
- Achievement badges (locked/unlocked states)
- Settings menu with icon buttons
- Sign out button

## Design System

### Colors
- Primary: `#10b981` (Emerald)
- Secondary: `#06b6d4` (Cyan)
- Accent: `#f59e0b` (Orange)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)

### Gradients
- Auth screens: Emerald → Cyan → Blue
- Dashboard: Emerald → Cyan
- EcoScan: Purple → Cyan
- EcoWatt: Orange → Red
- Leaderboard: Emerald → Cyan
- Profile: Emerald → Cyan

### Border Radius
- Cards: 24px - 32px
- Buttons: 16px - 20px
- Icons: 14px - 24px
- Avatars: 24px - 32px

## Database

The app uses your existing Supabase database with the same schema:
- `profiles` table
- `carbon_logs` table
- `energy_usage` table
- All existing migrations

No database changes needed!

## Building for Production

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build iOS app
eas build --platform ios
```

### Android

```bash
# Build Android app
eas build --platform android
```

## Troubleshooting

### Metro bundler issues
```bash
# Clear cache
npm start -- --clear
```

### Dependency issues
```bash
# Clean install
rm -rf node_modules
npm install
```

### Expo Go not connecting
- Make sure your phone and computer are on the same WiFi
- Try using tunnel mode: `npm start --tunnel`

## Next Steps

1. **Test all features** - Login, scan, track energy, check leaderboard
2. **Customize colors** - Edit the gradient colors in each file
3. **Add real scanning** - Integrate camera with `expo-camera`
4. **Push notifications** - Use `expo-notifications`
5. **Add more features** - EcoPlate, EcoCycle, Community, etc.

## Support

For issues:
- Check [Expo documentation](https://docs.expo.dev)
- Visit [React Native docs](https://reactnative.dev)
- Supabase help at [supabase.com/docs](https://supabase.com/docs)

---

**Your app is now a native mobile app!** 🎉

Run `npm start` and scan the QR code to see it on your phone.
