import { LitElement, html, css } from 'lit-element';

export class WorkshopFeFooter extends LitElement {
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
      }

      footer > p {
        font-family: 'Lato', sans-serif;
        display: inline;
        font-size: 20px;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <p>Powered by</p>
        <img src="/src/assets/logo.png" />
      </footer>
    `;
  }
}

window.customElements.define('workshop-fe-footer', WorkshopFeFooter);
