# workshop-fe-chat
Simple central system for a workshop where developers will create a tiny frontend to send chat messages to the main system, which will display them.

View the app over here: https://workshop-fe-chat.firebaseapp.com/

Workshop attendees can get started with a blank LitElement application over here: https://webcomponents.dev/edit/oqRYO91ipgpbJH4EECfI/src/index.js

When people add new messages to the firestore, they are automatically shown "chatbox-style" in the application.

![Preview](/docs/app-screenshot.png "Preview")

## How to host this workshop

I recommend setting up a [Stackblitz](https://stackblitz.com/) environment [like this](https://stackblitz.com/edit/fe-workshop-chat?file=src/app.js) to give some pointers on how to get started.

The workshop host can have the application open on their computer and walk around help the attendees with their questions and problems.

## Setup

#### Setting up your Firestore

Create a new Firebase application and under the database menu, create a new collection called `chat`.

Add a default (welcome) message that can be shown during the start of the workshop. The Firebase schema with types is as following:
```js
{
  "username": String,
  "message": String,
  "timestamp": Timestamp
}
```

Be sure to set your own `apiKey` and `projectId` in `src/workshop-fe-chat.js` to connect to your own firestore instance.

#### Starting the frontend
```bash
$ npm install
$ npm start
```

#### Deploying

Pick whatever environment you like: Firebase Hosting is free and easy to use, but you could also use any other static site host.

## Technologies used

- LitElement
- Scaffolding by the great [open-wc](https://open-wc.org/) project
- Firebase realtime database for the chat system

## Interested in a workshop?

Via [Arcady](https://arcady.nl) we can provide you with a personalized workshop or training using Web Components or any of the other big frontend frameworks. 🐻❤️🖥
