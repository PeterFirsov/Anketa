'use strict';

var START_YEAR = 1970;
var END_YEAR = 2000;
var yearWrapper = document.querySelector('.main__form-year-input');
var yearInput = document.querySelector('.main__form-input');
var yearList = document.querySelector('.main__select-box');
var yearSpan = document.querySelector('.main__form-year-input span');
var nextInput = document.querySelector('.main__form-information input[name=adress]');
var preInput = document.querySelector('.main__form-information input[name=name]');


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
  yearWrapper.classList.remove('main__form-year-input--active');
  nextInput.removeEventListener('focus', closeList);
  preInput.removeEventListener('focus', closeList);
};

var documentClickHandler = function (evt) {
  if (!evt.target.classList.contains('main__form-input')) {
    closeList();
    document.removeEventListener('click', documentClickHandler);
    nextInput.removeEventListener('focus', closeList);
    preInput.removeEventListener('focus', closeList);
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
    yearWrapper.classList.add('main__form-year-input--active');
    setTimeout(function () {
      document.addEventListener('click', documentClickHandler);
      nextInput.addEventListener('focus', closeList);
      preInput.addEventListener('focus', closeList);
    }, 100);

  });
}

var sheet = document.createElement('style'),
  $rangeInput = $('.range input'),
  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {
  var curVal = el.value,
      val = (curVal - 1) * 33.3333333,
      style = '';

  // Set active label
  $('.range-labels li').removeClass('active selected');

  var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');

  // Change background gradient
  for (var i = 0; i < prefs.length; i++) {
    style += '.range {background: linear-gradient(to right, #d7b2f4 0%, #5a5696 ' + val + '%, #fff ' + val + '%, #fff 100%)}';
    style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
  }

  return style;
}

$rangeInput.on('input', function () {
  sheet.textContent = getTrackStyle(this);
});

// Change input value on label click
$('.range-labels li').on('click', function () {
  var index = $(this).index();

  $rangeInput.val(index + 1).trigger('input');

});
