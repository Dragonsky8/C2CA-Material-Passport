#!/bin/bash
# Run PostgreSQL in a Docker container (Stop container to run again)
docker run -it --name pgdb -e POSTGRES_USER=c2ca -e POSTGRES_PASSWORD=c2cacool -p 5432:5432 -d postgres
# Install dependencies
npm install
# Push Database Schema
npx prisma db push
# Migrate the audit settings
npx prisma migrate deploy
# Seed Database
npm run seed
# Build the project
npm run dev 
