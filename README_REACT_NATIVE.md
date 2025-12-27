# EcoSphere - React Native Mobile App

A unique, glassmorphic mobile app for tracking your carbon footprint, built with React Native and Expo.

## Features

- **Unique Glassmorphic Design** - Beautiful blur effects and gradient overlays throughout
- **Bottom Tab Navigation** - Easy access to main features
- **Real-time Carbon Tracking** - Monitor your daily, weekly, and monthly impact
- **Supabase Integration** - Secure authentication and data storage
- **Smooth Animations** - Native-feeling interactions and transitions

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Copy `.env.example` to `.env` and add your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Start the development server:**
```bash
npm start
```

4. **Run on your device:**
- iOS: Press `i` or scan QR code with Camera app
- Android: Press `a` or scan QR code with Expo Go app
- Web: Press `w`

## Project Structure

```
├── app/
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main tab screens
│   └── _layout.tsx       # Root layout
├── contexts/             # React contexts
├── lib/                  # Supabase client
├── services/             # API services
└── components/           # Reusable components
```

## Unique Design Features

- **Glassmorphism**: Frosted glass effects with BlurView components
- **Gradient Overlays**: Vibrant color combinations throughout
- **Rounded Corners**: Consistent 24-32px border radius
- **Card-based Layout**: Everything organized in beautiful cards
- **Color-coded Features**: Each section has unique gradient colors
- **Smooth Transitions**: Native animations and micro-interactions

## Screens

### Dashboard
- Large hero card showing today's carbon savings
- Quick stats for week and month
- Monthly goal progress tracker
- Quick action buttons

### EcoScan
- Barcode scanning for products
- Carbon footprint analysis
- Product alternatives

### EcoWatt
- Energy consumption tracking
- Appliance monitoring
- Cost calculations

### Leaderboard
- Global rankings
- Friend comparisons
- Achievement showcase

### Profile
- User statistics
- Personal goals
- Settings and preferences

## Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Supabase** - Backend and auth
- **Expo Router** - File-based routing
- **Expo Blur** - Glassmorphism effects
- **Linear Gradient** - Beautiful gradients
- **Vector Icons** - Icon library

## Database

The app uses the same Supabase database schema from the web version. All migrations are already applied.

## Build

To create production builds:

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## License

MIT
