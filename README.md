# Music Webapp

![MusicAppScreenshot](https://github.com/JRobera/MusicApp/assets/90910570/d0029667-0fac-490f-b23a-24104eb4f1b4)

A fullstack music webapp where user can create, update, and delete songs. Users can sign in with google to access the webapp. 
And it is responsive so user can use it in small size devices.
## Features

- User Registration: Allow users to sign in to the the website with google.
- Upload Song: Users can upload new songs, edit song and delete song.
- Create Playlist: Users can create playlist, add song to it, remove song from it.
- Statistics: Users can see statistics about songs, artist, album and genre.
- Search: Users can search for songs, artist, album, genre and playlist.

## Technologies

- MongoDB: A NoSQL database used to store user data, sonds, and playlist information.
- Express.js: A web application framework for building the server-side logic and APIs.
- React: A JavaScript library for building user interfaces.
- TypeScript: Adds static typing with optional type annotations to JavaScript.
- Node.js: A JavaScript runtime environment used for server-side development.
- Passportjs: Authentication middleware for Node.js

## Installation

1. Clone the repository:
   git clone https://github.com/JRobera/MusicApp.git
2. Install dependencies for the server:
   cd backend
   npm install
3. Install dependencies for the client:
   cd frontend
   npm install
4. Set up environment variables:

- Create a `.env` file in the `frontend` directory.
- Add VITE_BASE_URL eg. http://localhost:3000
- Add VITE_LOGIN_URL eg. http://localhost:3000/auth/google
- Add VITE_LOGOUT_REDIRECT_URL eg. http://localhost:3000/auth/logout

- Create a `.env` file in the `backend` directory.
- Add server PORT
- Add DB connection string
- Add Cloudinary credentials like CLOUD_NAME, API_KEY, API_SECRET
- Add google client id and google secret GOOGLE_CLIENT_ID ,GOOGLE_SECRET
- Add CLIENT_URL_ROOT eg. http://localhost:5173
- Add CLIENT_URL_HOME eg. http://localhost:5173/home
- Add COOKIE_KEY
  

5. Start the development server:
   cd backend
   npm run dev
6. Start the client:
   cd frontend
   npm run dev
7. Access the website at `http://localhost:5173` in your browser.

# Docker
## Pull the Docker Image from Docker hub
  docker push robera1/musicapi:v1
  
### To create and start the container
  docker-compose up
  
## Usage

- Log in using your credentials.
- Explore songs, albums, artists, genre, and playlist.

