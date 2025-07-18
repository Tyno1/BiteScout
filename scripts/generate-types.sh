#!/bin/bash

# Generate TypeScript types from OpenAPI specification
# This script regenerates the types in the shared package

echo "🔄 Regenerating TypeScript types from OpenAPI spec..."

# Navigate to shared directory
cd shared

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate types
echo "⚡ Generating types..."
npm run generate-types

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "✅ Types generated successfully!"
    echo "📁 Generated file: shared/types/api.ts"
else
    echo "❌ Type generation failed!"
    exit 1
fi

echo "🎉 Done! Types are ready to use." 