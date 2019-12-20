import { LitElement, html, css } from 'lit-element';

export class WorkshopFeHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
      }

      header {
        width: 100%;
        height: 80px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        top: 0;
        display: flex;
        align-items: center;
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

      header > p {
        color: #00a667;
        margin-right: 40px;
        font-size: 20px;
      }
    `;
  }

  render() {
    return html`
      <header>
        <img src="/src/assets/bear.png" />
        <h1>Frontend Workshop - Chat</h1>
        <p>arcady.nl/jobs</p>
      </header>
    `;
  }
}

window.customElements.define('workshop-fe-header', WorkshopFeHeader);
