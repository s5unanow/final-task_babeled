"use strict";

/* desktop filter */
const DOMDesktopFilterCategories = document.querySelectorAll(".filter__category");

for (let i = 0; i < DOMDesktopFilterCategories.length; i++) {
  let DOMCategory = DOMDesktopFilterCategories[i];
  DOMCategory.addEventListener("click", event => {
    if (event.target.className === "filter__value") {
      if (event.target.innerText === "Not selected") {
        unsetFilter(DOMCategory);
      } else {
        let filterValue = event.target.innerText;
        setFilter(DOMCategory, filterValue);
      }
    }
  });
}

function unsetFilter(DOMCategory) {
  DOMCategory.querySelector(".filter__category--set").className = "filter__category--set filter__category--hidden";
}
function setFilter(DOMCategory, filterValue) {
  let DOMSetFilter = DOMCategory.querySelector(".filter__category--set");
  let DOMValue = DOMSetFilter.querySelector(".filter__category--value");
  DOMValue.innerText = filterValue;
  DOMSetFilter.className = "filter__category--set";
}


/* mobile-tablet filter */

const DOMMobileFilterCategories = document.querySelectorAll(".filter-mobile__category");

for (let i = 0; i < DOMMobileFilterCategories.length; i++) {
  let DOMCategory = DOMMobileFilterCategories[i];
  DOMCategory.addEventListener("click", event => {
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
}

function unsetFilterParams(DOMCategory) {
  let DOMFilterParams = DOMCategory.querySelectorAll(".filter-mobile__value");
  for (let i = 0; i < DOMFilterParams.length; i++) {
    DOMFilterParams[i].className = "filter-mobile__value";
  }
}

function unsetFilterCategoryString(DOMCategory) {
  let category = DOMCategory.querySelector(".filter-mobile__category--type").innerText;
  let DOMStringParam = getDOMStringParam(DOMCategory);
  DOMStringParam.innerText = category;
  DOMRemoveClass(DOMStringParam, "filter__param--set");
}

function getDOMStringParam(DOMCategory) {
  let result;
  let DOMClassNames = DOMCategory.className;
  let category = DOMClassNames.slice(DOMClassNames.indexOf(" category") + 11);
  let DOMFilterStringParams = document.querySelectorAll(".filter__params li");
  for (let i = 0; i < DOMFilterStringParams.length; i++) {
    console.log(DOMFilterStringParams[i].className.indexOf(category));
    if (DOMFilterStringParams[i].className.indexOf(category) >= 0) {
      result = DOMFilterStringParams[i];
    }
  }
  return result
}

function setFilterCategoryString(DOMCategory, filterValue) {
  let DOMStringParam = getDOMStringParam(DOMCategory);
  DOMStringParam.innerText = filterValue;
  DOMAddClass(DOMStringParam, "filter__param--set");
}

/* photos switcher */

let DOMPreview = document.querySelector("#item__preview");
let DOMThumbnails = document.querySelectorAll(".item__thumbnail");
let DOMThumbnailContainers = document.querySelectorAll(".item__thumbnails div");

for (let i = 0; i < DOMThumbnails.length; i++) {
  DOMThumbnails[i].addEventListener("click", event => {
    DOMPreview.src = DOMThumbnails[i].src;
    for (let j = 0; j < DOMThumbnailContainers.length; j++) {
      DOMRemoveClass(DOMThumbnailContainers[j], "item__thumbnails--show");
    }
    DOMAddClass(DOMThumbnailContainers[i], "item__thumbnails--show");
  });
}

