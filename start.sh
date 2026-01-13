#!/bin/bash

# Exit on any error
set -e

echo "Building TypeScript..."
tsc -b

echo "Building Vite..."
vite build

echo "Starting server..."
node server/server.js
