import {ErrorsService} from "./errors.service";
import {ERROR_MESSAGES} from "../stores/errors.store";
import {BANKS_DATA} from "../stores/api-data.store";

export class CurrencyService {
  constructor(
    defaultBank = 'PB',
    baseCurrency = 'UAH',
    currency = 'USD',
    defaultData = this.getCurrentDate,
    proxyServer = true,
  ) {
    this.errorsService = new ErrorsService();

    this.defaultBank = defaultBank;
    this.baseCurrency = baseCurrency;
    this.currency = currency;
    this.defaultData = defaultData;
    this.proxyServer = proxyServer;
  }

  get getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString().split('/').join('.');
  }

  get getDataBank() {
    return BANKS_DATA.find(item => (item.code.includes(this.defaultBank)) && item)
  }

  get #apiUrl() {
    const api = `${this.getDataBank.api}${this.defaultData}`;
    console.log('api=', api);
    return this.proxyServer ? `https://api.allorigins.win/raw?url=${encodeURIComponent(api)}` : api
  }

  async getBankData() {
    const api = this.#apiUrl;

    try {
      return await fetch(api)
        .then(response => {
          if (response.ok){
            // console.log('',response.json());
            return response.json()
          }

          throw response.status;
        })
    } catch (message) {
      const defError = ((message.toString().includes('ServiceEr'))
        ? ERROR_MESSAGES.wrongApi
        : `${ERROR_MESSAGES.serverError} ${message}`);

      this.errorsService.errorHandler(defError);
    }
  }

  dateFormatReverseTo(value) {
    return value.split('.').reverse().join('-');
  }

  dateFormatReverseFrom(value) {
    return value.split('-').reverse().join('.');
  }

  actualValueDateInput(elm) {
    const today = this.getCurrentDate;
    elm.value = this.dateFormatReverseTo(this.defaultData === today ? today : this.defaultData);
    elm.max = this.dateFormatReverseTo(today);
  }

  actualSelectedCurrency(elm) {
    for (const item of elm.options) {
      if (this.currency === item.value) {
        item.selected = true;
      }
    }
  }

  convert(base, to) {
    return (base / to).toFixed(2);
  }
}
