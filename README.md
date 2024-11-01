# Summary of this project

This project is a complex backend project that is built with nodejs, expressjs, mongodb, mongoose, jwt, bcrypt, and many more. This project is a complete backend project that has all the features that a backend project should have.
We are building a complete video hosting website similar to youtube with all the features like login, signup, upload video, like, dislike, comment, reply, subscribe, unsubscribe, and many more.

Project uses all standard practices like JWT, bcrypt, access tokens, refresh Tokens and many more. I have spent a lot of time in building this project and I learnt pretty much about backend.
## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Video Management](#video-management)
  - [Interactions](#interactions)
  - [Channel Management](#channel-management)
  - [Watch History](#watch-history)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)

## Features

- **User Authentication**: Register, login, logout, and manage user sessions securely.
- **JWT & Refresh Tokens**: Implements secure session handling with JWT access and refresh tokens.
- **Video Management**: Allows users to upload, edit, delete, and retrieve videos.
- **User Interactions**: Enables users to like, dislike, comment, and reply to comments on videos.
- **Channel Management**: Provides functionality to subscribe to channels, unsubscribe, and view channel profiles.
- **Watch History**: Maintains a history of videos watched by the user.
- **Standard Practices**: Follows industry-standard security practices, such as bcrypt for password hashing, proper validation, and error handling.



## Technologies Used

- **Node.js** & **Express.js**: Core backend framework for building and managing the server.
- **MongoDB** & **Mongoose**: Database and Object Data Modeling (ODM) library for storing and managing user, video, and interaction data.
- **JWT (JSON Web Token)**: Manages authentication and authorization securely with access and refresh tokens.
- **Bcrypt**: Hashes passwords for secure storage and retrieval.
- **Multer**: Middleware for handling file uploads, such as videos and user profile images.
- **Other Standard Practices**: Includes comprehensive error handling, input validation, and secure coding practices throughout the application.

## API Reference

### Authentication
- **POST** `/register`
  - Register a new user with optional `avatar` and `coverImage` uploads.

- **POST** `/login`
  - Log in an existing user.

- **POST** `/logout`
  - Log out the current user. *(Protected route, requires JWT)*

- **POST** `/refresh-token`
  - Refresh the user's access token.

### User Management
- **POST** `/change-password`
  - Change the current user's password. *(Protected route, requires JWT)*

- **GET** `/current-user`
  - Retrieve details of the currently logged-in user. *(Protected route, requires JWT)*

- **PATCH** `/update-account`
  - Update the account details of the current user. *(Protected route, requires JWT)*

- **PATCH** `/avatar`
  - Update the avatar image of the current user. *(Protected route, requires JWT)*

- **PATCH** `/cover-image`
  - Update the cover image of the current user. *(Protected route, requires JWT)*

### Channel Management
- **GET** `/c/:username`
  - Retrieve the channel profile of a user by `username`. *(Protected route, requires JWT)*

### Watch History
- **GET** `/history`
  - Retrieve the watch history of the current user. *(Protected route, requires JWT)*




## Environment Variables

Set up the following environment variables in a `.env` file at the root of the project:

```plaintext
PORT=8000
CORS_ORIGIN=*
MONGODB_URI=YOUR_MONGO_URL

ACCESS_TOKEN_SECRET=random_string
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=random_string
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

