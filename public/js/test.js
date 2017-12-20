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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTgyYTAxNzNlNmZmOTE1MDg3M2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RhYmxlZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbIlRhYmxlRmlsdGVyIiwidGFyZ2V0IiwiZWwiLCJ0YWdOYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkVycm9yIiwic2VsZWN0ZWRzIiwicmFuZ2VzIiwiaW5pdCIsImZpcnN0Um93Iiwicm93cyIsImkiLCJjZWxscyIsImxlbmd0aCIsImRhdGFzZXQiLCJjbGFzc05hbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiZmlsdGVyVGlwIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkNsaWNrIiwiYmluZCIsImZpbHRlck9iaiIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnROb2RlIiwiZmlsdGVyTGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjb2x1bW5JbmRleCIsImdldENvbHVtbkluZGV4IiwiY3JlYXRlRmlsdGVyTGlzdCIsInN0eWxlIiwiZGlzcGxheSIsImZsIiwiY2VsbCIsInNlbGVjdHMiLCJpbm5lclRleHQiLCJ0cmltIiwiaWQiLCJpbm5lckhUTUwiLCJmaWx0ZXJTY3JvbGwiLCJpdGVtIiwiZmlsdGVySXRlbSIsImZpbHRlckJ0bnMiLCJva0J0biIsInNldEF0dHJpYnV0ZSIsIm9uT2tDbGljayIsImNhbmNlbEJ0biIsImluZGV4IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJpbnB1dHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInZhbHVlIiwiaXNOYU4iLCJwYXJzZUZsb2F0Iiwic2VsZWN0ZWQiLCJjaGVja2VkIiwic2QiLCJqIiwidHh0IiwiT2JqZWN0Iiwia2V5cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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QWYsS0FBcUJFLE9BQU9DLElBQVAsQ0FBWSxLQUFLM0QsU0FBTCxDQUFld0QsQ0FBZixDQUFaLEVBQStCakQsTUFBL0IsR0FBd0MsQ0FBaEUsRUFBbUU7QUFDbEUsVUFBRyxDQUFDLEtBQUtQLFNBQUwsQ0FBZXdELENBQWYsRUFBa0JDLEdBQWxCLENBQUosRUFBNEI7QUFDM0JGLFlBQUssS0FBTDtBQUNBO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsUUFBRyxDQUFDQSxFQUFKLEVBQVE7QUFDUCxVQUFLNUQsRUFBTCxDQUFRUyxJQUFSLENBQWFDLENBQWIsRUFBZ0JzQixLQUFoQixDQUFzQkMsT0FBdEIsR0FBZ0MsTUFBaEM7QUFDQSxLQUZELE1BRU8sSUFBRyxLQUFLakMsRUFBTCxDQUFRUyxJQUFSLENBQWFDLENBQWIsRUFBZ0JzQixLQUFoQixDQUFzQkMsT0FBdEIsSUFBaUMsTUFBcEMsRUFBNEM7QUFDbEQsVUFBS2pDLEVBQUwsQ0FBUVMsSUFBUixDQUFhQyxDQUFiLEVBQWdCc0IsS0FBaEIsQ0FBc0JDLE9BQXRCLEdBQWdDLFdBQWhDO0FBQ0E7QUFDRDtBQUNETixjQUFXSyxLQUFYLENBQWlCQyxPQUFqQixHQUEyQixNQUEzQjtBQUNBYixTQUFNQyxlQUFOO0FBQ0E7Ozs7OztrQkExS21CdkIsVzs7Ozs7Ozs7Ozs7Ozs7QUNEckI7Ozs7OztBQUVBLDBCQUFnQixjQUFoQixFIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU4MmEwMTczZTZmZjkxNTA4NzNjIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZUZpbHRlciB7XG5cdGNvbnN0cnVjdG9yKHRhcmdldCkge1xuXHRcdHZhciBlbCA9IHRhcmdldC50YWdOYW1lID8gdGFyZ2V0IDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KTtcblx0XHRpZighZWwgfHwgZWwudGFnTmFtZSAhPSBcIlRBQkxFXCIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRWxlbWVudCBtdXN0IGJlIGEgdGFibGUnKTtcblx0XHR9XG5cdFx0dGhpcy5lbCA9IGVsO1xuXHRcdHRoaXMuc2VsZWN0ZWRzID0gW107XG5cdFx0dGhpcy5yYW5nZXMgPSBbXTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dmFyIGZpcnN0Um93ID0gdGhpcy5lbC5yb3dzWzBdO1xuXHRcdGlmKCFmaXJzdFJvdykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IodmFyIGk9MDsgaTxmaXJzdFJvdy5jZWxscy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRpZihmaXJzdFJvdy5jZWxsc1tpXS5kYXRhc2V0W1wiZmlsdGVyXCJdID09IFwidHJ1ZVwiKSB7XG5cdFx0XHRcdGZpcnN0Um93LmNlbGxzW2ldLmNsYXNzTmFtZSArPSBcIiBjb2x1bW5maWx0ZXJcIjtcblx0XHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGRpdi5jbGFzc05hbWUgPSBcImZpbHRlck9ialwiO1xuXHRcdFx0XHR2YXIgZmlsdGVyVGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0ZmlsdGVyVGlwLmNsYXNzTmFtZSA9IFwiZmlsdGVyVGlwXCI7XG5cdFx0XHRcdGRpdi5hcHBlbmRDaGlsZChmaWx0ZXJUaXApO1xuXHRcdFx0XHRkaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0ZmlsdGVyVGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdFx0Zmlyc3RSb3cuY2VsbHNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrKGV2ZW50KSB7XG5cdFx0dmFyIGZpbHRlck9iaiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZTtcblx0XHR2YXIgZmlsdGVyTGlzdCA9IGZpbHRlck9iai5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmlsdGVyTGlzdFwiKTtcblx0XHRpZighZmlsdGVyTGlzdC5sZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5JbmRleCA9IHRoaXMuZ2V0Q29sdW1uSW5kZXgoZmlsdGVyT2JqKTtcblx0XHRcdGZpbHRlckxpc3QgPSB0aGlzLmNyZWF0ZUZpbHRlckxpc3QoY29sdW1uSW5kZXgpO1xuXHRcdFx0ZmlsdGVyT2JqLmFwcGVuZENoaWxkKGZpbHRlckxpc3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdFswXTtcblx0XHR9XG5cdFx0aWYoZmlsdGVyTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIikge1xuXHRcdFx0ZmlsdGVyTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7aTx0aGlzLmVsLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBmbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGkpO1xuXHRcdFx0aWYoZmwgJiYgZmwgIT0gZmlsdGVyTGlzdCkge1xuXHRcdFx0XHRmbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG5cblx0Z2V0Q29sdW1uSW5kZXgoZmlsdGVyT2JqKSB7XG5cdFx0dmFyIGZpcnN0Um93ID0gdGhpcy5lbC5yb3dzWzBdO1xuXHRcdHZhciBjZWxsID0gZmlsdGVyT2JqLnBhcmVudE5vZGU7XG5cdFx0Zm9yKHZhciBpPTA7IGk8Zmlyc3RSb3cuY2VsbHMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYoZmlyc3RSb3cuY2VsbHNbaV0gPT0gY2VsbCkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjcmVhdGVGaWx0ZXJMaXN0KGNvbHVtbkluZGV4KSB7XG5cdFx0dmFyIHNlbGVjdHMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAxOyBpPHRoaXMuZWwucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYodGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpIHtcblx0XHRcdFx0c2VsZWN0c1t0aGlzLmVsLnJvd3NbaV0uY2VsbHNbY29sdW1uSW5kZXhdLmlubmVyVGV4dC50cmltKCldID0gMTtcdFxuXHRcdFx0Ly8gfVxuXHRcdH1cblx0XHR2YXIgZmlsdGVyTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZmlsdGVyTGlzdC5pZCA9IFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4O1xuXHRcdGZpbHRlckxpc3QuY2xhc3NOYW1lID0gXCJmaWx0ZXJMaXN0XCI7XG5cblx0XHRmaWx0ZXJMaXN0LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZmlsdGVySXRlbVwiPuaMieadoeS7tui/h+a7pDwvZGl2PlxcXG48ZGl2IGNsYXNzPVwiZmlsdGVyQ29uZFwiPlxcXG4gICAgPGRpdj48bGFiZWw+5LuOOjxsYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlsdGVySW5wdXRcIj48L2xhYmVsPjwvbGFiZWw+PC9kaXY+XFxcbiAgICA8ZGl2PjxsYWJlbD7liLA6PGxhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaWx0ZXJJbnB1dFwiPjwvbGFiZWw+PC9sYWJlbD48L2Rpdj5cXFxuPC9kaXY+XFxcbjxkaXYgY2xhc3M9XCJmaWx0ZXJJdGVtXCI+5oyJ5YC86L+H5rukPC9kaXY+JztcblxuXHRcdHZhciBmaWx0ZXJTY3JvbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlclNjcm9sbC5jbGFzc05hbWUgPSBcImZpbHRlclNjcm9sbFwiO1xuXHRcdGZvcih2YXIgaXRlbSBpbiBzZWxlY3RzKSB7XG5cdFx0XHR2YXIgZmlsdGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRmaWx0ZXJJdGVtLmNsYXNzTmFtZSA9IFwiZmlsdGVySXRlbVwiO1xuXHRcdFx0ZmlsdGVySXRlbS5pbm5lckhUTUwgPSAnPGxhYmVsPiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImZpbHRlckNoZWNrYm94XCIgdmFsdWU9XCJcIj4nK2l0ZW0rJzwvbGFiZWw+Jztcblx0XHRcdGZpbHRlclNjcm9sbC5hcHBlbmRDaGlsZChmaWx0ZXJJdGVtKTtcblx0XHR9XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJTY3JvbGwpO1xuXG5cdFx0dmFyIGZpbHRlckJ0bnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlckJ0bnMuY2xhc3NOYW1lID0gXCJmaWx0ZXJCdG5zXCI7XG5cdFx0dmFyIG9rQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRva0J0bi5pbm5lclRleHQgPSBcIuehruWumlwiO1xuXHRcdG9rQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpO1xuXHRcdG9rQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uT2tDbGljay5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0ZmlsdGVyQnRucy5hcHBlbmRDaGlsZChva0J0bik7XG5cdFx0dmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y2FuY2VsQnRuLmlubmVyVGV4dCA9IFwi5Y+W5raIXCI7XG5cdFx0Y2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpXG5cdFx0Y2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGNvbHVtbkluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWx0ZXJMaXN0LVwiICsgY29sdW1uSW5kZXgpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRmaWx0ZXJCdG5zLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJCdG5zKTtcblx0XHRyZXR1cm4gZmlsdGVyTGlzdDtcblx0fVxuXG5cdG9uT2tDbGljayhldmVudCkge1xuXHRcdHZhciBjb2x1bW5JbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcblx0XHR2YXIgZmlsdGVyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4KTtcblxuXHRcdHZhciByYW5nZSA9IHttaW46bnVsbCwgbWF4OiBudWxsfTtcblx0XHR2YXIgaW5wdXRzID0gZmlsdGVyTGlzdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpO1xuXHRcdGlmKGlucHV0c1swXS52YWx1ZSkge1xuXHRcdFx0cmFuZ2UubWluID0gaXNOYU4oaW5wdXRzWzBdLnZhbHVlKSA/IGlucHV0c1swXS52YWx1ZSA6IHBhcnNlRmxvYXQoaW5wdXRzWzBdLnZhbHVlKTtcblx0XHR9XG5cdFx0aWYoaW5wdXRzWzFdLnZhbHVlKSB7XG5cdFx0XHRyYW5nZS5tYXggPSBpc05hTihpbnB1dHNbMV0udmFsdWUpID8gaW5wdXRzWzFdLnZhbHVlIDogcGFyc2VGbG9hdChpbnB1dHNbMV0udmFsdWUpO1xuXHRcdH1cblxuXHRcdHZhciBzZWxlY3RlZCA9IHt9O1xuXG5cdFx0Zm9yKHZhciBpID0gMjsgaTxpbnB1dHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKGlucHV0c1tpXS5jaGVja2VkKSB7XG5cdFx0XHRcdHNlbGVjdGVkW2lucHV0c1tpXS5wYXJlbnROb2RlLmlubmVyVGV4dC50cmltKCldID0gMTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RlZHNbY29sdW1uSW5kZXhdID0gc2VsZWN0ZWQ7XG5cdFx0dGhpcy5yYW5nZXNbY29sdW1uSW5kZXhdID0gcmFuZ2U7XG5cblx0XHRmb3IodmFyIGkgPSAxOyBpPHRoaXMuZWwucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHNkID0gdHJ1ZTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGo8dGhpcy5lbC5yb3dzW2ldLmNlbGxzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0Ly8gaWYoKHRoaXMuc2VsZWN0ZWRzW2pdICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRzW2pdKS5sZW5ndGggPiAwKSB8fCAodGhpcy5yYW5nZXNbal0gJiYgKHRoaXMucmFuZ2VzW2pdLm1pbiB8fCB0aGlzLnJhbmdlc1tqXS5tYXgpKSkge1xuXHRcdFx0XHR2YXIgdHh0ID0gdGhpcy5lbC5yb3dzW2ldLmNlbGxzW2pdLmlubmVyVGV4dC50cmltKCk7XG5cdFx0XHRcdC8vIH1cblx0XHRcdFx0aWYodGhpcy5yYW5nZXNbal0pIHtcblx0XHRcdFx0XHRpZih0aGlzLnJhbmdlc1tqXS5taW4gJiYgdHh0IDwgdGhpcy5yYW5nZXNbal0ubWluKSB7XG5cdFx0XHRcdFx0XHRzZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRoaXMucmFuZ2VzW2pdLm1heCAmJiB0eHQgPiB0aGlzLnJhbmdlc1tqXS5tYXgpIHtcblx0XHRcdFx0XHRcdHNkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5zZWxlY3RlZHNbal0gJiYgT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZHNbal0pLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZighdGhpcy5zZWxlY3RlZHNbal1bdHh0XSkge1xuXHRcdFx0XHRcdFx0c2QgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoIXNkKSB7XG5cdFx0XHRcdHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9IGVsc2UgaWYodGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcblx0XHRcdFx0dGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPSBcInRhYmxlLXJvd1wiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmaWx0ZXJMaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWJsZWZpbHRlci5qcyIsImltcG9ydCBUYWJsZUZpbHRlciBmcm9tIFwiLi90YWJsZWZpbHRlclwiXG5cbm5ldyBUYWJsZUZpbHRlcihcImZpbHRlci10YWJsZVwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGVzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=