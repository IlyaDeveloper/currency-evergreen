import {CurrencyConverterComponent} from "./components/currency-converter.component";
import {HeaderComponent} from "./components/header.component";

const app = () => {
  const currencyConverter = new CurrencyConverterComponent();
  const header = new HeaderComponent();

  header.init();
  currencyConverter.init();
}

window.addEventListener('load', (event) => {
  app();
});
