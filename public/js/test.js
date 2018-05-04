/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./src/tablefilter.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableFilter = function () {
	function TableFilter(target) {
		_classCallCheck(this, TableFilter);

		var el = target.tagName ? target : document.getElementById(target);
		if (!el || el.tagName != "TABLE") {
			throw new Error('Element must be a table');
		}
		this.el = el;
		this.selecteds = [];
		this.ranges = [];
		this.init();
	}

	_createClass(TableFilter, [{
		key: "init",
		value: function init() {
			var firstRow = this.el.rows[0];
			if (!firstRow) {
				return;
			}
			for (var i = 0; i < firstRow.cells.length; i++) {
				if (firstRow.cells[i].dataset["filter"] == "true") {
					firstRow.cells[i].className += " columnfilter";
					var div = document.createElement("div");
					div.className = "filterObj";
					var filterTip = document.createElement("div");
					filterTip.className = "filterTip";
					div.appendChild(filterTip);
					div.addEventListener("click", function () {
						event.stopPropagation();
					}, false);
					filterTip.addEventListener('click', this.onClick.bind(this), false);
					firstRow.cells[i].appendChild(div);
				}
			}
		}
	}, {
		key: "onClick",
		value: function onClick(event) {
			var filterObj = event.currentTarget.parentNode;
			var filterList = filterObj.getElementsByClassName("filterList");
			if (!filterList.length) {
				var columnIndex = this.getColumnIndex(filterObj);
				filterList = this.createFilterList(columnIndex);
				filterObj.appendChild(filterList);
			} else {
				filterList = filterList[0];
			}
			if (filterList.style.display == "block") {
				filterList.style.display = "none";
			} else {
				filterList.style.display = "block";
			}
			for (var i = 0; i < this.el.rows.length; i++) {
				var fl = document.getElementById("filterList-" + i);
				if (fl && fl != filterList) {
					fl.style.display = "none";
				}
			}
			event.stopPropagation();
		}
	}, {
		key: "getColumnIndex",
		value: function getColumnIndex(filterObj) {
			var firstRow = this.el.rows[0];
			var cell = filterObj.parentNode;
			for (var i = 0; i < firstRow.cells.length; i++) {
				if (firstRow.cells[i] == cell) {
					return i;
				}
			}
		}
	}, {
		key: "createFilterList",
		value: function createFilterList(columnIndex) {
			var selects = {};
			for (var i = 1; i < this.el.rows.length; i++) {
				// if(this.el.rows[i].style.display != "none") {
				selects[this.el.rows[i].cells[columnIndex].innerText.trim()] = 1;
				// }
			}
			var filterList = document.createElement("div");
			filterList.id = "filterList-" + columnIndex;
			if (columnIndex > this.el.rows[0].cells.length / 2) {
				filterList.style.right = "3px";
			} else {
				filterList.style.left = "3px";
			}
			filterList.className = "filterList";

			filterList.innerHTML = '<div class="filterItem">按条件过滤</div>\
<div class="filterCond">\
    <div><label>从:<label><input type="text" name="filterInput"></label></label></div>\
    <div><label>到:<label><input type="text" name="filterInput"></label></label></div>\
</div>\
<div class="filterItem">按值过滤</div>';

			var filterScroll = document.createElement("div");
			filterScroll.className = "filterScroll";
			for (var item in selects) {
				var filterItem = document.createElement("div");
				filterItem.className = "filterItem";
				filterItem.innerHTML = '<label> <input type="checkbox" name="filterCheckbox" value="">' + item + '</label>';
				filterScroll.appendChild(filterItem);
			}
			filterList.appendChild(filterScroll);

			var filterBtns = document.createElement("div");
			filterBtns.className = "filterBtns";
			var okBtn = document.createElement("button");
			okBtn.innerText = "确定";
			okBtn.setAttribute("data-index", columnIndex);
			okBtn.addEventListener("click", this.onOkClick.bind(this), false);
			filterBtns.appendChild(okBtn);
			var cancelBtn = document.createElement("button");
			cancelBtn.innerText = "取消";
			cancelBtn.setAttribute("data-index", columnIndex);
			cancelBtn.addEventListener("click", function () {
				var columnIndex = event.currentTarget.dataset.index;
				document.getElementById("filterList-" + columnIndex).style.display = "none";
				event.stopPropagation();
			}, false);
			filterBtns.appendChild(cancelBtn);
			filterList.appendChild(filterBtns);
			return filterList;
		}
	}, {
		key: "onOkClick",
		value: function onOkClick(event) {
			var startTime = new Date();
			var columnIndex = event.currentTarget.dataset.index;
			var filterList = document.getElementById("filterList-" + columnIndex);

			var range = { min: null, max: null };
			var inputs = filterList.getElementsByTagName("input");
			if (inputs[0].value) {
				range.min = isNaN(inputs[0].value) ? inputs[0].value : parseFloat(inputs[0].value);
			}
			if (inputs[1].value) {
				range.max = isNaN(inputs[1].value) ? inputs[1].value : parseFloat(inputs[1].value);
			}

			var selected = {};

			for (var i = 2; i < inputs.length; i++) {
				if (inputs[i].checked) {
					selected[inputs[i].parentNode.innerText.trim()] = 1;
				}
			}
			this.selecteds[columnIndex] = selected;
			this.ranges[columnIndex] = range;
			this.el.style.display = 'none'; //将父元素display设置为none，减少浏览器重绘次数

			for (var i = 1; i < this.el.rows.length; i++) {
				var sd = true;
				for (var j = 0; j < this.el.rows[i].cells.length; j++) {
					// if((this.selecteds[j] && Object.keys(this.selecteds[j]).length > 0) || (this.ranges[j] && (this.ranges[j].min || this.ranges[j].max))) {
					var txt = this.el.rows[i].cells[j].innerText.trim();
					// }
					if (this.ranges[j]) {
						if (this.ranges[j].min && txt < this.ranges[j].min) {
							sd = false;
							break;
						}
						if (this.ranges[j].max && txt > this.ranges[j].max) {
							sd = false;
							break;
						}
					}
					if (this.selecteds[j] && Object.keys(this.selecteds[j]).length > 0) {
						if (!this.selecteds[j][txt]) {
							sd = false;
							break;
						}
					}
				}
				if (!sd) {
					this.el.rows[i].style.display = "none";
				} else if (this.el.rows[i].style.display == "none") {
					this.el.rows[i].style.display = "table-row";
				}
			}
			filterList.style.display = "none";
			this.el.style.display = '';
			var endTime = new Date();
			console.log(endTime - startTime);
			event.stopPropagation();
		}
	}]);

	return TableFilter;
}();

