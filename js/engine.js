"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bag = /*#__PURE__*/function () {
  function Bag() {
    _classCallCheck(this, Bag);

    this.items = [];
  }

  _createClass(Bag, [{
    key: "initialize",
    value: function initialize() {
      if (Storage.hasItems()) {
        this.items = Storage.loadItems();
      }
    }
  }, {
    key: "hasBestOfferItems",
    value: function hasBestOfferItems() {
      return BestOffer.includesDiscountedItems(this.items);
    }
  }, {
    key: "hasItems",
    value: function hasItems() {
      return this.items.length > 0;
    }
  }, {
    key: "includesItem",
    value: function includesItem(itemID) {
      return this.items.some(function (item) {
        return item.id === itemID;
      });
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      if (this.includesItem(item.id)) {
        this.increaseItemQuantity(item.id);
      } else {
        this.items.push(item);
      }

      Storage.saveItems(this.items);
    }
  }, {
    key: "addBestOfferItems",
    value: function addBestOfferItems(items) {
      var _this = this;

      items.forEach(function (item) {
        return _this.addItem(item);
      });
      Storage.saveItems(this.items);
    }
  }, {
    key: "increaseItemQuantity",
    value: function increaseItemQuantity(itemID) {
      var item = this.getItemByID(itemID);
      item.quantity += 1;
      Storage.saveItems(this.items);
    }
  }, {
    key: "decreaseItemQuantity",
    value: function decreaseItemQuantity(itemID) {
      var item = this.getItemByID(itemID);
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.removeItem(itemID);
      }

      Storage.saveItems(this.items);
    }
  }, {
    key: "getItemByID",
    value: function getItemByID(itemID) {
      return this.items.filter(function (item) {
        return item.id === itemID;
      })[0];
    }
  }, {
    key: "removeItem",
    value: function removeItem(itemID) {
      this.items = this.items.filter(function (item) {
        return item.id !== itemID;
      });
      Storage.saveItems(this.items);
    }
  }, {
    key: "getTotalPrice",
    value: function getTotalPrice() {
      var price = 0;

      if (this.hasItems()) {
        price = this.items.reduce(function (price, item) {
          return price + item.price * item.quantity;
        }, 0);

        if (this.hasBestOfferItems()) {
          price -= BestOffer.getDiscount();
        }
      }

      return price;
    }
  }, {
    key: "getItemsQuantity",
    value: function getItemsQuantity() {
      var result = 0;

      if (this.hasItems()) {
        result = this.items.reduce(function (totalQuantity, item) {
          return totalQuantity + item.quantity;
        }, 0);
      }

      return result;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this.items;
    }
  }, {
    key: "clearBag",
    value: function clearBag() {
      this.items = [];
      Storage.clearStorage();
    }
  }, {
    key: "getTotalDiscount",
    value: function getTotalDiscount() {
      if (this.hasBestOfferItems()) return BestOffer.getDiscount();else return 0;
    }
  }, {
    key: "getItemQuantity",
    value: function getItemQuantity(itemID) {
      var result = 0;

      if (this.includesItem(itemID)) {
        result = this.getItemByID(itemID).quantity;
      }

      return result;
    }
  }], [{
    key: "create",
    value: function create() {
      var bag = new Bag();
      bag.initialize();
      return bag;
    }
  }]);

  return Bag;
}();

