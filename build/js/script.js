'use strict';

var START_YEAR = 1970;
var END_YEAR = 2000;
var yearInput = document.querySelector('.main__form-year-input input');
var yearList = document.querySelector('.main__select-box');
var yearSpan = document.querySelector('.main__form-year-input span');
var nextInput = document.querySelector('.main__form-information input[name=adress]');


var createYearListItem = function () {
  yearList.innerHTML = '';
  for (var i = END_YEAR; i > START_YEAR; i--) {
    var el = document.createElement('li');
    el.classList.add('main__select-option');
    el.innerHTML = i;
    yearList.appendChild(el);
  }
};

var closeList = function () {
  yearList.classList.remove('main__select-box--active');
};

var documentClickHandler = function (evt) {
  if (!evt.target.classList.contains('main__form-input')) {
    closeList();
    document.removeEventListener('click', documentClickHandler);
    nextInput.removeEventListener('focus', closeList);
  }
};

if (yearList) {
  createYearListItem();

  var listItem = document.querySelectorAll('.main__select-option');
  listItem.forEach(function (el) {
    el.addEventListener('click', function () {
      yearInput.value = el.innerHTML;
      yearSpan.classList.add('main__form-year-span');
      closeList();
    });
  });
  yearInput.addEventListener('focus', function () {
    yearInput.value = '';
    yearSpan.classList.remove('main__form-year-span');
    yearList.classList.add('main__select-box--active');
    setTimeout(function () {
      document.addEventListener('click', documentClickHandler);
      nextInput.addEventListener('focus', closeList);
    }, 100);

  });

}
