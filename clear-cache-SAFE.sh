#!/bin/bash
# SAFE CACHE BUSTING SCRIPT - FIXED VERSION
# Centro Médico Universal - Force Fresh Browser Cache

echo "🔄 CLEARING WEBSITE CACHE - FORCING FRESH LOAD FOR ALL VISITORS"
echo "=================================================="

# Generate new version timestamp
NEW_VERSION=$(date +"%Y%m%d-%H%M")

echo "📅 New cache version: $NEW_VERSION"
echo ""

# Update all HTML files with new version numbers
echo "🔧 Updating cache versions in HTML files..."

# List of HTML files to update
HTML_FILES=("index.html" "doctores.html" "contacto.html" "instalaciones.html" "servicios.html" "booking.html" "booking-integration.html" "diagnostico-imagenes.html")

# Update each HTML file
for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Updating: $file"
        
        # Update CSS versions - find specific CSS files and update their versions
        sed -i.bak "s/styles\.css?v=[^\"]*\"/styles.css?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/header-preview\.css?v=[^\"]*\"/header-preview.css?v=$NEW_VERSION\"/g" "$file"
        
        # Update JS versions - find specific JS files and update their versions
        sed -i.bak "s/main\.min\.js?v=[^\"]*\"/main.min.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/render-doctors\.js?v=[^\"]*\"/render-doctors.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/gemini-integration\.js?v=[^\"]*\"/gemini-integration.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/lazy-load\.min\.js?v=[^\"]*\"/lazy-load.min.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/specialty-icons\.min\.js?v=[^\"]*\"/specialty-icons.min.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/structured-data\.min\.js?v=[^\"]*\"/structured-data.min.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/pwa\.min\.js?v=[^\"]*\"/pwa.min.js?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/draft-counter\.js?v=[^\"]*\"/draft-counter.js?v=$NEW_VERSION\"/g" "$file"
        
        # Clean up backup files
        rm -f "$file.bak"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "🎯 CACHE BUSTING COMPLETE!"
echo "================================"
echo "✅ All CSS and JS files now have version: $NEW_VERSION"
echo "✅ Browsers will be forced to download fresh files"  
echo "✅ No more old cached files showing to visitors"
echo ""
echo "🚀 NEXT STEP: Deploy your website!"
echo "   - Netlify: Git push will auto-deploy"
echo "   - Manual: Upload all files to your server"
echo ""
echo "💡 TIP: This SAFE version won't break your file references!"
