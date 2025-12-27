# 🌱 EcoSphere - React Native Mobile App

Your EcoSphere app has been completely transformed into a beautiful, native mobile application with unique designs for every feature.

## ✨ What's Different

Your app now has:

- **Glassmorphic UI** - Frosted glass effects everywhere
- **Unique Page Designs** - Each feature has distinct visual identity
- **Native Navigation** - Bottom tabs with blur effect
- **Gradient Overlays** - Beautiful color combinations
- **Touch Optimized** - Perfect for mobile interactions
- **Same Database** - Uses your existing Supabase setup

## 🎨 Page Designs

### Dashboard
- Hero card with rotating icon animation
- Gradient stats cards (blue, purple, orange)
- Progress bars with smooth fills
- Quick action grid (2x2)

### EcoScan
- Purple-cyan gradient theme
- Full-screen scanner modal
- Product alternatives with savings
- Search with blur backdrop

### EcoWatt
- Orange-red gradient theme
- Appliance breakdown with colored bars
- Energy tips section
- Bottom sheet for adding usage

### Leaderboard
- 3D podium display (top 3)
- Gold/silver/bronze gradients
- Crown icon for #1 rank
- Scrollable rankings

### Profile
- Large circular avatar
- 4-stat grid with icons
- Achievement badges (locked/unlocked)
- Settings menu

## 🚀 Quick Start

### Option 1: Use Helper Script

```bash
# Switch to mobile version
./switch-to-mobile.sh

# Start Expo
npm start
```

### Option 2: Manual Setup

```bash
# Copy React Native config
cp package-rn.json package.json
cp tsconfig-rn.json tsconfig.json

# Install dependencies
npm install

# Start Expo dev server
npm start
```

## 📱 Run on Your Phone

1. **Install Expo Go**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start dev server**
   ```bash
   npm start
   ```

3. **Scan QR code**
   - iOS: Use Camera app
   - Android: Use Expo Go app

## 🎯 Features Implemented

✅ Authentication (Login/Register)
✅ Dashboard with stats
✅ EcoScan (product scanning UI)
✅ EcoWatt (energy tracking)
✅ Leaderboard (rankings)
✅ Profile (user info & settings)
✅ Supabase integration
✅ Bottom tab navigation
✅ Glassmorphism effects
✅ Linear gradients
✅ Smooth animations

## 🎨 Design System

### Colors
- **Primary**: Emerald `#10b981`
- **Secondary**: Cyan `#06b6d4`
- **Accent**: Orange `#f59e0b`
- **Success**: Green `#10b981`
- **Error**: Red `#ef4444`

### Gradients (Each Page is Unique)
- Dashboard: Emerald → Cyan
- EcoScan: Purple → Cyan
- EcoWatt: Orange → Red
- Leaderboard: Emerald → Cyan
- Profile: Emerald → Cyan

### Border Radius
- Small: 16px
- Medium: 20px
- Large: 24px
- XLarge: 32px

## 📂 Project Structure

```
app/
├── index.tsx              # Entry point
├── _layout.tsx            # Root layout
├── (auth)/
│   ├── login.tsx          # Login screen
│   └── register.tsx       # Register screen
└── (tabs)/
    ├── dashboard.tsx      # Main screen
    ├── ecoscan.tsx        # Scanning
    ├── ecowatt.tsx        # Energy
    ├── leaderboard.tsx    # Rankings
    └── profile.tsx        # Profile
```

## 🔧 Configuration Files

- `app.json` - Expo configuration
- `babel.config.js` - Babel setup
- `metro.config.js` - Metro bundler
- `tsconfig-rn.json` - TypeScript config
- `package-rn.json` - Dependencies

## 📚 Documentation

- **Setup Guide**: `REACT_NATIVE_SETUP.md`
- **Conversion Details**: `CONVERSION_SUMMARY.md`
- **This File**: Quick reference

## 🔄 Switch Between Versions

### Go to Mobile
```bash
./switch-to-mobile.sh
npm start
```

### Go back to Web
```bash
./switch-to-web.sh
npm run dev
```

## 🛠️ Development

### Start dev server
```bash
npm start
```

### Clear cache
```bash
npm start -- --clear
```

### Run on specific platform
```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Browser (testing)
```

## 📦 Build for Production

### Setup EAS
```bash
npm install -g eas-cli
eas login
```

### Build iOS
```bash
eas build --platform ios
```

### Build Android
```bash
eas build --platform android
```

## 🗄️ Database

Uses your existing Supabase database:
- ✅ No schema changes needed
- ✅ Same authentication
- ✅ Same RLS policies
- ✅ Same tables

Just make sure `.env` has:
```env
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🎯 Next Steps

1. **Test on phone** - Run `npm start` and scan QR
2. **Customize colors** - Edit gradients in each page
3. **Add features** - EcoPlate, Community, Shop, etc.
4. **Add camera** - Real barcode scanning
5. **Push notifications** - Daily reminders
6. **Offline mode** - Cache data locally

## ❓ Troubleshooting

### Can't connect to dev server
```bash
# Use tunnel mode
npm start --tunnel
```

### Dependencies not working
```bash
# Clean install
rm -rf node_modules
npm install
```

### Metro bundler errors
```bash
# Clear cache
npm start -- --clear
```

## 📖 Learn More

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Expo Router](https://docs.expo.dev/router)

## 🎉 You're All Set!

Your EcoSphere app is now a beautiful, native mobile application with unique designs for every page.

Run `npm start` and see it on your phone! 📱
