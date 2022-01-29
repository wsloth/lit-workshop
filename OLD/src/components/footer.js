/* eslint-disable no-undef */
import { LitElement, html, css } from 'lit-element';
import { getSmallSizeLogo } from '../utils/logo-utils.js';

export class WorkshopFeFooter extends LitElement {
  static get properties() {
    return {
      chatInputVisible: Boolean,
    };
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
      }

      footer {
        border-top: 1px solid #ccc;
        width: 100%;
        height: 40px;
        background: #fff;
        display: flex;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        align-items: center;
        justify-content: center;
      }

      footer > img {
        display: inline-block;
        height: 20px;
        margin-left: 8px;
        cursor: pointer;
      }

      footer > p {
        font-family: 'Lato', sans-serif;
        display: inline;
        font-size: 20px;
      }

      section {
        display: flex;
      }
      section input {
        width: 100%;
        padding: 15px;
        font-size: 18px;
      }
      section input:first-child {
        width: 30%;
      }
      section button {
        width: 10%;
        font-size: 15px;
        background-color: #00a667;
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.chatInputVisible = false;
  }

  render() {
    return html`
      ${this.chatInputVisible
        ? html`
            <section>
              <input id="username" type="text" placeholder="Username" />
              <input
                id="message"
                @keyup=${this._onKeyUp}
                type="text"
                placeholder="Type a message..."
              />
              <button @click=${this._sendMessage}>Send</button>
            </section>
          `
        : ''}

      <footer>
        <p>Powered by</p>
        <img @click=${this._toggleChatInputVisible} src=${getSmallSizeLogo()} />
      </footer>
    `;
  }

  _toggleChatInputVisible() {
    this.chatInputVisible = !this.chatInputVisible;
  }

  _onKeyUp(e) {
    // Check if the user pressed "Enter"
    if (e.keyCode === 13) {
      this._sendMessage();
    }
  }

  _sendMessage() {
    const username = this.shadowRoot.querySelector('#username').value;
    const messageInput = this.shadowRoot.querySelector('#message');

    if (username && messageInput.value) {
      const db = firebase.firestore();
      db.collection('chat').add({
        username,
        message: messageInput.value,
        timestamp: new Date(),
      });
      messageInput.value = '';
    }
  }
}

window.customElements.define('workshop-fe-footer', WorkshopFeFooter);
