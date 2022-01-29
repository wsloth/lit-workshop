import { LitElement, html, css } from 'lit';

const logo = new URL('../../../assets/logo.png', import.meta.url).href;

export class LitWorkshopHeader extends LitElement {
  static styles = css`
    :host {
      width: 100%;
    }

    header {
      width: 100%;
      height: 80px;
      background: #222;
      border-bottom: 1px solid #2a2a2a;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 1);
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    header > img {
      display: inline-block;
      height: 32px;
      margin-left: 40px;
      margin-right: 20px;
    }

    header > h1 {
      font-family: 'Lato', sans-serif;
      font-weight: bold;
      font-size: 25px;
      flex-grow: 1;
    }

    header > p:before {
      content: '🔴   ';
    }
    header > p {
      color: red;
      margin-right: 40px;
      font-size: 20px;
      font-weight: bold;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% {
        opacity: 0%;
      }
      50% {
        opacity: 100%;
      }
      100% {
        opacity: 0%;
      }
    }

    @media (max-width: 600px) {
      h1 {
        opacity: 0;
      }
    }
  `;

  render() {
    return html`
      <header>
        <img src=${logo} alt="arcady logo" />
        <p>Live Chatroom</p>
        <!-- <ul>
          <li>Live Chatroom</li>
        </ul> -->
      </header>
    `;
  }
}

customElements.define('lit-header', LitWorkshopHeader);
