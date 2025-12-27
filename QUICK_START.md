# Quick Start - EcoSphere Mobile

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Make sure your `.env` file has Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the App
```bash
npm start
```

Then scan the QR code:
- **iOS**: Use Camera app
- **Android**: Use Expo Go app

## 📱 App Structure

### Bottom Navigation Tabs

1. **Home** - Dashboard with carbon stats
2. **Scan** - Product scanning (EcoScan)
3. **Items** - Food inventory tracking
4. **Energy** - Energy consumption (EcoWatt)
5. **Profile** - User profile & settings

### Features Working

✅ Login & Register
✅ Dashboard with stats
✅ Product scanning UI
✅ Inventory management
✅ Energy tracking
✅ Profile & achievements
✅ Supabase integration

## 🎨 What's Unique

Every page has a different design:

- **Dashboard**: Green gradients, hero card, quick actions
- **EcoScan**: Purple theme, scanner modal, alternatives
- **Inventory**: Pink-orange theme, expiry tracking, categories
- **EcoWatt**: Orange-red theme, appliance breakdown, tips
- **Profile**: Green theme, stats grid, achievements

## 🔧 Troubleshooting

### App won't start?
```bash
npm start -- --clear
```

### Dependencies broken?
```bash
rm -rf node_modules
npm install
```

### Can't connect on phone?
```bash
npm start --tunnel
```

## 📚 More Info

- **Full setup guide**: `REACT_NATIVE_SETUP.md`
- **Recent fixes**: `FIXES_APPLIED.md`
- **Conversion details**: `CONVERSION_SUMMARY.md`

---

**Ready to go!** Run `npm start` and scan the QR code 🎉
