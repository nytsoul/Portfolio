#!/bin/bash

# Exit on any error
set -e

# Set Node memory limit explicitly
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Building TypeScript..."
tsc -b

echo "Building Vite..."
vite build

echo "Starting server..."
node server/server.js
