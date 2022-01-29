import { LitElement, html, css } from 'lit';

import { ChatController } from './controllers/chat.controller.js';

import './components/header.js';
import './components/chatbox.js';
import './components/footer.js';

export class LitWorkshop extends LitElement {
  private controller = new ChatController(this);

  static styles = css`
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
  `;

  render() {
    const { messages } = this.controller;

    return html`
      <lit-header></lit-header>
      <main>
        <lit-chatbox .messages=${messages}></lit-chatbox>
      </main>
      <lit-footer></lit-footer>
    `;
  }
}
