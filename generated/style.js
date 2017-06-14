/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(860)


/***/ }),

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(861);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(874)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 861:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports
	exports.i(__webpack_require__(863), "");
	exports.i(__webpack_require__(864), "");
	exports.i(__webpack_require__(865), "");
	exports.i(__webpack_require__(866), "");
	exports.i(__webpack_require__(867), "");
	exports.i(__webpack_require__(868), "");
	exports.i(__webpack_require__(869), "");
	exports.i(__webpack_require__(870), "");
	exports.i(__webpack_require__(871), "");
	exports.i(__webpack_require__(872), "");
	exports.i(__webpack_require__(873), "");

	// module
	exports.push([module.id, "[amorph-image] {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-image: url('/assets/img/loading.gif')\n}\n.gallery-main {\n  height: 200px;\n}\n\n[ng-click]{\n  cursor: pointer;\n}\n\n/*\nbody{\n  padding:0 0 80px 0;\n  overflow-y:scroll;\n    overflow-x:hidden;\n  background-image:none;\n}\ntbody{border-top: none !important}\n\na.glyphicon:hover{text-decoration: none;}\na[href]:not([href*=\"#\"]):not([href=\"\"]):not([href=\".\"]):before\n,a[href]:not([href*=\"#\"]):not([href=\"\"]):not([href=\".\"]):after{\n    content:'\\26a0';color:red;font-weight: bold;padding:0 3px;\n}\n\ninput[type='file'] {\n  color: transparent;\n}\n\ntable{\n    table-layout: fixed\n}\n\ninput[type=\"range\"]{\n    height: 6px;\n    padding: 0;\n    margin-top: 7px;\n}\n\n.input-group select{\n    -webkit-appearance: none;\n}\n\nh3 .btn{float: right}\n\n.mainView{padding:0 10px 10px;}\n\n.nav.nav-tabs{margin-bottom: 20px}\n\n\n.oneliner{\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.short-addr{\n    display: inline-block;\n    max-width: 100px;\n    overflow: hidden;\n    text-overflow:ellipsis;\n}\n\n.text-small{font-size: 14px}\n\n.key{\n  font-family: \"Lucida Console\", Monaco, monospace;\n  font-size: .8em;\n    line-height: 1.42857;\n    word-break: break-all;\n    word-wrap: break-word;\n    color: #333;\n    white-space: pre;\n}\n\n.panel-title{position: relative;}\n\n[ng-click]{cursor: pointer;}\n\n[collapsable]{\n    border-top-width: 4 !important;\n    border-top-style: dotted !important;\n    border-top-color:#ccc !important;\n    cursor: pointer !important;\n    padding-top: 8px;\n}\n[collapsable] tr{background-color: #eee}\n[collapsable]:before{\n    content:'';\n    position: absolute;\n    width:100%;\n    height:10px;\n    margin-top: -4px;\n    cursor: pointer;\n}\n[collapsable].isCollapsed td{display: none}\n[collapsable] tr:first-child td{border-top:none;}\n[collapsable].isCollapsed + tbody{border-top: none !important}\n[collapsable].isCollapsed + tbody tr:first-child td{border-top:none;}\n\n.comment-child{background-color: #eee}\n.update{background-color:#EFF3FA;}\n\n.spin{ animation: spin 2s linear infinite; }\n@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }\n\n.btn:focus {\n  outline: none !important;\n}\n\n.mainTable{width:100%;}\n.push-down{margin-top: 10px}\n\n.image{max-width: 100%; padding: 10px}\n\n.error{ color: red; font-size: 12px; margin: 5px 0; }\n\n[blockie]{\n    display: inline-block;\n    width: 1.6em;\n    height: 1.6em;\n    background-size: cover;\n    background-repeat: no-repeat;\n    border-radius: 50%;\n}\n\n.settings-blockie{\n    font-size: 18px;\n    margin-bottom: -2px;\n}\n\n.navbar [blockie]{\n    font-size: 36px;\n    margin-bottom: -14px;\n    margin-right: 2px;\n}\n\n.navbar{margin-bottom: 0}\n.blockWatcher{\n  padding: 8px;\n  background-color: #f8f8f8;\n  border-bottom: 1px #e7e7e7 solid;\n  margin-bottom: 20px;\n  text-align: center;\n  color: #999;\n  min-height: 37px;\n}\n\n.ellipsis{\n    overflow: hidden;\n    text-overflow:ellipsis;\n    display: inline-block;\n}\n[address] .ellipsis{\n  max-width: 200px;\n}\n\n.monospace {\n  word-wrap: break-word;\n  font-size: small;\n  font-family: monospace;\n  max-height: 100px;\n  overflow: scroll;\n}\n\n.tbody-alternate tbody:not(:last-child){\n    border-bottom: 2px solid #ccc;\n}\n\n.tbody-alternate tbody:not(:last-child):nth-child(even){\n    background-color:#eee;\n}\n\ninput.ng-dirty.ng-invalid {\n  border-color: red\n}\n*/\n", ""]);

	// exports


/***/ }),

