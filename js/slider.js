"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CycledArray = /*#__PURE__*/function () {
  function CycledArray(array) {
    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, CycledArray);

    this.array = array;
    this.currentIndex = startIndex;
  }

  _createClass(CycledArray, [{
    key: "getCurrent",
    value: function getCurrent() {
      return this.array[this.currentIndex];
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      if (this.currentIndex + 1 >= this.array.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }

      return this.array[this.currentIndex];
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.array.length - 1;
      } else {
        this.currentIndex--;
      }

      return this.array[this.currentIndex];
    }
  }]);

  return CycledArray;
}();

var Slider = /*#__PURE__*/function () {
  function Slider() {
    _classCallCheck(this, Slider);

    this.itemsLeft = new CycledArray(BagItem.createItemsFromID(window.bestOffer.left));
    this.itemsRight = new CycledArray(BagItem.createItemsFromID(window.bestOffer.right));
  }

  _createClass(Slider, [{
    key: "switchItem",
    value: function switchItem(switcherClass) {
      if (switcherClass.indexOf("--left") >= 0) {
        this.switchLeftItem(switcherClass);
      } else {
        this.switchRightItem(switcherClass);
      }

      this.updatePrice();
    }
  }, {
    key: "switchLeftItem",
    value: function switchLeftItem(switcherClass) {
      var item;
      var DOMItem = document.querySelector(".slider-left");

      if (switcherClass.indexOf("best-offer__slide-up") >= 0) {
        item = this.itemsLeft.moveUp();
      } else {
        item = this.itemsLeft.moveDown();
      }

      this.updateItem(DOMItem, item);
    }
  }, {
    key: "switchRightItem",
    value: function switchRightItem(switcherClass) {
      var item;
      var DOMItem = document.querySelector(".slider-right");

      if (switcherClass.indexOf("best-offer__slide-up") >= 0) {
        item = this.itemsRight.moveUp();
      } else {
        item = this.itemsRight.moveDown();
      }

      this.updateItem(DOMItem, item);
    }
  }, {
    key: "updateItem",
    value: function updateItem(DOMItem, item) {
      var DOMName = DOMItem.querySelector(".item__name");
      DOMName.innerText = item.name;
      var DOMPrice = DOMItem.querySelector(".item__price");
      DOMPrice.innerText = "£" + item.price.toFixed(2);
      var DOMImg = DOMItem.querySelector(".item__img img");
      DOMImg.src = "img/" + BagItem.getItemImg(item);

      if (BagItem.getNewState(item)) {
        DOMAddClass(DOMItem, "item-new");
      } else {
        DOMRemoveClass(DOMItem, "item-new");
      }
    }
  }, {
    key: "updatePrice",
    value: function updatePrice() {
      var DOMPrice = document.querySelector(".best-offer__old-price");
      var price = this.itemsLeft.getCurrent().price + this.itemsRight.getCurrent().price;
      DOMPrice.innerText = "£" + price.toFixed(2);
      var DOMDiscountedPrice = document.querySelector(".best-offer__discount-price");
      var discountedPrice = price - window.bestOffer.discount;
      DOMDiscountedPrice.innerText = "£" + discountedPrice.toFixed(2);
    }
  }, {
    key: "getCurrentItems",
    value: function getCurrentItems() {
      var result = [];
      var leftItem = this.itemsLeft.getCurrent();
      var rightItem = this.itemsRight.getCurrent();
      result.push(BagItem.createItem(leftItem.catalogID, leftItem.color, leftItem.size));
      result.push(BagItem.createItem(rightItem.catalogID, rightItem.color, rightItem.size));
      return result;
    }
  }]);

  return Slider;
}();

var slider = new Slider();
var DOMBestOfferBlock = document.querySelector(".best-offer__offer-block");
DOMBestOfferBlock.addEventListener("click", function (event) {
  var DOMSwitcherClassName = event.target.getAttribute("class");

  if (DOMSwitcherClassName.indexOf("best-offer__slide") >= 0) {
    slider.switchItem(DOMSwitcherClassName);
  }
});