#!/bin/bash

echo "🔄 Switching to React Native version..."

# Backup web files
if [ -f "package.json" ] && ! [ -f "package-web.json" ]; then
    echo "📦 Backing up web package.json..."
    cp package.json package-web.json
fi

if [ -f "tsconfig.json" ] && ! [ -f "tsconfig-web.json" ]; then
    echo "📝 Backing up web tsconfig.json..."
    cp tsconfig.json tsconfig-web.json
fi

# Copy React Native files
echo "📱 Installing React Native configuration..."
cp package-rn.json package.json
cp tsconfig-rn.json tsconfig.json

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ Done! Your project is now configured for React Native."
echo ""
echo "📱 Next steps:"
echo "   1. Run 'npm start' to start Expo dev server"
echo "   2. Scan the QR code with:"
echo "      - iOS: Camera app"
echo "      - Android: Expo Go app"
echo ""
echo "📚 Read REACT_NATIVE_SETUP.md for detailed instructions"
