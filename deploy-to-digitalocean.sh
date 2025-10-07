#!/bin/bash

# Centro Médico Universal - DigitalOcean Deployment Script
# This script pushes changes from local to GitHub, then deploys to DigitalOcean

set -e  # Exit on any error

echo "🚀 Centro Médico Universal - Deployment Starting..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
REPO_DIR="/Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE"
SSH_KEY="/Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/DIGITALOCEAN_KEYS/digitalocean-ssh-key"
SERVER_IP="167.172.255.78"
SERVER_USER="root"
SERVER_PATH="/var/www/centromedicouniversal"

echo -e "${BLUE}Step 1: Checking Git status...${NC}"
cd "$REPO_DIR"

if [[ -n $(git status -s) ]]; then
    echo -e "${RED}⚠️  Uncommitted changes detected!${NC}"
    echo "Please commit your changes first:"
    echo "  git add ."
    echo "  git commit -m 'Your message'"
    exit 1
fi

echo -e "${GREEN}✓ Working directory clean${NC}"
echo ""

echo -e "${BLUE}Step 2: Pushing to GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Pushed to GitHub successfully${NC}"
else
    echo -e "${RED}✗ Failed to push to GitHub${NC}"
    exit 1
fi
echo ""

echo -e "${BLUE}Step 3: Deploying to DigitalOcean...${NC}"
echo "Server: $SERVER_IP"
echo "Path: $SERVER_PATH"
echo ""

# SSH into server and pull latest changes
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
    cd /var/www/centromedicouniversal
    
    echo "📥 Pulling latest changes from GitHub..."
    git pull origin main
    
    echo "🔄 Updating permissions..."
    chown -R www-data:www-data .
    chmod -R 755 .
    
    echo "🗑️  Clearing cache..."
    if [ -f "clear-cache-SAFE.sh" ]; then
        bash clear-cache-SAFE.sh
    fi
    
    echo "🔄 Restarting services..."
    docker-compose restart nginx || systemctl restart nginx
    
    echo "✅ Deployment complete!"
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "🌐 Website: https://centromedicouniversal.com"
    echo "📊 Check logs: ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP"
    echo ""
else
    echo -e "${RED}✗ Deployment failed${NC}"
    exit 1
fi

exit 0
