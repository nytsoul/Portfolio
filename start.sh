#!/bin/bash
set -e

echo "==================================="
echo "Portfolio Backend Server Starting"
echo "==================================="
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "NODE_OPTIONS: $NODE_OPTIONS"
echo ""

# Start the server
node server/server.js
