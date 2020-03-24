"use strict";
/* desktop filter */

var DOMDesktopFilterCategories = document.querySelectorAll(".filter__category");

var _loop = function _loop(i) {
  var DOMCategory = DOMDesktopFilterCategories[i];
  DOMCategory.addEventListener("click", function (event) {
    if (event.target.className === "filter__value") {
      if (event.target.innerText === "Not selected") {
        unsetFilter(DOMCategory);
      } else {
        var filterValue = event.target.innerText;
        setFilter(DOMCategory, filterValue);
      }
    }
  });
};

for (var i = 0; i < DOMDesktopFilterCategories.length; i++) {
  _loop(i);
}

function unsetFilter(DOMCategory) {
  DOMCategory.querySelector(".filter__category--set").className = "filter__category--set filter__category--hidden";
}

function setFilter(DOMCategory, filterValue) {
  var DOMSetFilter = DOMCategory.querySelector(".filter__category--set");
  var DOMValue = DOMSetFilter.querySelector(".filter__category--value");
  DOMValue.innerText = filterValue;
  DOMSetFilter.className = "filter__category--set";
}
/* mobile-tablet filter */


var DOMMobileFilterCategories = document.querySelectorAll(".filter-mobile__category");

var _loop2 = function _loop2(_i) {
  var DOMCategory = DOMMobileFilterCategories[_i];
  DOMCategory.addEventListener("click", function (event) {
    if (event.target.className.indexOf("filter-mobile__value") >= 0) {
      if (event.target.innerText === "Not selected") {
        unsetFilterParams(DOMCategory);
        event.target.className = "filter-mobile__value active-text--black";
        unsetFilterCategoryString(DOMCategory);
      } else {
        unsetFilterParams(DOMCategory);
        event.target.className = "filter-mobile__value active-text";
        setFilterCategoryString(DOMCategory, event.target.innerText);
      }
    }
  });
};

for (var _i = 0; _i < DOMMobileFilterCategories.length; _i++) {
  _loop2(_i);
}

function unsetFilterParams(DOMCategory) {
  var DOMFilterParams = DOMCategory.querySelectorAll(".filter-mobile__value");

  for (var _i2 = 0; _i2 < DOMFilterParams.length; _i2++) {
    DOMFilterParams[_i2].className = "filter-mobile__value";
  }
}

function unsetFilterCategoryString(DOMCategory) {
  var category = DOMCategory.querySelector(".filter-mobile__category--type").innerText;
  var DOMStringParam = getDOMStringParam(DOMCategory);
  DOMStringParam.innerText = category;
  DOMRemoveClass(DOMStringParam, "filter__param--set");
}

function getDOMStringParam(DOMCategory) {
  var result;
  var DOMClassNames = DOMCategory.className;
  var category = DOMClassNames.slice(DOMClassNames.indexOf(" category") + 11);
  var DOMFilterStringParams = document.querySelectorAll(".filter__params li");

  for (var _i3 = 0; _i3 < DOMFilterStringParams.length; _i3++) {
    console.log(DOMFilterStringParams[_i3].className.indexOf(category));

    if (DOMFilterStringParams[_i3].className.indexOf(category) >= 0) {
      result = DOMFilterStringParams[_i3];
    }
  }

  return result;
}

function setFilterCategoryString(DOMCategory, filterValue) {
  var DOMStringParam = getDOMStringParam(DOMCategory);
  DOMStringParam.innerText = filterValue;
  DOMAddClass(DOMStringParam, "filter__param--set");
}
/* photos switcher */


var DOMPreview = document.querySelector("#item__preview");
var DOMThumbnails = document.querySelectorAll(".item__thumbnail");
var DOMThumbnailContainers = document.querySelectorAll(".item__thumbnails div");

var _loop3 = function _loop3(_i4) {
  DOMThumbnails[_i4].addEventListener("click", function (event) {
    DOMPreview.src = DOMThumbnails[_i4].src;

    for (var j = 0; j < DOMThumbnailContainers.length; j++) {
      DOMRemoveClass(DOMThumbnailContainers[j], "item__thumbnails--show");
    }

    DOMAddClass(DOMThumbnailContainers[_i4], "item__thumbnails--show");
  });
};

for (var _i4 = 0; _i4 < DOMThumbnails.length; _i4++) {
  _loop3(_i4);
}