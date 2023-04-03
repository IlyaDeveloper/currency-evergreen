import {CurrencyConverterComponent} from "./components/currency-converter.component";

const app = () => {
  const currencyConverter = new CurrencyConverterComponent;

  currencyConverter.init();
}

window.addEventListener('load', (event) => {
  app();
});
