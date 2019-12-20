import { LitElement, html, css } from 'lit-element';

import './components/header.js';
import './components/footer.js';

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
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        margin: 0 auto;
      }

      main {
        flex-grow: 1;
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
      this.messages = [];
      snapshot.docs.forEach(d => this.messages.push(d.data()));
      this.requestUpdate();
    });
  }

  render() {
    const { messages } = this;

    return html`
      <workshop-fe-header></workshop-fe-header>

      <main>
        ${messages
          ? messages.map(
              m =>
                html`
                  <p>${m.username} - ${m.message}</p>
                `,
            )
          : ''}
      </main>

      <workshop-fe-footer></workshop-fe-footer>
    `;
  }
}

window.customElements.define('workshop-fe-chat', WorkshopFeChat);
