import { html, LitElement } from 'lit';


/**
 * Button
 * @element adc-button
 */
export class Button extends LitElement {
  static styles:any;

  render() {
    return html`
      <button>test button</button>
    `;
  }


}

try {
  customElements.define('adc-button', Button);
} catch (e) {
  // do nothing
}
