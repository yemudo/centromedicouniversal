#!/usr/bin/env node
/**
 * AUTOMATIC CACHE BUSTING SYSTEM
 * Centro Médico Universal - Version Management
 * 
 * This script automatically updates version numbers in HTML files
 * to force browsers to reload CSS and JS files after changes.
 */

const fs = require('fs');
const path = require('path');

// Generate new version based on current timestamp
const generateVersion = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}`;
};

// Get all HTML files in the website
const getHtmlFiles = () => {
    const files = fs.readdirSync(__dirname);
    return files.filter(file => file.endsWith('.html'));
};

// Update version parameters in file content
const updateVersions = (content, newVersion) => {
    // Update CSS files
    content = content.replace(
        /(href="css\/[^"]+\.css)\?v=[^"]*"/g,
        `$1?v=${newVersion}"`
    );
    
    content = content.replace(
        /(href="css\/[^"]+\.css)"/g,
        `$1?v=${newVersion}"`
    );
    
    // Update JS files
    content = content.replace(
        /(src="js\/[^"]+\.js)\?v=[^"]*"/g,
        `$1?v=${newVersion}"`
    );
    
    content = content.replace(
        /(src="js\/[^"]+\.js)"/g,
        `$1?v=${newVersion}"`
    );
    
    // Fix duplicate </script> tags
    content = content.replace(
        /<\/script><\/script>/g,
        '</script>'
    );
    
    return content;
};

// Main function
const updateCacheVersions = () => {
    const newVersion = generateVersion();
    const htmlFiles = getHtmlFiles();
    
    console.log(`🔄 Updating cache versions to: ${newVersion}`);
    
    htmlFiles.forEach(filename => {
        try {
            const filePath = path.join(__dirname, filename);
            let content = fs.readFileSync(filePath, 'utf8');
            
            content = updateVersions(content, newVersion);
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Updated: ${filename}`);
        } catch (error) {
            console.error(`❌ Error updating ${filename}:`, error.message);
        }
    });
    
    console.log(`\n🎯 Cache busting complete!`);
    console.log(`📝 All CSS and JS files now have version: ${newVersion}`);
    console.log(`🚀 Deploy your website - all visitors will get fresh files!`);
};

// Run the update
if (require.main === module) {
    updateCacheVersions();
}

module.exports = { updateCacheVersions, generateVersion };
