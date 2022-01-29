/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable lit-a11y/alt-text */
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class LitFooter extends LitElement {
  @property({ type: Boolean })
  private chatInputVisible = false;

  static styles = css`
    :host {
      width: 100%;
    }

    footer {
      border-top: 1px solid #3a3a3a;
      width: 100%;
      height: 40px;
      display: flex;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 1);
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
        <p @click=${this._toggleChatInputVisible}>Powered by Arcady</p>
      </footer>
    `;
  }

  _toggleChatInputVisible() {
    this.chatInputVisible = !this.chatInputVisible;
  }

  _onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._sendMessage();
    }
  }

  _sendMessage() {
    const usernameInput = this.shadowRoot!.querySelector(
      '#username'
    ) as HTMLInputElement;
    const messageInput = this.shadowRoot!.querySelector(
      '#message'
    ) as HTMLInputElement;

    if (usernameInput?.value && messageInput?.value) {
      const event = new CustomEvent('send-message', {
        bubbles: true,
        composed: true,
        detail: {
          username: usernameInput.value,
          message: messageInput.value,
        },
      });
      this.dispatchEvent(event);
    }
  }
}

customElements.define('lit-footer', LitFooter);