/***/ 862:
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*Footer*/\n.footer {\n  margin-top: 5vw;\n}\n\n.footer-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.footer p {\n  font-size: 10px;\n}\n\n.footer-right {\n  display: flex; \n  align-items: center;\n}\n\n.footer-logo {\n  height: 25px; \n  padding-left: 10px;\n}\n/*Footer end*/", ""]);

	// exports


/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-family: 'Montserrat', sans-serif;\n  padding-left: 15.9vw;\n  padding-right: 15.9vw;\n  padding-top: 15px;\n }\n\np {\n   font-size: 12px;\n   line-height: 22px;\n}\n\na {\n  outline: none;\n  text-decoration: none;\n  color: black;\n}\n\na:hover {\n  color:#4990E2;\n}\n\nh4 {\n  font-size: 14px;\n  margin-top: 0;\n  margin-bottom: 0;\n  font-weight: 300;\n}\n\nh6 {\n  font-size: 10px;\n  font-weight: 300;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n/*Nav*/\n.nav-title {\n  font-size: 18px;\n}\n.network-status {\n  display: flex;\n  align-items: center;\n}\n.connected {\n  width: 13px;\n  height: 13px;\n  margin-left: 7px;\n  margin-right: 7px;\n}\n.change-network {\n  font-size: 10px;\n  font-weight: 200;\n  color: #4990E2;\n}\n.status {\n  text-decoration: underline;\n  font-size: 10px;\n  font-weight: 300;\n}\n.nav-right {\n  display: flex;\n  justify-content: flex-end;\n}\n.nav {\n  display: flex;\n  justify-content: space-between;\n}\n.nav-link {\n  font-size: 12px;\n  letter-spacing: 0.6px;\n}\n\n.nav-line {\n  height: 23px;\n  margin-left: 10px;\n}\n.cart-img {\n  height: 15px;\n  margin-left: 10px;\n  margin-right: 5px;\n}\n.cart-group {\n  display: flex;\n  align-items: flex-start;\n}\n.nav-item {\n  margin-left: 30px;\n}\n\n/*Nav end*/\n\n\n/*Maintitle*/\n.main-tittle {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 60px;\n}\n.home-tittle {\n  font-size: 22px;\n  letter-spacing: 3.2px;\n  font-weight: 400;\n}\n.home-sublink {\n  font-size: 12px;\n  letter-spacing: 1.75px;\n  font-weight: 300;\n  margin-bottom: 40px;\n  margin-top: 10px;\n}\n.searchbar {\n  border: 1px #9B9B9B solid;\n  width: 807px;\n  height: 40px;\n  color: #979797;\n  display: flex;\n  align-items: center;\n  font-weight: 300;\n}\n.alpha {\n  margin-top: 10px;\n  margin-bottom: 25px;\n}\n\n/*Maintitle End*/\n\n/*Feature*/\n.Feature {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  margin-top: 20px;\n}\n.feature-img {\n  height: 32px;\n  margin-right: 23px;\n  margin-top: 5px;\n}\n.feature-title {\n  margin-bottom: 10px;\n  font-weight: 400;\n}\n.feature-description {\n  width: 218px;\n}\n.feature-grid {\n  display: flex;\n  align-items: flex-start;\n}\n/*Feature ends*/\n\n/*Featured stores*/\n\n.featured-stores-tittle{\n  font-weight: 400;\n  text-align: center;\n  margin-top: 80px;\n  margin-bottom: 40px;\n}\n.featured-stores{\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n.store-img {\n  height: 270px;\n  margin-bottom: 10px;\n}\n.store-name {\n  font-weight: 400;\n}\n.store-description {\n  width: 203px;\n  margin-top: 10px;\n}", ""]);

	// exports


/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-family: 'Montserrat', sans-serif;\n  padding-left: 15.9vw;\n  padding-right: 15.9vw;\n  padding-top: 15px;\n }\n\np {\n   font-size: 12px;\n   line-height: 22px;\n   font-weight: 400;\n}\n\na {\n  outline: none;\n  text-decoration: none;\n  color: black;\n}\n\na:hover {\n  color:#4990E2;\n}\n\nh3 {\n  font-size: 18px;\n  font-weight: 300;\n  margin-top: 50px;\n}\n\nh4 {\n  font-size: 14px;\n  margin-top: 0;\n  margin-bottom: 0;\n  font-weight: 300;\n}\n\nh6 {\n  font-size: 10px;\n  font-weight: 300;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.separate-line {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\n/*Nav*/\n.nav-title {\n  font-size: 18px;\n}\n.network-status {\n  display: flex;\n  align-items: center;\n  margin-top: 20px;\n}\n.connected {\n  width: 13px;\n  height: 13px;\n  margin-left: 7px;\n  margin-right: 7px;\n}\n.change-network {\n  font-size: 10px;\n  font-weight: 200;\n  color: #4990E2;\n}\n.status {\n  text-decoration: underline;\n  font-size: 10px;\n  font-weight: 300;\n}\n.nav-right {\n  display: flex;\n  justify-content: flex-end;\n}\n.nav {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 70px;\n}\n.nav-link {\n  font-size: 12px;\n  letter-spacing: 0.6px;\n}\n\n.nav-line {\n  height: 23px;\n  margin-left: 10px;\n}\n.cart-img {\n  height: 15px;\n  margin-left: 10px;\n  margin-right: 5px;\n}\n.cart-group {\n  display: flex;\n  align-items: flex-start;\n}\n.nav-item {\n  margin-left: 30px;\n}\n\n/*Nav end*/\n\n/*Nav V2 with Searchbar*/\n.nav-searchbar {\n  display: flex;\n  align-items: center;\n  padding-left: 5px;\n  border: 1px solid #979797;\n  width: 223px;\n  height: 34px;\n  margin-left: 121px;\n\n}\n.nav-left-top {\n  display: flex;\n}\n.nav-search-bar {\n  height: 18px;\n  margin-right: 8px;\n}\n.nav-search-input {\n  color: #979797;\n  font-size: 11px;\n}\n/*Nav V2 ended*/\n\n/*Maintitle*/\n.main-tittle {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 60px;\n}\n.home-tittle {\n  font-size: 22px;\n  letter-spacing: 3.2px;\n  font-weight: 400;\n  text-align: center;\n}\n.home-sublink {\n  font-size: 12px;\n  letter-spacing: 1.75px;\n  font-weight: 300;\n  margin-bottom: 40px;\n  margin-top: 10px;\n  text-align: center;\n}\n/*.searchbar {\n  border: 1px #9B9B9B solid;\n  width: 807px;\n  height: 40px;\n  color: #979797;\n  display: flex;\n  align-items: center;\n  font-weight: 300;\n  padding-left: 15px;\n}*/\n\n.search2 {\n  left: 396px; top: 153px; width: 807px; height: 40px; padding-left: 15px;\n}\n\n.alpha {\n  margin-top: 10px;\n  margin-bottom: 25px;\n}\n\n/*Maintitle End*/\n\n/*Feature*/\n.Feature {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 40px;\n}\n.feature-img {\n  height: 32px;\n  margin-right: 23px;\n}\n.feature-title {\n  margin-bottom: 10px;\n  font-weight: 400;\n}\n.feature-description {\n  width: 218px;\n}\n.feature-grid {\n  display: flex;\n  align-items: flex-start;\n}\n/*Feature ends*/\n\n/*Featured stores*/\n.featured-stores-tittle{\n  font-weight: 400;\n  text-align: center;\n  margin-top: 80px;\n  margin-bottom: 40px;\n}\n.featured-stores {\n  display: flex;\n  justify-content: space-between;\n}\n.store-img {\n  height: 270px;\n  margin-bottom: 10px;\n}\n.featured-store-name {\n  font-weight: 400;\n  font-size: 14px;\n}\n.store-description {\n  width: 203px;\n  margin-top: 10px;\n}\n\n/*-----------------------------Store page ---------------------------------*/\n/*Store header*/\n.store-name {\n  font-size: 30px;\n  font-weight: 400;\n  margin-bottom: 10px;\n}\n.store-description {\n  font-weight: 400px;\n}\n.info-icon {\n  height: 17px;\n  margin-top: 14px;\n  margin-right: 10px;\n}\n.info-text {\n  font-weight: 300;\n  font-size: 12px;\n  margin-top: 15px;\n}\n.store-header-grid {\n  display: flex;\n  margin-right: 30px;\n}\n.store-header-info {\n  display: flex;\n}\n/*Store header end*/\n\n/*Store anchors*/\n.store-anchors {\n  display: flex;\n  align-items: center;\n  border: 1px solid black;\n  width: 980px;\n  height: 48px;\n  margin-top: 40px;\n}\n.page-anchor {\n  margin-left: 40px;\n  font-weight: 400;\n  font-size: 14px;\n}\n/*Store anchors*/\n\n/*Products*/\n.Products-section {\n  display: flex;\n  flex-wrap: wrap;\n}\n.product-overview {\n  height: 289px;\n  width: 235px;\n  background-color: #F7F8F9;\n  margin-top: 50px;\n  margin-right: 5px;\n}\n.product-overview-img {\n  width: 235px;\n  height: 158px;\n}\n\n.product-price {\n  font-weight: 300;\n}\n.add-to-cart-btn {\n  font-size: 10px;\n  border: 1px solid black;\n  width: 94px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.product-description {\n  margin-left: 10px;\n}\n/*Products End*/\n\n/*Orders Table*/\n.table-row-header {\n  display: flex;\n  align-items: center;\n  width: 980px;\n  height: 33px;\n}\n.header {\n  font-weight: 400;\n  width: 180px;\n  margin-right: 20px;\n}\n.table-row {\n  display: flex;\n  align-items: center;\n  width: 980px;\n  height: 33px;\n}\n.single {\n  background-color: #F7F8F9;\n}\n.text {\n  width: 180px;\n  margin-right: 20px;\n  font-weight: 300;\n}\n\n/*Orders Table end*/\n\n/*About section*/\n.info-grid {\n  display: flex;\n  flex-wrap: wrap;\n}\n.info-left {\n  width: 247px;\n}\n.info-right {\n  width: 383px;\n}\n.info-text {\n  font-weight: 300;\n}\n.eth-alt {\n  margin-left: 15px;\n  color: #6B6B6B;\n}\n.ques-hover {\n  width: 13px;\n  margin-left: 5px;\n}\n.question {\n  display: flex;\n  align-items: center;\n}\n.polices-header {\n  text-transform: uppercase;\n  font-weight: 300;\n}\n\n/*----------------------------Product Page-----------------------*/\n.product-page {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n/*Product preview gallery*/\n.product-gallery {\ndisplay: flex;\nflex-direction: column;\nwidth: 405px;\nmargin-right: 30px;\n}\n.gallery-main {\n  width: 100%;\n}\n.gallery-preview {\n  display: flex;\n}\n.product-previews {\n  width: 90px;\n  height: 81px;\n  margin-top: 10px;\n  margin-right: 10px;\n}\n.store-brif-name {\n  font-size: 18px;\n  font-weight: 400;\n}\n.store-brif-description {\n  font-weight: 300;\n}\n.store-brif {\n  margin-top: 30px;\n}\n/*Product preview gallery end*/\n\n/*Product info section, right*/\n.product-name {\n  font-size: 24px;\n  font-weight: 400;\n  margin-top: 0px;\n}\n.product-price-usd {\n  font-size: 18px;\n  font-weight: 400;\n  margin-bottom: 0px;\n}\n\n.product-price-eth {\n  font-size: 12px;\n  font-weight: 400;\n  color: #979797;\n  margin-top: 5px;\n}\n.availability {\n  font-size: 12px;\n  font-weight: 300;\n  margin-bottom: 7px;\n  margin-top: 35px;\n}\n.quantity-text {\n  font-size: 12px;\n  font-weight: 400;\n  margin-right: 15px;\n}\n.quantity {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\n/*Selection box*/\n.qty {\n  width: 69px;\n  height: 23px;\n}\ninput.qtyplus { width:40px; height:25px;}\ninput.qtyminus { width:40px; height:25px;}\n/*Selection box end*/\n.buy-cart-btns {\n  display: flex;\n  flex-wrap: wrap;\n}\n.product-btn {\n  font-size: 12px;\n  font-weight: 400;\n  border: 1px solid black;\n  width: 139px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.left-btn {\n  margin-right: 10px;\n}\n\n/*Product-page-nav*/\n.product-nav {\n  width: 515px;\n}\n\n.product-nav-ul li {\n  display: inline;\n}\n.product-nav-ul {\n  padding-left: 0;\n}\n\n.inpage-nav {\n  display: inline-block;\n  width: 130px;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n.shipping:hover ~ hr {\n  margin-left: 130px;\n}\n\n.return-policy:hover ~ hr {\n  margin-left: 260px;\n}\n\n.inpage-hr {\n  height: 2px;\n  width: 130px;\n  background-color: black;\n  border: none;\n  transition: .3s ease-in-out;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 10px;\n}\n.product-nav-description {\n  font-size: 12px;\n  font-weight: 300;\n}\n\n/*----------------------Cart Page-----------------*/\n.cart-items-text {\n  margin-top: 0px;\n}\n.sml-btn-text {\n  font-size: 12px;\n  font-weight: 400px;\n}\n.sml-btn {\n  border: 2px black solid;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.keep-shopping {\n  width: 151px;\n  height: 35px;\n}\n.cart-row-1 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n/*  flex-shrink: 0;*/\n}\n.cart-text {\n  font-weight: 400;\n}\n.remove-btn {\n  font-size: 12px;\n  color: #4990E2;\n  font-weight: 300;\n}\n.cart-order-left {\n\n}\n.cart-order-product {\n  display: flex;\n  align-items: flex-start;\n  margin-top: 15px;\n}\n.order-quan {\n  margin-bottom: 0px;\n}\n.product-sml {\n  height: 109px;\n  margin-right: 20px;\n  width: 100px;\n}\n.cart-price {\n  margin-bottom: 10px;\n}\n.cart-order-totalprice-usd {\n  font-size: 18px;\n  font-weight: 400;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.cart-order-totalprice-eth {\n  font-size: 12px;\n  color: #6B6B6B;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.proceedto-checkout {\n  width: 194px;\n  height: 34px;\n  margin-top: 30px;\n}\n.cart-order-right {\n  border-left: 1px #979797 solid;\n  padding-left: 20px;\n}\n.cart-storeorder {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  border: 1px black solid;\n  padding-left: 20px;\n  padding-top: 25px;\n  padding-right: 60px;\n  padding-bottom: 25px;\n  margin-top: 20px;\n  min-width: 710px;\n}\n.cart-contact-icon {\n  margin-top: 10px;\n}\n.cart-contact-text {\n  margin-top: 10px;\n}\n.cart-container {\n  min-width: 792px;\n}\n\n/*----------------------checktou-shipping-------------*/\n.stepper-container {\n  width: 520px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.stepper-shipping-img {\n  width: 505px;\n}\n.stepper-text {\n  font-size: 10px;\n  font-weight: 300;\n  opacity: 0.36;\n}\n.stepper-text-container {\n  width: 520px;\n  display: flex;\n  justify-content: space-between;\n}\n.inputbox-text {\n  font-size: 14px;\n}\n.placeholder {\n  color: #9B9B9B;\n  font-size: 12px;\n  font-weight: 300;\n}\n.shipping-address {\n  width: 510px;\n  height: 94px;\n  border-color: black;\n  padding: 10px;\n}\n.transport-input {\n  border-radius: 0px;\n  width: 510px;\n  height: 38px;\n  border: 2px black solid;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.question-icon {\n  width: 15px;\n  height: 15px;\n  margin-top: 16px;\n  margin-left: 10px;\n}\n.buffer {\n  display: flex;\n}\n.checkout-btn-left {\n  width: 194px;\n  height: 40px;\n  background-color: black;\n}\n.checkout-btn-right {\n  width: 194px;\n  height: 40px;\n  margin-left: 20px;\n}\n.ml-btn-left {\n  font-size: 14px;\n  color: white;\n}\n.ml-btn-right {\n  font-size: 14px;\n  color: black;\n}\n.btns {\n  display: flex;\n  margin-top: 20px;\n}\n.checkout-order-container {\n  width: 300px;\n  padding: 20px;\n  padding-bottom: 40px;\n  border: 1px black solid;\n}\n.checkout-order-warp {\n  display: flex;\n  justify-content: space-between;\n}\n.checkout-order-text {\n  font-size: 12px;\n  font-weight: 300;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.checkout-order-img {\n  width: 91px;\n  height: 65px;\n  margin-right: 20px;\n}\n.checkout-order-productinfo {\n  display: flex;\n  align-items: flex-start;\n  margin-top: 15px;\n}\n.order-number {\n  margin-bottom: 20px;\n}\n.checkout-order-price-total {\n  font-size: 18px;\n  font-weight: 400;\n  margin-bottom: 0px;\n}\n.checkout-order-price-eth {\n  font-size: 14px;\n  font-weight: 400;\n  color: #6B6B6B;\n  margin-top: 0px;\n}\n.checkout-order-price {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.checkout-order-edit {\n  font-size: 12px;\n  font-weight: 300;\n  color: #4990E2;\n  margin-top: 20px;\n}\n.checkout-ship {\n  display: flex;\n  justify-content: space-between;\n}\n.checkout-ship-left {\n  margin-right: 30px;\n}\n\n/*Footer*/\n.footer {\n  margin-top: 5vw;\n}\n\n.footer-container {\n  display: flex;\n  justify-content: space-between;\n}\n\n.footer p {\n  font-size: 10px;\n}\n\n.footer-right {\n  display: flex;\n  align-items: center;\n}\n\n.footer-logo {\n  height: 25px;\n  padding-left: 10px;\n}\n/*Footer end*/\n", ""]);

	// exports


/***/ }),

