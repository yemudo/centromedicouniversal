#!/bin/bash
# AUTOMATIC CACHE BUSTING SCRIPT
# Centro Médico Universal - Force Fresh Browser Cache

echo "🔄 CLEARING WEBSITE CACHE - FORCING FRESH LOAD FOR ALL VISITORS"
echo "=================================================="

# Generate new version timestamp
NEW_VERSION=$(date +"%Y%m%d-%H%M")

echo "📅 New cache version: $NEW_VERSION"
echo ""

# Update all HTML files with new version numbers
echo "🔧 Updating cache versions in HTML files..."

# Function to update versions in a file
update_file() {
    local file=$1
    if [ -f "$file" ]; then
        # Update CSS versions
        sed -i.bak "s/css\/[^\"]*\.css?v=[^\"]*\"/css\/\$(basename \${file%.css*}).css?v=$NEW_VERSION\"/g" "$file"
        
        # Update JS versions  
        sed -i.bak "s/js\/[^\"]*\.js?v=[^\"]*\"/js\/\$(basename \${file%.js*}).js?v=$NEW_VERSION\"/g" "$file"
        
        # Add versions to files without them
        sed -i.bak "s/href=\"css\/\([^\"]*\)\.css\"/href=\"css\/\1.css?v=$NEW_VERSION\"/g" "$file"
        sed -i.bak "s/src=\"js\/\([^\"]*\)\.js\"/src=\"js\/\1.js?v=$NEW_VERSION\"/g" "$file"
        
        # Clean up backup files
        rm -f "$file.bak"
        
        echo "✅ Updated: $file"
    fi
}

# Update all HTML files
for file in *.html; do
    if [ -f "$file" ]; then
        update_file "$file"
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
echo "💡 TIP: Run this script before every deployment to ensure"
echo "   all visitors see your latest changes immediately!"
