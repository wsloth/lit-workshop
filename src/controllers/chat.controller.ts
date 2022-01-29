/* eslint-disable no-console */
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  onSnapshot,
  Unsubscribe,
  addDoc,
} from 'firebase/firestore';

import { Message } from '../models/message.model.js';

export class ChatController implements ReactiveController {
  private host: ReactiveControllerHost;
  private app!: FirebaseApp;
  private db!: Firestore;
  private subscription!: Unsubscribe;

  public messages: Message[] = [];

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected() {
    const firebaseConfig = {};
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);

    this.subscription = onSnapshot(collection(this.db, 'chat'), snapshot => {
      const messages: Message[] = [];

      snapshot.docs.forEach(d => {
        const data = d.data();
        messages.push({
          username: data.username,
          message: data.message,
          timestamp: data.timestamp?.seconds
            ? new Date(data.timestamp.seconds * 1000)
            : new Date(1970, 0, 1),
        });

        this.messages = messages.sort(
          (a: any, b: any) => b.timestamp - a.timestamp
        );
      });

      this.host.requestUpdate();
    });
  }

  hostDisconnected() {
    this.subscription();
  }

  async sendMessage(username: string, message: string) {
    const messageObject = {
      username,
      message,
      timestamp: new Date(),
    };
    if (!messageObject.username || !messageObject.message) {
      console.error('Invalid message received', messageObject);
    }

    await addDoc(collection(this.db, 'chat'), { ...messageObject });

    console.info('Message sent', messageObject);
  }
}