/***/ 866:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*Nav V2 with Searchbar*/\n.nav-searchbar {\n  display: flex;\n  align-items: center;\n  padding-left: 5px;\n  border: 1px solid #979797;\n  width: 223px;\n  height: 34px;\n  margin-left: 121px;\n\n}\n.nav-left-top {\n  display: flex;\n}\n.nav-search-bar {\n  height: 18px;\n  margin-right: 8px;\n}\n.nav-search-input {\n  color: #979797;\n  font-size: 11px;\n}\n/*Nav V2 ended*/\n\n/*Nav*/\n.nav-title {\n  font-size: 18px;\n}\n.network-status {\n  display: flex;\n  align-items: center;\n}\n.connected {\n  width: 13px;\n  height: 13px;\n  margin-left: 7px;\n  margin-right: 7px;\n}\n.change-network {\n  font-size: 10px;\n  font-weight: 200;\n  color: #4990E2;\n}\n.status {\n  text-decoration: underline;\n  font-size: 10px;\n  font-weight: 300;\n}\n.nav-right {\n  display: flex;\n  justify-content: flex-end;\n}\n.nav {\n  display: flex;\n  justify-content: space-between;\n}\n.nav-link {\n  font-size: 12px;\n  letter-spacing: 0.6px;\n}\n\n.nav-line {\n  height: 23px;\n  margin-left: 10px;\n}\n.cart-img {\n  height: 15px;\n  margin-left: 10px;\n  margin-right: 5px;\n}\n.cart-group {\n  display: flex;\n  align-items: flex-start;\n}\n.nav-item {\n  margin-left: 30px;\n}\n\n/*Nav end*/", ""]);

	// exports


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*Nav*/\n.nav-title {\n  font-size: 18px;\n}\n.network-status {\n  display: flex;\n  align-items: center;\n}\n.connected {\n  width: 13px;\n  height: 13px;\n  margin-left: 7px;\n  margin-right: 7px;\n}\n.change-network {\n  font-size: 10px;\n  font-weight: 200;\n  color: #4990E2;\n}\n.status {\n  text-decoration: underline;\n  font-size: 10px;\n  font-weight: 300;\n}\n.connection-status {\n  margin-top: 15px;\n}\n.nav-right {\n  display: flex;\n  justify-content: flex-end;\n}\n.nav {\n  display: flex;\n  justify-content: space-between;\n}\n.nav-link {\n  font-size: 12px;\n  letter-spacing: 0.6px;\n}\n\n.nav-line {\n  height: 23px;\n  margin-left: 10px;\n}\n.cart-img {\n  height: 15px;\n  margin-left: 10px;\n  margin-right: 5px;\n}\n.cart-group {\n  display: flex;\n  align-items: flex-start;\n}\n.nav-item {\n  margin-left: 30px;\n}\n\n/*Nav end*/", ""]);

	// exports


/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/* ---- reset ---- */\n\n", ""]);

	// exports


/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*Product page css*/\n\n.product-page {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n/*Product preview gallery*/\n.product-gallery {\ndisplay: flex;\nflex-direction: column;\nwidth: 405px;\nmargin-right: 30px;\n}\n.gallery-main {\n  width: 100%;\n}\n.gallery-preview {\n  display: flex;\n}\n.product-previews {\n  width: 90px;\n  height: 81px;\n  margin-top: 10px;\n  margin-right: 10px;\n}\n.store-brif-name {\n  font-size: 18px;\n  font-weight: 400;\n}\n.store-brif-description {\n  font-weight: 300;\n}\n.store-brif {\n  margin-top: 30px;\n}\n/*Product preview gallery end*/\n\n/*Product info section, right*/\n.product-name {\n  font-size: 24px;\n  font-weight: 400;\n  margin-top: 0px;\n}\n.product-price-usd {\n  font-size: 18px;\n  font-weight: 400;\n  margin-bottom: 0px;\n}\n\n.product-price-eth {\n  font-size: 12px;\n  font-weight: 400;\n  color: #979797;\n  margin-top: 5px;\n}\n.availability {\n  font-size: 12px;\n  font-weight: 300;\n  margin-bottom: 7px;\n  margin-top: 35px;\n}\n.quantity-text {\n  font-size: 12px;\n  font-weight: 400;\n  margin-right: 15px;\n}\n.quantity {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\n/*Selection box*/\n.qty {\n  width: 69px;\n  height: 23px;\n}\ninput.qtyplus { width:40px; height:25px;}\ninput.qtyminus { width:40px; height:25px;}\n/*Selection box end*/\n.buy-cart-btns {\n  display: flex;\n  flex-wrap: wrap;\n}\n.product-btn {\n  font-size: 12px;\n  font-weight: 400;\n  border: 1px solid black;\n  width: 139px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.left-btn {\n  margin-right: 10px;\n}\n\n/*Product-page-nav*/\n.product-nav {\n  width: 515px;\n}\n\n.product-nav-ul li {\n  display: inline;\n}\n.product-nav-ul {\n  padding-left: 0;\n}\n\n.inpage-nav {\n  display: inline-block;\n  width: 130px;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n.shipping:hover ~ hr {\n  margin-left: 130px;\n}\n\n.return-policy:hover ~ hr {\n  margin-left: 260px;\n}\n\n.inpage-hr {\n  height: 2px;\n  width: 130px;\n  background-color: black;\n  border: none;\n  transition: .3s ease-in-out;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 10px;\n}\n.product-nav-description {\n  font-size: 12px;\n  font-weight: 300;\n}\n\n.showcase {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: rgba(255,255,255,.7);\n}\n", ""]);

	// exports


/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*Store header*/\n.store-name {\n  font-size: 30px;\n  font-weight: 400;\n  margin-bottom: 10px;\n  margin-top: 70px;\n}\n.store-description {\n  font-weight: 400px;\n}\n.info-icon {\n  height: 17px;\n  margin-top: 14px;\n  margin-right: 10px;\n}\n.info-text {\n  font-weight: 300;\n}\n.store-header-grid {\n  display: flex;\n  margin-right: 30px;\n}\n.store-header-info {\n  display: flex;\n}\n/*Store header end*/\n\n/*Store anchors*/\n.store-anchors {\n  display: flex;\n  align-items: center;\n  border: 1px solid black;\n  width: 980px;\n  height: 48px;\n  margin-top: 40px;\n}\n.page-anchor {\n  margin-left: 40px;\n  font-weight: 400;\n  font-size: 14px;\n}\n/*Store anchors*/\n\n/*Products*/\n.Products-section {\n  display: flex;\n  flex-wrap: wrap;\n}\n.product-overview {\n  height: 289px;\n  width: 235px;\n  margin-top: 50px;\n  margin-right: 5px;\n}\n.product-overview-img {\n  width: 235px;\n  height: 158px;\n}\n\n.product-price {\n  font-weight: 300;\n}\n.add-to-cart-btn {\n  font-size: 10px;\n  border: 1px solid black;\n  width: 94px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.product-description {\n  margin-left: 10px;\n}\n/*Products End*/\n\n/*Orders Table*/\n.table-row-header {\n  display: flex;\n  align-items: center;\n  width: 980px;\n  height: 33px;\n}\n.header {\n  font-weight: 400;\n  width: 180px;\n  margin-right: 20px;\n}\n.table-row {\n  display: flex;\n  align-items: center;\n  width: 980px;\n  height: 33px;\n}\n.single {\n  background-color: #F7F8F9;\n}\n.text {\n  width: 180px;\n  margin-right: 20px;\n  font-weight: 300;\n}\n\n/*Orders Table end*/\n\n/*About section*/\n.info-grid {\n  display: flex;\n  flex-wrap: wrap;\n}\n.info-left {\n  width: 247px;\n}\n.info-right {\n  width: 383px;\n}\n.info-text {\n  font-weight: 300;\n}\n.eth-alt {\n  margin-left: 15px;\n  color: #6B6B6B;\n}\n.ques-hover {\n  width: 13px;\n  margin-left: 5px;\n}\n.question {\n  display: flex;\n  align-items: center;\n}\n.polices-header {\n  text-transform: uppercase;\n  font-weight: 300;\n}\n", ""]);

	// exports


/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "@media (max-width: 414px) {\nbody {\n    padding-left: 1vw;\n    padding-right: 1vw;\n   }\n.cart-row-1 {\n\tdisplay: initial;\n}\n.cart-container {\n\tmin-width: 0;\n}\n.cart-order-product{\n\tflex-direction: column;\n  }\n.cart-storeorder {\n    flex-direction: column;\n    min-width: 0;\n    padding-right: 20px;\n}\n.cart-order-right {\n\tborder-left: none;\n\tborder-top: 1px #979797 solid;\n\tmargin-top: 15px;\n\tpadding-left: 0px;\n\tpadding-top: 10px;\n\n}\n.cart-order-totalprice {\n\tdisplay: flex;\n}\n.cart-order-totalprice-eth {\n\tmargin-left: 10px;\n}\n\n}\n", ""]);

	// exports


/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, ".loader {\n  color: #000000;\n  font-size: 10px;\n  margin: 100px auto;\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: load4 1.3s infinite linear;\n  animation: load4 1.3s infinite linear;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n}\n@-webkit-keyframes load4 {\n  0%,\n  100% {\n    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n  }\n  12.5% {\n    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n  }\n  25% {\n    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n  }\n  37.5% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n  }\n  50% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n  }\n  62.5% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n  }\n  75% {\n    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n  }\n  87.5% {\n    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n  }\n}\n@keyframes load4 {\n  0%,\n  100% {\n    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n  }\n  12.5% {\n    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n  }\n  25% {\n    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n  }\n  37.5% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n  }\n  50% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n  }\n  62.5% {\n    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n  }\n  75% {\n    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n  }\n  87.5% {\n    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n  }\n}\n", ""]);

	// exports


/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(862)();
	// imports


	// module
	exports.push([module.id, "/*\r\n * Toastr\r\n * Version 2.0.1\r\n * Copyright 2012 John Papa and Hans Fjallemark.  \r\n * All Rights Reserved.  \r\n * Use, reproduction, distribution, and modification of this code is subject to the terms and \r\n * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php\r\n *\r\n * Author: John Papa and Hans Fjallemark\r\n * Project: https://github.com/CodeSeven/toastr\r\n */\r\n.toast-title {\r\n  font-weight: bold;\r\n}\r\n.toast-message {\r\n  -ms-word-wrap: break-word;\r\n  word-wrap: break-word;\r\n}\r\n.toast-message a,\r\n.toast-message label {\r\n  color: #ffffff;\r\n}\r\n.toast-message a:hover {\r\n  color: #cccccc;\r\n  text-decoration: none;\r\n}\r\n\r\n.toast-close-button {\r\n  position: relative;\r\n  right: -0.3em;\r\n  top: -0.3em;\r\n  float: right;\r\n  font-size: 20px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  -webkit-text-shadow: 0 1px 0 #ffffff;\r\n  text-shadow: 0 1px 0 #ffffff;\r\n  opacity: 0.8;\r\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);\r\n  filter: alpha(opacity=80);\r\n}\r\n.toast-close-button:hover,\r\n.toast-close-button:focus {\r\n  color: #000000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  opacity: 0.4;\r\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);\r\n  filter: alpha(opacity=40);\r\n}\r\n\r\n/*Additional properties for button version\r\n iOS requires the button element instead of an anchor tag.\r\n If you want the anchor version, it requires `href=\"#\"`.*/\r\nbutton.toast-close-button {\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n  -webkit-appearance: none;\r\n}\r\n.toast-top-full-width {\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-bottom-full-width {\r\n  bottom: 0;\r\n  right: 0;\r\n  width: 100%;\r\n}\r\n.toast-top-left {\r\n  top: 12px;\r\n  left: 12px;\r\n}\r\n.toast-top-center {\r\n  top: 12px;\r\n}\r\n.toast-top-right {\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n.toast-bottom-right {\r\n  right: 12px;\r\n  bottom: 12px;\r\n}\r\n.toast-bottom-center {\r\n  bottom: 12px;\r\n}\r\n.toast-bottom-left {\r\n  bottom: 12px;\r\n  left: 12px;\r\n}\r\n.toast-center {\r\n  top: 45%;\r\n}\r\n#toast-container {\r\n  position: fixed;\r\n  z-index: 999999;\r\n  pointer-events: auto;\r\n  /*overrides*/\r\n\r\n}\r\n#toast-container.toast-center,\r\n#toast-container.toast-top-center,\r\n#toast-container.toast-bottom-center{\r\n  width: 100%;\r\n  pointer-events: none;\r\n}\r\n#toast-container.toast-center > div,\r\n#toast-container.toast-top-center > div,\r\n#toast-container.toast-bottom-center > div{\r\n  margin: auto;\r\n  pointer-events: auto;\r\n}\r\n#toast-container.toast-center > button,\r\n#toast-container.toast-top-center > button,\r\n#toast-container.toast-bottom-center > button{\r\n  pointer-events: auto;\r\n}\r\n#toast-container * {\r\n  -moz-box-sizing: border-box;\r\n  -webkit-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\n#toast-container > div {\r\n  margin: 0 0 6px;\r\n  padding: 15px 15px 15px 50px;\r\n  width: 300px;\r\n  -moz-border-radius: 3px 3px 3px 3px;\r\n  -webkit-border-radius: 3px 3px 3px 3px;\r\n  border-radius: 3px 3px 3px 3px;\r\n  background-position: 15px center;\r\n  background-repeat: no-repeat;\r\n  -moz-box-shadow: 0 0 12px #999999;\r\n  -webkit-box-shadow: 0 0 12px #999999;\r\n  box-shadow: 0 0 12px #999999;\r\n  color: #ffffff;\r\n  opacity: 0.8;\r\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);\r\n  filter: alpha(opacity=80);\r\n}\r\n#toast-container > :hover {\r\n  -moz-box-shadow: 0 0 12px #000000;\r\n  -webkit-box-shadow: 0 0 12px #000000;\r\n  box-shadow: 0 0 12px #000000;\r\n  opacity: 1;\r\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\r\n  filter: alpha(opacity=100);\r\n  cursor: pointer;\r\n}\r\n#toast-container > .toast-info {\r\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=\") !important;\r\n}\r\n#toast-container > .toast-wait {\r\n  background-image: url(\"data:image/gif;base64,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\") !important;\r\n}\r\n#toast-container > .toast-error {\r\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=\") !important;\r\n}\r\n#toast-container > .toast-success {\r\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==\") !important;\r\n}\r\n#toast-container > .toast-warning {\r\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=\") !important;\r\n}\r\n#toast-container.toast-top-full-width > div,\r\n#toast-container.toast-bottom-full-width > div {\r\n  width: 96%;\r\n  margin: auto;\r\n}\r\n.toast {\r\n  background-color: #030303;\r\n}\r\n.toast-success {\r\n  background-color: #51a351;\r\n}\r\n.toast-error {\r\n  background-color: #bd362f;\r\n}\r\n.toast-info {\r\n  background-color: #2f96b4;\r\n}\r\n.toast-wait {\r\n  background-color: #2f96b4;\r\n}\r\n.toast-warning {\r\n  background-color: #f89406;\r\n}\r\n/*Responsive Design*/\r\n@media all and (max-width: 240px) {\r\n  #toast-container > div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 11em;\r\n  }\r\n  #toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n}\r\n  }\r\n@media all and (min-width: 241px) and (max-width: 480px) {\r\n  #toast-container  > div {\r\n    padding: 8px 8px 8px 50px;\r\n    width: 18em;\r\n  }\r\n  #toast-container .toast-close-button {\r\n    right: -0.2em;\r\n    top: -0.2em;\r\n}\r\n}\r\n@media all and (min-width: 481px) and (max-width: 768px) {\r\n  #toast-container > div {\r\n    padding: 15px 15px 15px 50px;\r\n    width: 25em;\r\n  }\r\n}\r\n\r\n /*\r\n  * AngularJS-Toaster\r\n  * Version 0.3\r\n */\r\n:not(.no-enter)#toast-container > div.ng-enter,\r\n:not(.no-leave)#toast-container > div.ng-leave\r\n{ \r\n    -webkit-transition: 1000ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -moz-transition: 1000ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -ms-transition: 1000ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -o-transition: 1000ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    transition: 1000ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n} \r\n\r\n:not(.no-enter)#toast-container > div.ng-enter.ng-enter-active, \r\n:not(.no-leave)#toast-container > div.ng-leave {\r\n    opacity: 0.8;\r\n}\r\n\r\n:not(.no-leave)#toast-container > div.ng-leave.ng-leave-active,\r\n:not(.no-enter)#toast-container > div.ng-enter {\r\n    opacity: 0;\r\n}", ""]);

	// exports


/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })

/******/ });