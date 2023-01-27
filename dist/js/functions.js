'use strict'

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

// Main
function fundIndicatorUpdate() {
  if (moneyRaised >= 100000) {
    fundIndicator.style.width = '100%';
  } else {
    fundIndicator.style.width = `${moneyRaised / 1000}%`;
  }
}

function bookmarkToggler () {
  if (bookmarkState === 'true') {
    bookmarkSign.classList.remove('bookmarked');
    localStorage.setItem('bookmarked', 'false');
    bookmarkState = localStorage.getItem('bookmarked');
  } else {
    bookmarkSign.classList.add('bookmarked');
    localStorage.setItem('bookmarked', 'true');
    bookmarkState = localStorage.getItem('bookmarked');
  }
}

function selectRewardButtons(rewardBtn, pos) {
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
}

// Modal
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

function showThanks() {
  modalBody.classList.add('hide');
  thanksModal.classList.remove('hide');
  thanksModal.scrollIntoView({ behavior: 'smooth', block: "center" });
}

function closeThanks() {
  productsModal.classList.add('hide');
  thanksModal.classList.add('hide');
  modalBody.classList.remove('hide');
}

function resetOffer() {
  radioBtns.forEach((radioBtn, i) => {
    radioBtn.parentElement.parentElement.classList.remove('offer-selected');
    pledgeForms[i].classList.add('hide');
  });
}

function confirmAndDisable(i) {
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
      confirmPledges[i].disabled = true;
      rewardButtons[i - 1].disabled = true;
    }

    fundIndicatorUpdate();
    showThanks();
  }
}