exports.default = TableFilter;

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tablefilter = __webpack_require__(/*! ./tablefilter */ 0);

var _tablefilter2 = _interopRequireDefault(_tablefilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _tablefilter2.default("filter-table");
new _tablefilter2.default("filter-table2");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzc3ODVlNDQyNDcyNGI2N2MyMTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYmxlZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbIlRhYmxlRmlsdGVyIiwidGFyZ2V0IiwiZWwiLCJ0YWdOYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkVycm9yIiwic2VsZWN0ZWRzIiwicmFuZ2VzIiwiaW5pdCIsImZpcnN0Um93Iiwicm93cyIsImkiLCJjZWxscyIsImxlbmd0aCIsImRhdGFzZXQiLCJjbGFzc05hbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiZmlsdGVyVGlwIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkNsaWNrIiwiYmluZCIsImZpbHRlck9iaiIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnROb2RlIiwiZmlsdGVyTGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjb2x1bW5JbmRleCIsImdldENvbHVtbkluZGV4IiwiY3JlYXRlRmlsdGVyTGlzdCIsInN0eWxlIiwiZGlzcGxheSIsImZsIiwiY2VsbCIsInNlbGVjdHMiLCJpbm5lclRleHQiLCJ0cmltIiwiaWQiLCJyaWdodCIsImxlZnQiLCJpbm5lckhUTUwiLCJmaWx0ZXJTY3JvbGwiLCJpdGVtIiwiZmlsdGVySXRlbSIsImZpbHRlckJ0bnMiLCJva0J0biIsInNldEF0dHJpYnV0ZSIsIm9uT2tDbGljayIsImNhbmNlbEJ0biIsImluZGV4Iiwic3RhcnRUaW1lIiwiRGF0ZSIsInJhbmdlIiwibWluIiwibWF4IiwiaW5wdXRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ2YWx1ZSIsImlzTmFOIiwicGFyc2VGbG9hdCIsInNlbGVjdGVkIiwiY2hlY2tlZCIsInNkIiwiaiIsInR4dCIsIk9iamVjdCIsImtleXMiLCJlbmRU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QVFnQyxLQUFSLENBQWNDLE9BQWQsR0FBd0IsRUFBeEI7QUFDQSxPQUFJb0MsVUFBVSxJQUFJaEIsSUFBSixFQUFkO0FBQ0FpQixXQUFRQyxHQUFSLENBQVlGLFVBQVFqQixTQUFwQjtBQUNBaEMsU0FBTUMsZUFBTjtBQUNBOzs7Ozs7a0JBcExtQnZCLFc7Ozs7Ozs7Ozs7Ozs7O0FDRHJCOzs7Ozs7QUFFQSwwQkFBZ0IsY0FBaEI7QUFDQSwwQkFBZ0IsZUFBaEIsRSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3Nzc4NWU0NDI0NzI0YjY3YzIxMCIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVGaWx0ZXIge1xuXHRjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcblx0XHR2YXIgZWwgPSB0YXJnZXQudGFnTmFtZSA/IHRhcmdldCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCk7XG5cdFx0aWYoIWVsIHx8IGVsLnRhZ05hbWUgIT0gXCJUQUJMRVwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgbXVzdCBiZSBhIHRhYmxlJyk7XG5cdFx0fVxuXHRcdHRoaXMuZWwgPSBlbDtcblx0XHR0aGlzLnNlbGVjdGVkcyA9IFtdO1xuXHRcdHRoaXMucmFuZ2VzID0gW107XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHZhciBmaXJzdFJvdyA9IHRoaXMuZWwucm93c1swXTtcblx0XHRpZighZmlyc3RSb3cpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7IGk8Zmlyc3RSb3cuY2VsbHMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYoZmlyc3RSb3cuY2VsbHNbaV0uZGF0YXNldFtcImZpbHRlclwiXSA9PSBcInRydWVcIikge1xuXHRcdFx0XHRmaXJzdFJvdy5jZWxsc1tpXS5jbGFzc05hbWUgKz0gXCIgY29sdW1uZmlsdGVyXCI7XG5cdFx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRkaXYuY2xhc3NOYW1lID0gXCJmaWx0ZXJPYmpcIjtcblx0XHRcdFx0dmFyIGZpbHRlclRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGZpbHRlclRpcC5jbGFzc05hbWUgPSBcImZpbHRlclRpcFwiO1xuXHRcdFx0XHRkaXYuYXBwZW5kQ2hpbGQoZmlsdGVyVGlwKTtcblx0XHRcdFx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGZpbHRlclRpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0XHRcdGZpcnN0Um93LmNlbGxzW2ldLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25DbGljayhldmVudCkge1xuXHRcdHZhciBmaWx0ZXJPYmogPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0dmFyIGZpbHRlckxpc3QgPSBmaWx0ZXJPYmouZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZpbHRlckxpc3RcIik7XG5cdFx0aWYoIWZpbHRlckxpc3QubGVuZ3RoKSB7XG5cdFx0XHR2YXIgY29sdW1uSW5kZXggPSB0aGlzLmdldENvbHVtbkluZGV4KGZpbHRlck9iaik7XG5cdFx0XHRmaWx0ZXJMaXN0ID0gdGhpcy5jcmVhdGVGaWx0ZXJMaXN0KGNvbHVtbkluZGV4KTtcblx0XHRcdGZpbHRlck9iai5hcHBlbmRDaGlsZChmaWx0ZXJMaXN0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyTGlzdCA9IGZpbHRlckxpc3RbMF07XG5cdFx0fVxuXHRcdGlmKGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCIpIHtcblx0XHRcdGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fVxuXHRcdGZvcih2YXIgaT0wO2k8dGhpcy5lbC5yb3dzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlckxpc3QtXCIgKyBpKTtcblx0XHRcdGlmKGZsICYmIGZsICE9IGZpbHRlckxpc3QpIHtcblx0XHRcdFx0Zmwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG5cdGdldENvbHVtbkluZGV4KGZpbHRlck9iaikge1xuXHRcdHZhciBmaXJzdFJvdyA9IHRoaXMuZWwucm93c1swXTtcblx0XHR2YXIgY2VsbCA9IGZpbHRlck9iai5wYXJlbnROb2RlO1xuXHRcdGZvcih2YXIgaT0wOyBpPGZpcnN0Um93LmNlbGxzLmxlbmd0aDtpKyspIHtcblx0XHRcdGlmKGZpcnN0Um93LmNlbGxzW2ldID09IGNlbGwpIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlRmlsdGVyTGlzdChjb2x1bW5JbmRleCkge1xuXHRcdHZhciBzZWxlY3RzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMTsgaTx0aGlzLmVsLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vIGlmKHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKSB7XG5cdFx0XHRcdHNlbGVjdHNbdGhpcy5lbC5yb3dzW2ldLmNlbGxzW2NvbHVtbkluZGV4XS5pbm5lclRleHQudHJpbSgpXSA9IDE7XHRcblx0XHRcdC8vIH1cblx0XHR9XG5cdFx0dmFyIGZpbHRlckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlckxpc3QuaWQgPSBcImZpbHRlckxpc3QtXCIgKyBjb2x1bW5JbmRleDtcblx0XHRpZihjb2x1bW5JbmRleCA+IHRoaXMuZWwucm93c1swXS5jZWxscy5sZW5ndGgvMikge1xuXHRcdFx0ZmlsdGVyTGlzdC5zdHlsZS5yaWdodCA9IFwiM3B4XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlckxpc3Quc3R5bGUubGVmdCA9IFwiM3B4XCI7XG5cdFx0fVxuXHRcdGZpbHRlckxpc3QuY2xhc3NOYW1lID0gXCJmaWx0ZXJMaXN0XCI7XG5cblx0XHRmaWx0ZXJMaXN0LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZmlsdGVySXRlbVwiPuaMieadoeS7tui/h+a7pDwvZGl2PlxcXG48ZGl2IGNsYXNzPVwiZmlsdGVyQ29uZFwiPlxcXG4gICAgPGRpdj48bGFiZWw+5LuOOjxsYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlsdGVySW5wdXRcIj48L2xhYmVsPjwvbGFiZWw+PC9kaXY+XFxcbiAgICA8ZGl2PjxsYWJlbD7liLA6PGxhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaWx0ZXJJbnB1dFwiPjwvbGFiZWw+PC9sYWJlbD48L2Rpdj5cXFxuPC9kaXY+XFxcbjxkaXYgY2xhc3M9XCJmaWx0ZXJJdGVtXCI+5oyJ5YC86L+H5rukPC9kaXY+JztcblxuXHRcdHZhciBmaWx0ZXJTY3JvbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlclNjcm9sbC5jbGFzc05hbWUgPSBcImZpbHRlclNjcm9sbFwiO1xuXHRcdGZvcih2YXIgaXRlbSBpbiBzZWxlY3RzKSB7XG5cdFx0XHR2YXIgZmlsdGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRmaWx0ZXJJdGVtLmNsYXNzTmFtZSA9IFwiZmlsdGVySXRlbVwiO1xuXHRcdFx0ZmlsdGVySXRlbS5pbm5lckhUTUwgPSAnPGxhYmVsPiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImZpbHRlckNoZWNrYm94XCIgdmFsdWU9XCJcIj4nK2l0ZW0rJzwvbGFiZWw+Jztcblx0XHRcdGZpbHRlclNjcm9sbC5hcHBlbmRDaGlsZChmaWx0ZXJJdGVtKTtcblx0XHR9XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJTY3JvbGwpO1xuXG5cdFx0dmFyIGZpbHRlckJ0bnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlckJ0bnMuY2xhc3NOYW1lID0gXCJmaWx0ZXJCdG5zXCI7XG5cdFx0dmFyIG9rQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRva0J0bi5pbm5lclRleHQgPSBcIuehruWumlwiO1xuXHRcdG9rQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpO1xuXHRcdG9rQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uT2tDbGljay5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0ZmlsdGVyQnRucy5hcHBlbmRDaGlsZChva0J0bik7XG5cdFx0dmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y2FuY2VsQnRuLmlubmVyVGV4dCA9IFwi5Y+W5raIXCI7XG5cdFx0Y2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpXG5cdFx0Y2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGNvbHVtbkluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWx0ZXJMaXN0LVwiICsgY29sdW1uSW5kZXgpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRmaWx0ZXJCdG5zLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJCdG5zKTtcblx0XHRyZXR1cm4gZmlsdGVyTGlzdDtcblx0fVxuXG5cdG9uT2tDbGljayhldmVudCkge1xuXHRcdHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXHRcdHZhciBjb2x1bW5JbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcblx0XHR2YXIgZmlsdGVyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4KTtcblxuXHRcdHZhciByYW5nZSA9IHttaW46bnVsbCwgbWF4OiBudWxsfTtcblx0XHR2YXIgaW5wdXRzID0gZmlsdGVyTGlzdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpO1xuXHRcdGlmKGlucHV0c1swXS52YWx1ZSkge1xuXHRcdFx0cmFuZ2UubWluID0gaXNOYU4oaW5wdXRzWzBdLnZhbHVlKSA/IGlucHV0c1swXS52YWx1ZSA6IHBhcnNlRmxvYXQoaW5wdXRzWzBdLnZhbHVlKTtcblx0XHR9XG5cdFx0aWYoaW5wdXRzWzFdLnZhbHVlKSB7XG5cdFx0XHRyYW5nZS5tYXggPSBpc05hTihpbnB1dHNbMV0udmFsdWUpID8gaW5wdXRzWzFdLnZhbHVlIDogcGFyc2VGbG9hdChpbnB1dHNbMV0udmFsdWUpO1xuXHRcdH1cblxuXHRcdHZhciBzZWxlY3RlZCA9IHt9O1xuXG5cdFx0Zm9yKHZhciBpID0gMjsgaTxpbnB1dHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKGlucHV0c1tpXS5jaGVja2VkKSB7XG5cdFx0XHRcdHNlbGVjdGVkW2lucHV0c1tpXS5wYXJlbnROb2RlLmlubmVyVGV4dC50cmltKCldID0gMTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RlZHNbY29sdW1uSW5kZXhdID0gc2VsZWN0ZWQ7XG5cdFx0dGhpcy5yYW5nZXNbY29sdW1uSW5kZXhdID0gcmFuZ2U7XG5cdFx0dGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1x0XHQvL+WwhueItuWFg+e0oGRpc3BsYXnorr7nva7kuLpub25l77yM5YeP5bCR5rWP6KeI5Zmo6YeN57uY5qyh5pWwXG5cblx0XHRmb3IodmFyIGkgPSAxOyBpPHRoaXMuZWwucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHNkID0gdHJ1ZTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGo8dGhpcy5lbC5yb3dzW2ldLmNlbGxzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0Ly8gaWYoKHRoaXMuc2VsZWN0ZWRzW2pdICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRzW2pdKS5sZW5ndGggPiAwKSB8fCAodGhpcy5yYW5nZXNbal0gJiYgKHRoaXMucmFuZ2VzW2pdLm1pbiB8fCB0aGlzLnJhbmdlc1tqXS5tYXgpKSkge1xuXHRcdFx0XHR2YXIgdHh0ID0gdGhpcy5lbC5yb3dzW2ldLmNlbGxzW2pdLmlubmVyVGV4dC50cmltKCk7XG5cdFx0XHRcdC8vIH1cblx0XHRcdFx0aWYodGhpcy5yYW5nZXNbal0pIHtcblx0XHRcdFx0XHRpZih0aGlzLnJhbmdlc1tqXS5taW4gJiYgdHh0IDwgdGhpcy5yYW5nZXNbal0ubWluKSB7XG5cdFx0XHRcdFx0XHRzZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRoaXMucmFuZ2VzW2pdLm1heCAmJiB0eHQgPiB0aGlzLnJhbmdlc1tqXS5tYXgpIHtcblx0XHRcdFx0XHRcdHNkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5zZWxlY3RlZHNbal0gJiYgT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZHNbal0pLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZighdGhpcy5zZWxlY3RlZHNbal1bdHh0XSkge1xuXHRcdFx0XHRcdFx0c2QgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoIXNkKSB7XG5cdFx0XHRcdHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9IGVsc2UgaWYodGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcblx0XHRcdFx0dGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPSBcInRhYmxlLXJvd1wiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmaWx0ZXJMaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHR2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc29sZS5sb2coZW5kVGltZS1zdGFydFRpbWUpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RhYmxlZmlsdGVyLmpzIiwiaW1wb3J0IFRhYmxlRmlsdGVyIGZyb20gXCIuL3RhYmxlZmlsdGVyXCJcblxubmV3IFRhYmxlRmlsdGVyKFwiZmlsdGVyLXRhYmxlXCIpO1xubmV3IFRhYmxlRmlsdGVyKFwiZmlsdGVyLXRhYmxlMlwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGVzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=