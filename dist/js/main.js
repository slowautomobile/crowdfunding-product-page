// Menu elements
const menu = document.querySelector('.menu');
const menuBar = document.getElementById('menu-bar');
const closeMenuBar = document.getElementById('close-menu-bar');
const menuOverlay = document.querySelector('.menu-overlay');

// Title elements
const backProjectBtn = document.getElementById('back-project-btn');
const bookmarkBtn = document.querySelector('.bookmark-btn-wrapper');
const bookmarkSign = document.querySelector('.bookmark-sign');

// Stats elements
const moneyRaisedEl = document.getElementById('money-raised');
const totalBackersEl = document.getElementById('total-backers');
const daysLeftEl = document.getElementById('days-left');
const fundIndicator = document.querySelector('.fund-indicator.active');

// Main section elements
const productOffersEls = document.querySelectorAll('main .offer');

const modalBody = document.querySelector('.modal-body');
const modalCard = document.querySelector('.modal-card');

const selectBtn1 = document.getElementById('select-btn-1');

const product2LeftEl = document.getElementById('product-2-left');
const selectBtn2 = document.getElementById('select-btn-2');

const product3LeftEl = document.getElementById('product-3-left');
const selectBtn3 = document.getElementById('select-btn-3');

// Modal elements
const productsModal = document.querySelector('.products-modal');
const closeModalBtn = document.getElementById('close-modal-xmark');
const pledge1RadioBtn = document.getElementById('pledge-1');
const pledge2RadioBtn = document.getElementById('pledge-2');
const pledge3RadioBtn = document.getElementById('pledge-3');
const pledge4RadioBtn = document.getElementById('pledge-4');
const modalProductsLeftEls = document.querySelectorAll('.modal-products-left');
const modalOffersEls = document.querySelectorAll('.products-modal .offer');

// Thanks modal
const thanksModal = document.querySelector('.thanks-modal');
const closeThanksBtn = document.getElementById('close-thanks');

// Menu
function displayMenu() {
  menu.classList.remove('hide-menu');
  menuBar.classList.add('hide');
  closeMenuBar.classList.remove('hide');
  menuOverlay.classList.remove('hide');
}

function closeMenu() {
  menu.classList.add('hide-menu');
  menuBar.classList.remove('hide');
  closeMenuBar.classList.add('hide');
  menuOverlay.classList.add('hide');
}

menuBar.addEventListener('click', displayMenu);
closeMenuBar.addEventListener('click', closeMenu);

// Global variables
let bookmarkState = 'false';
let moneyRaised = 0;
let totalBackers = 0;
let daysLeft = 4;

const productsLeft = {
  products1Left: 130,
  products2Left: 60,
  products3Left: 1,
};

let currentProductEl;
let currentProduct;

// Setting initial products values
const productsLeftEls = {};
for (let i = 1; i <= 3; i++) {
  productsLeftEls[`product${i}LeftEl`] = document.getElementById(
    `product-${i}-left`
  );
}

for (let i = 0; i < Object.values(productsLeftEls).length; i++) {
  Object.values(productsLeftEls)[i].textContent =
    productsLeft[`products${i + 1}Left`];
}

modalProductsLeftEls.forEach((product, i) => {
  product.textContent = productsLeft[`products${i + 1}Left`];
});

// Make displayUI func
moneyRaisedEl.textContent = `$${moneyRaised}`;
totalBackersEl.textContent = totalBackers;
daysLeftEl.textContent = daysLeft;

function fundIndicatorUpdate() {
  if (moneyRaised >= 100000) {
    fundIndicator.style.width = '100%';
  } else {
    fundIndicator.style.width = `${moneyRaised / 1000}%`;
  }
}
fundIndicatorUpdate();

bookmarkBtn.addEventListener('click', () => {
  if (bookmarkState === 'true') {
    bookmarkSign.classList.remove('bookmarked');
    localStorage.setItem('bookmarked', 'false');
    bookmarkState = localStorage.getItem('bookmarked');
  } else {
    bookmarkSign.classList.add('bookmarked');
    localStorage.setItem('bookmarked', 'true');
    bookmarkState = localStorage.getItem('bookmarked');
  }
});

let rewardButtons = [];
for (let i = 1; i <= 3; i++) {
  rewardButtons.push(document.getElementById(`select-btn-${i}`));
}

rewardButtons.forEach((rewardBtn, pos) => {
  rewardBtn.addEventListener('click', () => {
    openModal(pos);
    resetOffer();
    radioBtns.forEach((radioBtn, i) => {
      if (rewardBtn.getAttribute('name') === radioBtn.id) {
        radioBtn.parentElement.parentElement.classList.add('offer-selected');
        radioBtn.checked = true;
        pledgeForms[i].classList.remove('hide');
      }
    });
  });
});

// ---- Modal ----
// Open / Close Modal
function openModal(scrollToPosition) {
  let position;
  switch (scrollToPosition) {
    case 1:
    case 2:
      position = 'center';
      break;
    default:
      position = 'start';
      break;
  }
  productsModal.classList.remove('hide');
  productsModal.scrollIntoView({ behavior: 'smooth', block: position });
}

backProjectBtn.addEventListener('click', openModal);

function showThanks() {
  modalBody.classList.add('hide');
  thanksModal.classList.remove('hide');
  thanksModal.scrollIntoView({ behavior: 'smooth' });
}

function closeThanks() {
  productsModal.classList.add('hide');
  thanksModal.classList.add('hide');
  modalBody.classList.remove('hide');
}

// Choose reward
const radioBtns = document.getElementsByName('pledge-button');
const pledgeForms = document.getElementsByClassName('pledge-form');

function resetOffer() {
  radioBtns.forEach((radioBtn, i) => {
    radioBtn.parentElement.parentElement.classList.remove('offer-selected');
    pledgeForms[i].classList.add('hide');
  });
}

radioBtns.forEach((radioBtn, i) => {
  radioBtn.addEventListener('click', () => {
    resetOffer();
    radioBtn.parentElement.parentElement.classList.add('offer-selected');
    pledgeForms[i].classList.remove('hide');
  });
});

// Get text input and buttons
confirmPledges = document.getElementsByClassName('confirm-pledge');
inputBtns = document.getElementsByClassName('input-btn');

for (let i = 0; i < confirmPledges.length; i++) {
  confirmPledges[i].addEventListener('click', () => {
    if (!i) {
      totalBackersEl.textContent = ++totalBackers;
      showThanks();
    } else {
      if (!inputBtns[i].value) {
        moneyRaised += +inputBtns[i].getAttribute('value');
      } else {
        moneyRaised += parseInt(inputBtns[i].value);
      }
      
      moneyRaisedEl.textContent = `$${moneyRaised}`;
      totalBackersEl.textContent = ++totalBackers;

      currentProduct = --productsLeft[`products${i}Left`];
      productsLeftEls[`product${i}LeftEl`].textContent = currentProduct;
      modalProductsLeftEls[i - 1].textContent = currentProduct;
      inputBtns[i].value = '';

      if(currentProduct === 0) {
        modalOffersEls[i].classList.add('not-active');
        productOffersEls[i - 1].classList.add('not-active');
        pledgeForms[i].classList.add('hide');
        radioBtns[i].setAttribute('disabled', true);
      }

      fundIndicatorUpdate();
      showThanks();
    }
  });
}

window.onclick = e => {
  if (e.target === closeModalBtn || e.target === productsModal || e.target === closeThanksBtn) {
    productsModal.classList.add('hide');
    closeThanks();
  }
};