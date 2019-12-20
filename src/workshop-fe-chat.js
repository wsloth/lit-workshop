import { LitElement, html, css } from 'lit-element';

export class WorkshopFeChat extends LitElement {
  static get properties() {
    return {
      messages: Array,
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
      }

      header {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #ccc;
      }

      header ul {
        display: flex;
        justify-content: space-around;
        min-width: 400px;
        margin: 0 auto;
        padding: 0;
      }

      header ul li {
        display: flex;
      }

      header ul li a {
        color: #5a5c5e;
        text-decoration: none;
        font-size: 18px;
        line-height: 36px;
      }

      header ul li a:hover,
      header ul li a.active {
        color: blue;
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
    firebase.initializeApp({
      apiKey: 'your-firebase-api-key',
      projectId: 'your-firebase-project-id',
    });

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
      <header>
        <h1>Frontend Workshop Chat</h1>
      </header>

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

      <p class="app-footer">
        Made with ❤️ by
        <a target="_blank" rel="noopener noreferrer" href="https://arcady.nl">Arcady</a>.
      </p>
    `;
  }
}

window.customElements.define('workshop-fe-chat', WorkshopFeChat);