var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher(bag, layoutBuilder) {
    _classCallCheck(this, EventDispatcher);

    this.bag = bag;
    this.layoutBuilder = layoutBuilder;
  }

  _createClass(EventDispatcher, [{
    key: "addBestOfferItems",
    value: function addBestOfferItems(items) {
      this.bag.addBestOfferItems(items);
      layoutBuilder.updateDOMBag();
    }
  }, {
    key: "addItemToBag",
    value: function addItemToBag() {
      var id = document.querySelector(".section-item").id;
      var color = this.getItemColor();
      var size = this.getItemSize();
      var item = BagItem.createItem(id, color, size);
      this.bag.addItem(item);
      this.layoutBuilder.updateDOMBag();
    }
  }, {
    key: "getItemSize",
    value: function getItemSize() {
      var result = null;
      var DOMSizes = document.querySelectorAll(".parameter__sizes input");

      for (var i = 0; i < DOMSizes.length; i++) {
        if (DOMSizes[i].checked) result = DOMSizes[i].id;
      }

      return result;
    }
  }, {
    key: "getItemColor",
    value: function getItemColor() {
      var result = null;
      var DOMColors = document.querySelectorAll(".parameter__colors input");

      for (var i = 0; i < DOMColors.length; i++) {
        if (DOMColors[i].checked) result = DOMColors[i].id;
      }

      return result;
    }
  }, {
    key: "addBagListeners",
    value: function addBagListeners() {
      this.addEmptyBagListener();
      this.addChangeQuantityListeners();
      this.addRemoveItemListeners();
      this.addCheckoutListener();
    }
  }, {
    key: "addChangeQuantityListeners",
    value: function addChangeQuantityListeners() {
      var _this2 = this;

      var DOMItems = document.querySelectorAll(".bag-main__item");

      var _loop = function _loop(i) {
        DOMItems[i].addEventListener("click", function (event) {
          if (event.target.className === "item__quantity--decrement") {
            _this2.bag.decreaseItemQuantity(DOMItems[i].id);

            _this2.layoutBuilder.updateDOMItemQuantity(DOMItems[i]);
          }

          if (event.target.className === "item__quantity--increment") {
            _this2.bag.increaseItemQuantity(DOMItems[i].id);

            _this2.layoutBuilder.updateDOMItemQuantity(DOMItems[i]);
          }
        });
      };

      for (var i = 0; i < DOMItems.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "addRemoveItemListeners",
    value: function addRemoveItemListeners() {
      var _this3 = this;

      var DOMItems = document.querySelectorAll(".bag-main__item");

      var _loop2 = function _loop2(i) {
        DOMItems[i].addEventListener("click", function (event) {
          if (event.target.className === "item__remove-btn") {
            _this3.bag.removeItem(DOMItems[i].id);

            _this3.layoutBuilder.removeDOMItem(DOMItems[i]);
          }
        });
      };

      for (var i = 0; i < DOMItems.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "addEmptyBagListener",
    value: function addEmptyBagListener() {
      var _this4 = this;

      var emptyBagBtn = document.querySelector(".checkout__empty-bag");
      emptyBagBtn.addEventListener("click", function () {
        _this4.bag.clearBag();

        _this4.layoutBuilder.updateDOMBagPageOnEmpty();
      });
    }
  }, {
    key: "addCheckoutListener",
    value: function addCheckoutListener() {
      var _this5 = this;

      var checkoutBtn = document.querySelector(".checkout__btn");
      checkoutBtn.addEventListener("click", function () {
        if (_this5.bag.hasItems()) {
          _this5.bag.clearBag();

          _this5.layoutBuilder.updateDOMBagPageOnCheckout();
        }
      });
    }
  }]);

  return EventDispatcher;
}();

var LayoutBuilder = /*#__PURE__*/function () {
  function LayoutBuilder(bag) {
    _classCallCheck(this, LayoutBuilder);

    this.bag = bag;
    this.DOMbag = document.getElementsByClassName("header__bag")[0];
  }

  _createClass(LayoutBuilder, [{
    key: "updateDOMBag",
    value: function updateDOMBag() {
      var quantity = this.bag.getItemsQuantity();
      this.DOMbag.querySelector(".bag__quantity").innerText = quantity;
      var totalPrice = "£" + this.getFormattedTotalPrice();

      if (quantity === 0) {
        this.DOMbag.querySelector(".bag__price").innerText = "";
      } else {
        this.DOMbag.querySelector(".bag__price").innerText = totalPrice;
      }
    }
  }, {
    key: "buildDOMCatalog",
    value: function buildDOMCatalog(catalogItems) {
      var PromoLastWeekendItems = document.querySelector(".promo-last-weekend__items");
      var DOMData = "";

      for (var i = 0; i < 4; i++) {
        DOMData += DOMTemplates.generateCatalogPromoItemTemplate(catalogItems[i]);
      }

      PromoLastWeekendItems.innerHTML = DOMData;
      DOMData = "";
      var DOMCatalogMainItems = document.querySelector(".catalog-main__items");

      for (var _i = 4; _i < catalogItems.length; _i++) {
        DOMData += DOMTemplates.generateCatalogMainItemTemplate(catalogItems[_i]);
      }

      DOMCatalogMainItems.innerHTML = DOMData;
    }
  }, {
    key: "buildDOMBagPage",
    value: function buildDOMBagPage() {
      this.buildDOMBagItemsSection();
      this.updateDOMBagCheckoutSection();
    }
  }, {
    key: "buildDOMBagItemsSection",
    value: function buildDOMBagItemsSection() {
      var DOMBagMainItems = document.querySelector(".bag-main__items");
      var DOMData = "";

      if (this.bag.hasItems()) {
        var items = this.bag.getItems();
        items.forEach(function (item) {
          DOMData += DOMTemplates.generateBagItemTemplate(item);
        });
      } else {
        DOMData = DOMTemplates.generateEmptyBagTemplate();
      }

      DOMBagMainItems.innerHTML = DOMData;
    }
  }, {
    key: "updateDOMBagCheckoutSection",
    value: function updateDOMBagCheckoutSection() {
      var DOMBagCheckout = document.querySelector(".checkout__price");
      DOMBagCheckout.innerHTML = DOMTemplates.generateBagCheckout(this.getFormattedTotalPrice(), this.bag.getTotalDiscount());
    }
  }, {
    key: "updateDOMBagPageOnEmpty",
    value: function updateDOMBagPageOnEmpty() {
      var DOMBagMainItems = document.querySelector(".bag-main__items");
      DOMBagMainItems.innerHTML = DOMTemplates.generateEmptyBagTemplate();
      this.updateDOMBag();
      this.updateDOMBagCheckoutSection();
    }
  }, {
    key: "getFormattedTotalPrice",
    value: function getFormattedTotalPrice() {
      var totalPrice = this.bag.getTotalPrice();
      if (totalPrice > 0) return totalPrice.toFixed(2);else return totalPrice;
    }
  }, {
    key: "updateDOMItemQuantity",
    value: function updateDOMItemQuantity(DOMItem) {
      var itemQuantity = this.bag.getItemQuantity(DOMItem.id);
      if (itemQuantity === 0) this.removeDOMItem(DOMItem);else {
        var DOMItemQuantity = DOMItem.querySelector(".item__data--quantity");
        DOMItemQuantity.innerText = itemQuantity;
      }
      this.updateDOMBag();
      this.updateDOMBagCheckoutSection();
    }
  }, {
    key: "removeDOMItem",
    value: function removeDOMItem(DOMItem) {
      DOMItem.parentNode.removeChild(DOMItem);

      if (this.bag.hasItems()) {
        this.updateDOMBag();
        this.updateDOMBagCheckoutSection();
      } else {
        this.updateDOMBagPageOnEmpty();
      }
    }
  }, {
    key: "updateDOMBagPageOnCheckout",
    value: function updateDOMBagPageOnCheckout() {
      var DOMBagMainItems = document.querySelector(".bag-main__items");
      DOMBagMainItems.innerHTML = DOMTemplates.generateCheckoutTemplate();
      this.updateDOMBag();
      this.updateDOMBagCheckoutSection();
    }
  }]);

  return LayoutBuilder;
}();

var filteredCatalogItems = window.catalog.filter(function (catalogItem) {
  return catalogItem.category === "women" && catalogItem.fashion === "Casual style";
});
filteredCatalogItems.sort(function (item1, item2) {
  return Date.parse(item1.dateAdded) - Date.parse(item2.dateAdded);
});
var currentPage = document.getElementsByTagName("title")[0].innerText;
var bag = Bag.create();
var layoutBuilder = new LayoutBuilder(bag);
var dispatcher = new EventDispatcher(bag, layoutBuilder);
layoutBuilder.updateDOMBag();

if (currentPage.indexOf("Start") >= 0) {
  var buyBestOfferBtn = document.querySelector(".best-offer__btn");
  buyBestOfferBtn.addEventListener("click", function (event) {
    var items = slider.getCurrentItems();
    dispatcher.addBestOfferItems(items);
  });
}

if (currentPage.indexOf("Catalog") >= 0) {
  layoutBuilder.buildDOMCatalog(filteredCatalogItems);
  /* Catalog - show extra items on click "show more" button */

  var DOMShowMoreButton = document.querySelector(".catalog-main__btn");
  var DOMCatalogItems = document.querySelectorAll(".catalog-main__items a");
  DOMShowMoreButton.addEventListener("click", function (event) {
    event.preventDefault();

    for (var i = 0; i < DOMCatalogItems.length; i++) {
      DOMCatalogItems[i].style.display = "block";
    }
  });
}

if (currentPage.indexOf("Item") >= 0) {
  var buyBtn = document.querySelector(".item-buy__btn");
  buyBtn.addEventListener("click", function (event) {
    dispatcher.addItemToBag();
  });
}

if (currentPage.indexOf("Shopping") >= 0) {
  layoutBuilder.buildDOMBagPage();
  dispatcher.addBagListeners();
}
/* Search form sumbission */


var DOMSearchForm = document.querySelector(".header-nav__search");
var DOMSearchFormText = document.querySelector(".search__input");
DOMSearchForm.addEventListener("submit", function (event) {
  var searchMessage = DOMSearchFormText.value;
  alert(searchMessage);
});