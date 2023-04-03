import {CurrencyService} from "../services/currency.service";
import {RefElements} from "../root/ref-elements";

export class CurrencyConverterComponent {
  form = document.querySelector('[name=converter-form]')
  baseInput = this.form.querySelector('[name=currency-base]')
  receiveInput = this.form.querySelector('[name=currency-receive]')
  dateInput = this.form.querySelector('[name=currency-date]')
  receiveSelect = this.form.querySelector('[name=currency-rates]')
  receiveType = this.form.querySelector('[name=currency-type]')
  courseRatio = this.form.querySelector('[data-course-ratio]')

  currencyList = []
  selectList = 0;

  constructor() {
    this.ref = new RefElements();
    this.currencyService = new CurrencyService();

    this.currencyService.actualValueDateInput(this.dateInput);
    this.currencyService.actualSelectedCurrency(this.receiveSelect);
  }

  get getBaseValue() {
    return (this.baseInput.value < 1.00) ? 1.00 : this.baseInput.value;
  }

  get getReceiveType() {
    return this.receiveType.checked;
  }

  set setReceiveValue(value) {
    this.receiveInput.value = this.currencyService.convert(this.getBaseValue, value);
  }

  setCourseRatio(value) {
    this.courseRatio.innerHTML = `<strong>1</strong> ${this.currencyService.currency} = <strong>${value}</strong> ${this.currencyService.baseCurrency}`;
  }

  changeCurrency() {
    let selected = this.receiveSelect[this.receiveSelect.selectedIndex];

    let value = this.currencyList.find((elm) => {
      return (elm.currency === selected.text) && elm
    })

    let type = this.getReceiveType ? value.saleRateNB : value.purchaseRateNB;

    this.currencyService.currency = selected.text;
    this.setCourseRatio(type);
    this.setReceiveValue = type;
  }

  actualSelectList() {
    this.receiveSelect.replaceChildren();
    this.currencyList.forEach(elm => this.ref.createElementInDOM(this.receiveSelect, 'option', 'value', elm.currency, elm.currency));
  }

  updateData() {
    this.currencyService.getBankData().then(res => {
      this.currencyList = Object.values(res.exchangeRate).map(({baseCurrency, ...item}) => item);

      if (this.selectList <= 1) {
        this.actualSelectList();
        this.selectList = this.currencyList;
      }

    }).then(() => {
      this.changeCurrency();
    });
  }

  dateHandler(event) {
    this.currencyService.defaultData = this.currencyService.dateFormatReverseFrom(event.target.value);

    this.updateData();
  }

  init() {
    this.updateData();

    this.baseInput.addEventListener('change', () => this.changeCurrency());
    this.baseInput.addEventListener('input', () => this.changeCurrency());

    this.dateInput.addEventListener('change', (event) => this.dateHandler(event));

    this.receiveSelect.addEventListener('change', () => this.changeCurrency());
    this.receiveSelect.addEventListener('input', () => this.changeCurrency())

    this.receiveType.addEventListener('input', () => this.changeCurrency());
    this.receiveType.addEventListener('change', () => this.changeCurrency());

  }
}
