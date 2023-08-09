# News Aggregator API
Aggregates a set of news articles from multiple sources

## Supported Functionalities
1. Register a user
2. Signin the registered user
3. Set preferences for the NEWS received
4. Get the preferences set
5. Get NEWS from external API based on the preferences set

## Dependencies
Express, CORS, Axois, bcrypt, jsonwebtoken, mongoose, dot  env, Nodemon(dev dependency)

## Commands to Start the Project
### Install Dependencies
```
npm install
```
### Start Server
```
npm run start
```

## End Point Documentation
### Register a user
```
curl -X POST -d '{"fullName": "Abhiram","email": "abhi@email.com","password": "abhi@123"}' -H 'Content-Type: application/json' 'http://localhost:3000/register' | jq
```
### Signin the registered user
```
curl -X POST -d '{"email": "abhi@email.com","password": "abhi@123"}' -H 'Content-Type: application/json' 'http://localhost:3000/login' | jq
```
### Set preferences for the NEWS received
```
curl -X PUT -d '{"q": "health","domains": "bbc.com,hindustantime.com"}' -H 'Content-Type: application/json' -H 'Autherization: {YOUR_TOKEN}' 'http://localhost:3000/preferences' | jq
```
### Get the preferences set
```
curl -H 'Autherization: {YOUR_TOKEN}' 'http://localhost:3000/preferences' | jq
```
### Get NEWS from external API based on the preferences set
```
curl -H 'Autherization: {YOUR_TOKEN}' 'http://localhost:3000/news' | jq
```
