"use strict";

class CycledArray {
  constructor(array, startIndex = 0) {
    this.array = array;
    this.currentIndex = startIndex;
  }
  getCurrent () {
    return this.array[this.currentIndex];
  }
  moveUp() {
    if (this.currentIndex + 1 >= this.array.length) {
      this.currentIndex = 0
    } else {
      this.currentIndex++;
    }
    return this.array[this.currentIndex];
  }
  moveDown() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.array.length - 1;
    } else {
      this.currentIndex--;
    }
    return this.array[this.currentIndex];
  }
}

class Slider {
  constructor() {
    this.itemsLeft = new CycledArray(BagItem.createItemsFromID(window.bestOffer.left));
    this.itemsRight = new CycledArray(BagItem.createItemsFromID(window.bestOffer.right));
  }
  switchItem(switcherClass) {
    if (switcherClass.indexOf("--left") >= 0) {
      this.switchLeftItem(switcherClass);
    } else {
      this.switchRightItem(switcherClass);
    }
    this.updatePrice();
  }
  switchLeftItem(switcherClass) {
    let item;
    let DOMItem = document.querySelector(".slider-left");
    if (switcherClass.indexOf("best-offer__slide-up") >= 0) {
      item = this.itemsLeft.moveUp();
    } else {
      item = this.itemsLeft.moveDown();
    }
    this.updateItem(DOMItem, item);
  }
  switchRightItem(switcherClass) {
    let item;
    let DOMItem = document.querySelector(".slider-right");
    if (switcherClass.indexOf("best-offer__slide-up") >= 0) {
      item = this.itemsRight.moveUp();
    } else {
      item = this.itemsRight.moveDown();
    }
    this.updateItem(DOMItem, item);
  }
  updateItem(DOMItem, item) {
    let DOMName = DOMItem.querySelector(".item__name");
    DOMName.innerText = item.name;
    let DOMPrice = DOMItem.querySelector(".item__price");
    DOMPrice.innerText = "£" + item.price.toFixed(2);
    let DOMImg = DOMItem.querySelector(".item__img img");
    DOMImg.src = "img/" + BagItem.getItemImg(item);
    if (BagItem.getNewState(item)) {
      DOMAddClass(DOMItem, "item-new")
    } else {
      DOMRemoveClass(DOMItem, "item-new")
    }
  }
  updatePrice() {
    let DOMPrice = document.querySelector(".best-offer__old-price");
    let price = this.itemsLeft.getCurrent().price + this.itemsRight.getCurrent().price;
    DOMPrice.innerText = "£" + price.toFixed(2);

    let DOMDiscountedPrice = document.querySelector(".best-offer__discount-price");
    let discountedPrice = price - window.bestOffer.discount;
    DOMDiscountedPrice.innerText = "£" + discountedPrice.toFixed(2);
  }
  getCurrentItems() {
    let result = [];
    let leftItem = this.itemsLeft.getCurrent();
    let rightItem = this.itemsRight.getCurrent();
    result.push(BagItem.createItem(leftItem.catalogID, leftItem.color, leftItem.size));
    result.push(BagItem.createItem(rightItem.catalogID, rightItem.color, rightItem.size));
    return result;
  }
}

let slider = new Slider();

let DOMBestOfferBlock = document.querySelector(".best-offer__offer-block");

DOMBestOfferBlock.addEventListener("click", event => {
  let DOMSwitcherClassName = event.target.getAttribute("class");
  if (DOMSwitcherClassName.indexOf("best-offer__slide") >= 0) {
    slider.switchItem(DOMSwitcherClassName);
  }
});