import { Button } from "./button";

declare global {
  interface HTMLElementTagNameMap {
    "adc-button": Button;
  }
}
