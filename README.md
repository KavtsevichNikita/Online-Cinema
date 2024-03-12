# Online Cinema

Online Cinema is a web application where users can browse movies, view ratings, make seat reservations in a theater, and leave comments.

## Features

- View movie ratings.
- Make seat reservations in a cinema theater.
- Leave comments and reviews for movies. (All comments you can find on http://localhost:3000/comments)
- App running on http://localhost:3000 and mongoDb is running on http://localhost:27017/
- If you want to check, are you sucessfully connected to MongoDb, visit http://localhost:3000/db 

## Getting Started

This application using Node.js server and MongoDB database

To run the application, you should have installed Docker.

# Start application

```bash
node start-app.js 
#or
docker-compose up -d --build
```

# Stop application

```bash
node end-app.js
#or
docker-compose down

# To re-build
docker-compose build
```