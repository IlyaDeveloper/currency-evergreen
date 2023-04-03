export class HeaderComponent {
  host = document.querySelector('.header');
  links = this.host.querySelectorAll('.header__link');

  btn = this.host.querySelector('.header__btn-menu');
  menu = this.host.querySelector('.header__menu');
  menuClose = this.menu.querySelector('.header__menu-close');

  activeClass = '--active'

  constructor() {
  }

  setActiveLink(elm) {
    elm.classList.add(this.activeClass);
  }

  setInActiveLink(elm) {
    elm.classList.remove(this.activeClass);
  }

  openMenu() {
    this.menu.classList.remove('gm-hide');
    let timer = setTimeout(() => {
      this.menu.classList.add('--is-show');
      clearTimeout(timer)
    }, 100);
  }

  closeMenu() {
    this.menu.classList.remove('--is-show');

    let timer = setTimeout(() => {
      this.menu.classList.add('gm-hide');
      clearTimeout(timer)
    }, 1000);
  }

  linkEvent() {
    this.links.forEach((item) => {
      const linkName = item.getAttribute('href')
      const urlPath = window.location.pathname.split('/')[1];

      let
        splits = linkName.toString().split('/').join('').split('.html').join(''),
        isHome = urlPath.includes(splits) && urlPath === "",
        notHome = (urlPath.includes(splits) && splits !== '');

      (notHome || isHome)
        ? this.setActiveLink(item)
        : this.setInActiveLink(item)

      item.addEventListener('click', () => {
        this.links.forEach(link => this.setInActiveLink(link))
        this.setActiveLink(item);
      })
    })
  }

  eventMobileMenu() {
    this.btn.classList.toggle('--is-active');

    (this.btn.classList.contains('--is-active'))
      ? this.openMenu()
      : this.closeMenu()
  }

  init() {
    this.linkEvent();

    this.btn.addEventListener('click', () => {
      this.eventMobileMenu();
    })

    this.menuClose.addEventListener('click', () => {
      this.eventMobileMenu();
    })
  }
}
