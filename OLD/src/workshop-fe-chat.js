import { LitElement, html, css } from 'lit-element';

import './components/header.js';
import './components/footer.js';
import './components/chatbox.js';

export class WorkshopFeChat extends LitElement {
  static get properties() {
    return {
      messages: Array,
    };
  }

  static get styles() {
    return css`
      :host {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        margin: 0 auto;
      }

      main {
        height: calc(100vh - 130px);
        flex-grow: 1;
        overflow: hidden;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.messages = [];

    // eslint-disable-next-line no-undef
    firebase.initializeApp({});

    // eslint-disable-next-line no-undef
    const db = firebase.firestore();
    db.collection('chat').onSnapshot(snapshot => {
      const messages = [];
      snapshot.docs.forEach(d => {
        const data = d.data();
        messages.push({
          username: data.username,
          message: data.message,
          timestamp: data.timestamp ? new Date(data.timestamp.seconds * 1000) : null,
        });
        this.messages = messages.sort((a, b) => b.timestamp - a.timestamp);
      });
      this.requestUpdate();
    });
  }

  render() {
    const { messages } = this;

    return html`
      <workshop-fe-header></workshop-fe-header>

      <main>
        <workshop-fe-chatbox .messages=${messages}></workshop-fe-chatbox>
      </main>

      <workshop-fe-footer></workshop-fe-footer>
    `;
  }
}

window.customElements.define('workshop-fe-chat', WorkshopFeChat);
