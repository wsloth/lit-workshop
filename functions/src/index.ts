import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

import * as express from 'express';
import * as cors from 'cors';

const app = express();

interface ChatMessage {
  username: string;
  message: string;
  timestamp: Date;
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// build multiple CRUD interfaces:
app.get('/messages', async (req, res) => {
  const db = admin.firestore();

  // Get all the chat messages from the database and map them to an array
  const chatQuerySnapshots = await db.collection('chat').get();
  const chatMessages: ChatMessage[] = [];
  chatQuerySnapshots.forEach(doc => chatMessages.push(doc.data() as ChatMessage));

  res.send(chatMessages);
});

app.post('/messages', async (req, res) => {
  // Validate if the message body is OK
  const body: ChatMessage = req.body;
  if (!body.username || !body.message) {
    res.send().status(400);
    return;
  }

  // Store the message
  const db = admin.firestore();
  await db.collection('chat').add({
    username: body.username,
    message: body.message,
    timestamp: new Date(),
  });
  res.send().status(200);
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
