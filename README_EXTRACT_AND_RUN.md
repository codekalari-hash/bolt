# Extract and Run EcoSphere

## Quick Steps

### 1. Extract the ZIP File

Extract `ecosphere-complete.zip` or `ecosphere-complete.tar.gz` to a folder:

**Windows:**
- Right-click → Extract All

**Mac/Linux:**
```bash
unzip ecosphere-complete.zip
# OR
tar -xzf ecosphere-complete.tar.gz
```

### 2. Navigate to the Folder

```bash
cd ecosphere
```

### 3. Run the Application

**For Web Version:**
```bash
npm install
npm run dev
```

Open browser to: `http://localhost:5173`

**For Mobile Version:**
```bash
bash switch-to-mobile.sh
npm start
```

Install Expo Go on your phone, then scan the QR code.

---

## What's Included

- ✅ Complete source code (web + mobile)
- ✅ Pre-configured Supabase database
- ✅ Authentication system
- ✅ Sample data auto-generation
- ✅ All documentation files

## No Additional Setup Required

The application is ready to run. The `.env` file includes all necessary credentials for the Supabase database.

## First Run

1. **Start the app** (web or mobile)
2. **Click "Register"** to create an account
3. **Enter your details** (name, email, password)
4. **Sample data loads automatically** - You'll see:
   - 30 days of carbon tracking data
   - 5 inventory items
   - Sample trips, meals, and waste actions
   - Energy usage records
   - Alerts and achievements

## Support

See these files for detailed help:
- `HOW_TO_RUN.md` - Complete instructions
- `QUICK_START_GUIDE.txt` - Visual quick start
- `PHONE_APP_QUICKSTART.md` - Mobile setup guide
- `RUN_ON_PHONE.md` - Simple phone instructions

---

**That's it!** The app is ready to use.
