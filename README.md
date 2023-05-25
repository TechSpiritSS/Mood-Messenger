# Mood Messenger
(GCP Credits Exhausted)
Mood Messenger is a real-time chat application built using Node.js, React.js, and Cloud SQL. It allows users to sign in with their Google account, initiate chats with other registered users based on their email, send messages, and view previous chats.

[Link](https://mood-messenger.web.app)
## Features
- Sign in with Google
- Initiate chats with other registered users
- Send messages
- View previous chats
## Tech Stack
- React.js (front-end)
- Node.js (back-end)
- Cloud SQL (database)
- Firebase Authentication
- Firebase Hosting
## Getting Started
Clone this repository.


``` bash 
git clone https://github.com/your-username/mood-messenger.git
cd mood-messenger
```
Install dependencies for the front-end and back-end.

``` bash
cd client
npm install
cd ../server
npm install
```

Set up a Cloud SQL instance in Google Cloud and create a database for the application. Update the server/.env file with your database credentials.

Set up Firebase Authentication and get your Firebase configuration. Update the client/src/firebase.js file with your Firebase configuration.

Start the development server.

``` bash
cd ../client
npm start
```

In another terminal, start the Node.js server.

``` bash
cd ../server
npm start
```
Open http://localhost:3000 in your browser.

## Deployment
Set up a Firebase project in the Firebase Console.

Update the client/src/firebase.js file with your Firebase configuration.

Build the React.js app.

``` bash
cd client
npm run build
```

Deploy the app to Firebase Hosting.

``` bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

Start the Node.js server in Google Cloud.

Open your Firebase Hosting URL in your browser.
