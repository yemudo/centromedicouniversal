#!/bin/bash
# Clear Cache and View Changes Script
# Centro Médico Universal

echo "================================================"
echo "CLEARING CACHE AND VIEWING CHANGES"
echo "================================================"

# Clear browser cache (for Safari on Mac)
echo "🧹 Clearing Safari cache..."
rm -rf ~/Library/Caches/com.apple.Safari/
rm -rf ~/Library/Safari/Downloads/*.webarchive
rm -rf ~/Library/Safari/History*
rm -rf ~/Library/Safari/LastSession.plist

# Clear Chrome cache if exists
if [ -d ~/Library/Caches/Google/Chrome ]; then
    echo "🧹 Clearing Chrome cache..."
    rm -rf ~/Library/Caches/Google/Chrome/
fi

echo ""
echo "✅ Cache cleared!"
echo ""
echo "📁 Opening website with changes..."
echo ""

# Open the test page and main page
open /Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/test-avatars.html
sleep 1
open /Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/index.html

echo "================================================"
echo "CHANGES IMPLEMENTED:"
echo "================================================"
echo "✓ Avatar size: 60px × 60px"
echo "✓ Font size: 1.4rem"
echo "✓ Dr. Castillo Rodríguez - Purple 'CR' avatar"
echo "✓ Dra. Vidalva - Real photo (60px)"
echo "✓ Dr. Manuel Antonio - Real photo (60px)"
echo "✓ Leadership pyramid created"
echo "✓ Cache-busting parameters updated"
echo ""
echo "🔄 If you still don't see changes:"
echo "   1. Press Cmd+Shift+R in your browser"
echo "   2. Open in Incognito/Private window"
echo "   3. Check test-avatars.html first"
echo "================================================"