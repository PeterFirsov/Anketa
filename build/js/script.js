'use strict';

var START_YEAR = 1970;
var END_YEAR = 2000;
var yearWrapper = document.querySelector('.main__form-year-input');
var yearInput = document.querySelector('.main__form-input');
var yearList = document.querySelector('.main__select-box');
var yearSpan = document.querySelector('.main__form-year-input span');
var nextInput = document.querySelector('.main__form-information input[name=adress]');
var preInput = document.querySelector('.main__form-information input[name=name]');
var menuButton = document.querySelector('.nav__toggle');
var menuNav = document.querySelector('.nav__list');

menuButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  menuNav.classList.toggle('nav__list--active');
  menuButton.classList.toggle('nav__toggle--active');
});

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

  if (yearInput.value) {
    yearSpan.classList.add('main__form-year-span');
  }

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

$(function() {
  var values = [0, 194, 385, 770];
  var slider = $("#polzunok").slider({
    orientation: 'horizontal',
    min: values[0],
    max: values[values.length - 1],
    value: values[1],
    animate: "slow",
    range: "min",

    slide: function(event, ui) {
      var includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
      var includeRight = event.keyCode != $.ui.keyCode.LEFT;
      var value = findNearest(includeLeft, includeRight, ui.value);
      slider.slider('value', value);

      $("#amount").val('$' + slider.slider('value'));
      return false;
    }
});

  function findNearest(includeLeft, includeRight, value) {
    var nearest = null;
    var diff = null;
    for (var i = 0; i < values.length; i++) {
      if ((includeLeft && values[i] <= value) || (includeRight && values[i] >= value)) {
        var newDiff = Math.abs(value - values[i]);
        if (diff == null || newDiff < diff) {
          nearest = values[i];
          diff = newDiff;
        }
      }
    }
    return nearest;
  }

$("#amount").val('$' + slider.slider('value'));
});
