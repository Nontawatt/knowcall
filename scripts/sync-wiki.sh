#!/bin/bash

# KnowCall Wiki Sync Script
# This script syncs documentation from docs/wiki to GitHub Wiki

set -e

echo "🔄 Starting Wiki Sync..."

# Check if wiki repo exists
if [ ! -d "wiki-repo" ]; then
    echo "📥 Cloning wiki repository..."
    git clone https://github.com/Nontawatt/knowcall.wiki.git wiki-repo
fi

cd wiki-repo

echo "🔄 Pulling latest changes..."
git pull origin master || true

echo "📋 Copying wiki files..."
cp ../docs/wiki/*.md .

# Rename README to match GitHub Wiki format
if [ -f "README.md" ]; then
    mv README.md _Sidebar.md
fi

echo "📝 Committing changes..."
git add .
git commit -m "Update wiki documentation" || echo "No changes to commit"

echo "🚀 Pushing to GitHub Wiki..."
git push origin master

cd ..
echo "✅ Wiki sync completed!"
