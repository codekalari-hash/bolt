#!/bin/bash

echo "🔄 Switching back to Web version..."

if [ ! -f "package-web.json" ]; then
    echo "❌ No web backup found. Cannot switch."
    exit 1
fi

# Restore web files
echo "🌐 Restoring web configuration..."
cp package-web.json package.json
cp tsconfig-web.json tsconfig.json

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ Done! Your project is back to web version."
echo ""
echo "🌐 Next steps:"
echo "   Run 'npm run dev' to start the dev server"
echo ""
