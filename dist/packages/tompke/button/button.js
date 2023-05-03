import { LitElement as e, html as n } from "lit";
class o extends e {
  render() {
    return n`
      <button>test button</button>
    `;
  }
}
try {
  customElements.define("adc-button", o);
} catch {
}
export {
  o as Button
};
//# sourceMappingURL=button.js.map
