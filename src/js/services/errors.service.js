import {EFFECT_KEYFRAME, EFFECT_OPTIONS} from "../stores/animation.store";
import {RefElements} from "../root/ref-elements";

export class ErrorsService {
  host;
  #close;

  constructor() {
    this.ref = new RefElements();
  }

  #effect = (type = 'in') => {
    this.host.animate(EFFECT_KEYFRAME, {
      ...EFFECT_OPTIONS,
      direction: (type === 'in') ? 'normal' : 'reverse'
    });
  }

  destroyHandler() {
    this.#effect('out');

    const timer = setTimeout(() => {
      this.host.remove();
      clearTimeout(timer);
    }, 1000);
  }

  errorHandler(message) {
    const template = `
          <article class="popup">
            <div class="popup__main">
              <section class="popup__contnet">${message}</section>
              <footer class="popup__foot">
                <button class="popup__close" error-close type="button" lang-key="consent_no">CLOSE</button>
              </footer>
            </div>
          </article>`;

    this.ref.body.insertAdjacentHTML('beforeend', template);
    this.host = this.ref.body.querySelector('.popup');

    this.#effect();
    this.host.querySelector('[error-close]').addEventListener('click', () => this.destroyHandler());
  }
}
