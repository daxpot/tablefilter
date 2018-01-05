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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTg5OGE4OTdmMjIxZTQ4MmIyZDY/MzdkYSIsIndlYnBhY2s6Ly8vLi9zcmMvdGFibGVmaWx0ZXIuanM/OWJmMiJdLCJuYW1lcyI6WyJUYWJsZUZpbHRlciIsInRhcmdldCIsImVsIiwidGFnTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJFcnJvciIsInNlbGVjdGVkcyIsInJhbmdlcyIsImluaXQiLCJmaXJzdFJvdyIsInJvd3MiLCJpIiwiY2VsbHMiLCJsZW5ndGgiLCJkYXRhc2V0IiwiY2xhc3NOYW1lIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImZpbHRlclRpcCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbGljayIsImJpbmQiLCJmaWx0ZXJPYmoiLCJjdXJyZW50VGFyZ2V0IiwicGFyZW50Tm9kZSIsImZpbHRlckxpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY29sdW1uSW5kZXgiLCJnZXRDb2x1bW5JbmRleCIsImNyZWF0ZUZpbHRlckxpc3QiLCJzdHlsZSIsImRpc3BsYXkiLCJmbCIsImNlbGwiLCJzZWxlY3RzIiwiaW5uZXJUZXh0IiwidHJpbSIsImlkIiwiaW5uZXJIVE1MIiwiZmlsdGVyU2Nyb2xsIiwiaXRlbSIsImZpbHRlckl0ZW0iLCJmaWx0ZXJCdG5zIiwib2tCdG4iLCJzZXRBdHRyaWJ1dGUiLCJvbk9rQ2xpY2siLCJjYW5jZWxCdG4iLCJpbmRleCIsInN0YXJ0VGltZSIsIkRhdGUiLCJyYW5nZSIsIm1pbiIsIm1heCIsImlucHV0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidmFsdWUiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJzZWxlY3RlZCIsImNoZWNrZWQiLCJzZCIsImoiLCJ0eHQiLCJPYmplY3QiLCJrZXlzIiwiZW5kVGltZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3Mi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WixFQUFlVCxHQUFmLElBQXNCVSxNQUFNLEtBQUsxRCxNQUFMLENBQVl5RCxDQUFaLEVBQWVULEdBQTlDLEVBQW1EO0FBQ2xEUSxZQUFLLEtBQUw7QUFDQTtBQUNBO0FBQ0Q7QUFDRCxTQUFHLEtBQUt6RCxTQUFMLENBQWUwRCxDQUFmLEtBQXFCRSxPQUFPQyxJQUFQLENBQVksS0FBSzdELFNBQUwsQ0FBZTBELENBQWYsQ0FBWixFQUErQm5ELE1BQS9CLEdBQXdDLENBQWhFLEVBQW1FO0FBQ2xFLFVBQUcsQ0FBQyxLQUFLUCxTQUFMLENBQWUwRCxDQUFmLEVBQWtCQyxHQUFsQixDQUFKLEVBQTRCO0FBQzNCRixZQUFLLEtBQUw7QUFDQTtBQUNBO0FBQ0Q7QUFDRDtBQUNELFFBQUcsQ0FBQ0EsRUFBSixFQUFRO0FBQ1AsVUFBSzlELEVBQUwsQ0FBUVMsSUFBUixDQUFhQyxDQUFiLEVBQWdCc0IsS0FBaEIsQ0FBc0JDLE9BQXRCLEdBQWdDLE1BQWhDO0FBQ0EsS0FGRCxNQUVPLElBQUcsS0FBS2pDLEVBQUwsQ0FBUVMsSUFBUixDQUFhQyxDQUFiLEVBQWdCc0IsS0FBaEIsQ0FBc0JDLE9BQXRCLElBQWlDLE1BQXBDLEVBQTRDO0FBQ2xELFVBQUtqQyxFQUFMLENBQVFTLElBQVIsQ0FBYUMsQ0FBYixFQUFnQnNCLEtBQWhCLENBQXNCQyxPQUF0QixHQUFnQyxXQUFoQztBQUNBO0FBQ0Q7QUFDRE4sY0FBV0ssS0FBWCxDQUFpQkMsT0FBakIsR0FBMkIsTUFBM0I7QUFDQSxRQUFLakMsRUFBTCxDQUFRZ0MsS0FBUixDQUFjQyxPQUFkLEdBQXdCLEVBQXhCO0FBQ0EsT0FBSWtDLFVBQVUsSUFBSWhCLElBQUosRUFBZDtBQUNBaUIsV0FBUUMsR0FBUixDQUFZRixVQUFRakIsU0FBcEI7QUFDQTlCLFNBQU1DLGVBQU47QUFDQTs7Ozs7O2tCQS9LbUJ2QixXIiwiZmlsZSI6InRhYmxlZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxODk4YTg5N2YyMjFlNDgyYjJkNiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVGaWx0ZXIge1xuXHRjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcblx0XHR2YXIgZWwgPSB0YXJnZXQudGFnTmFtZSA/IHRhcmdldCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCk7XG5cdFx0aWYoIWVsIHx8IGVsLnRhZ05hbWUgIT0gXCJUQUJMRVwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgbXVzdCBiZSBhIHRhYmxlJyk7XG5cdFx0fVxuXHRcdHRoaXMuZWwgPSBlbDtcblx0XHR0aGlzLnNlbGVjdGVkcyA9IFtdO1xuXHRcdHRoaXMucmFuZ2VzID0gW107XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHZhciBmaXJzdFJvdyA9IHRoaXMuZWwucm93c1swXTtcblx0XHRpZighZmlyc3RSb3cpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7IGk8Zmlyc3RSb3cuY2VsbHMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYoZmlyc3RSb3cuY2VsbHNbaV0uZGF0YXNldFtcImZpbHRlclwiXSA9PSBcInRydWVcIikge1xuXHRcdFx0XHRmaXJzdFJvdy5jZWxsc1tpXS5jbGFzc05hbWUgKz0gXCIgY29sdW1uZmlsdGVyXCI7XG5cdFx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRkaXYuY2xhc3NOYW1lID0gXCJmaWx0ZXJPYmpcIjtcblx0XHRcdFx0dmFyIGZpbHRlclRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGZpbHRlclRpcC5jbGFzc05hbWUgPSBcImZpbHRlclRpcFwiO1xuXHRcdFx0XHRkaXYuYXBwZW5kQ2hpbGQoZmlsdGVyVGlwKTtcblx0XHRcdFx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdGZpbHRlclRpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljay5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0XHRcdGZpcnN0Um93LmNlbGxzW2ldLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25DbGljayhldmVudCkge1xuXHRcdHZhciBmaWx0ZXJPYmogPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0dmFyIGZpbHRlckxpc3QgPSBmaWx0ZXJPYmouZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZpbHRlckxpc3RcIik7XG5cdFx0aWYoIWZpbHRlckxpc3QubGVuZ3RoKSB7XG5cdFx0XHR2YXIgY29sdW1uSW5kZXggPSB0aGlzLmdldENvbHVtbkluZGV4KGZpbHRlck9iaik7XG5cdFx0XHRmaWx0ZXJMaXN0ID0gdGhpcy5jcmVhdGVGaWx0ZXJMaXN0KGNvbHVtbkluZGV4KTtcblx0XHRcdGZpbHRlck9iai5hcHBlbmRDaGlsZChmaWx0ZXJMaXN0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyTGlzdCA9IGZpbHRlckxpc3RbMF07XG5cdFx0fVxuXHRcdGlmKGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCIpIHtcblx0XHRcdGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJMaXN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0fVxuXHRcdGZvcih2YXIgaT0wO2k8dGhpcy5lbC5yb3dzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlckxpc3QtXCIgKyBpKTtcblx0XHRcdGlmKGZsICYmIGZsICE9IGZpbHRlckxpc3QpIHtcblx0XHRcdFx0Zmwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG5cdGdldENvbHVtbkluZGV4KGZpbHRlck9iaikge1xuXHRcdHZhciBmaXJzdFJvdyA9IHRoaXMuZWwucm93c1swXTtcblx0XHR2YXIgY2VsbCA9IGZpbHRlck9iai5wYXJlbnROb2RlO1xuXHRcdGZvcih2YXIgaT0wOyBpPGZpcnN0Um93LmNlbGxzLmxlbmd0aDtpKyspIHtcblx0XHRcdGlmKGZpcnN0Um93LmNlbGxzW2ldID09IGNlbGwpIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlRmlsdGVyTGlzdChjb2x1bW5JbmRleCkge1xuXHRcdHZhciBzZWxlY3RzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMTsgaTx0aGlzLmVsLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vIGlmKHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKSB7XG5cdFx0XHRcdHNlbGVjdHNbdGhpcy5lbC5yb3dzW2ldLmNlbGxzW2NvbHVtbkluZGV4XS5pbm5lclRleHQudHJpbSgpXSA9IDE7XHRcblx0XHRcdC8vIH1cblx0XHR9XG5cdFx0dmFyIGZpbHRlckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlckxpc3QuaWQgPSBcImZpbHRlckxpc3QtXCIgKyBjb2x1bW5JbmRleDtcblx0XHRmaWx0ZXJMaXN0LmNsYXNzTmFtZSA9IFwiZmlsdGVyTGlzdFwiO1xuXG5cdFx0ZmlsdGVyTGlzdC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZpbHRlckl0ZW1cIj7mjInmnaHku7bov4fmu6Q8L2Rpdj5cXFxuPGRpdiBjbGFzcz1cImZpbHRlckNvbmRcIj5cXFxuICAgIDxkaXY+PGxhYmVsPuS7jjo8bGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpbHRlcklucHV0XCI+PC9sYWJlbD48L2xhYmVsPjwvZGl2PlxcXG4gICAgPGRpdj48bGFiZWw+5YiwOjxsYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlsdGVySW5wdXRcIj48L2xhYmVsPjwvbGFiZWw+PC9kaXY+XFxcbjwvZGl2PlxcXG48ZGl2IGNsYXNzPVwiZmlsdGVySXRlbVwiPuaMieWAvOi/h+a7pDwvZGl2Pic7XG5cblx0XHR2YXIgZmlsdGVyU2Nyb2xsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRmaWx0ZXJTY3JvbGwuY2xhc3NOYW1lID0gXCJmaWx0ZXJTY3JvbGxcIjtcblx0XHRmb3IodmFyIGl0ZW0gaW4gc2VsZWN0cykge1xuXHRcdFx0dmFyIGZpbHRlckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0ZmlsdGVySXRlbS5jbGFzc05hbWUgPSBcImZpbHRlckl0ZW1cIjtcblx0XHRcdGZpbHRlckl0ZW0uaW5uZXJIVE1MID0gJzxsYWJlbD4gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJmaWx0ZXJDaGVja2JveFwiIHZhbHVlPVwiXCI+JytpdGVtKyc8L2xhYmVsPic7XG5cdFx0XHRmaWx0ZXJTY3JvbGwuYXBwZW5kQ2hpbGQoZmlsdGVySXRlbSk7XG5cdFx0fVxuXHRcdGZpbHRlckxpc3QuYXBwZW5kQ2hpbGQoZmlsdGVyU2Nyb2xsKTtcblxuXHRcdHZhciBmaWx0ZXJCdG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRmaWx0ZXJCdG5zLmNsYXNzTmFtZSA9IFwiZmlsdGVyQnRuc1wiO1xuXHRcdHZhciBva0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0b2tCdG4uaW5uZXJUZXh0ID0gXCLnoa7lrppcIjtcblx0XHRva0J0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGNvbHVtbkluZGV4KTtcblx0XHRva0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbk9rQ2xpY2suYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdGZpbHRlckJ0bnMuYXBwZW5kQ2hpbGQob2tCdG4pO1xuXHRcdHZhciBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdGNhbmNlbEJ0bi5pbm5lclRleHQgPSBcIuWPlua2iFwiO1xuXHRcdGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGNvbHVtbkluZGV4KVxuXHRcdGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBjb2x1bW5JbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4KS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9LCBmYWxzZSk7XG5cdFx0ZmlsdGVyQnRucy5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXHRcdGZpbHRlckxpc3QuYXBwZW5kQ2hpbGQoZmlsdGVyQnRucyk7XG5cdFx0cmV0dXJuIGZpbHRlckxpc3Q7XG5cdH1cblxuXHRvbk9rQ2xpY2soZXZlbnQpIHtcblx0XHR2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblx0XHR2YXIgY29sdW1uSW5kZXggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cdFx0dmFyIGZpbHRlckxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlckxpc3QtXCIgKyBjb2x1bW5JbmRleCk7XG5cblx0XHR2YXIgcmFuZ2UgPSB7bWluOm51bGwsIG1heDogbnVsbH07XG5cdFx0dmFyIGlucHV0cyA9IGZpbHRlckxpc3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKTtcblx0XHRpZihpbnB1dHNbMF0udmFsdWUpIHtcblx0XHRcdHJhbmdlLm1pbiA9IGlzTmFOKGlucHV0c1swXS52YWx1ZSkgPyBpbnB1dHNbMF0udmFsdWUgOiBwYXJzZUZsb2F0KGlucHV0c1swXS52YWx1ZSk7XG5cdFx0fVxuXHRcdGlmKGlucHV0c1sxXS52YWx1ZSkge1xuXHRcdFx0cmFuZ2UubWF4ID0gaXNOYU4oaW5wdXRzWzFdLnZhbHVlKSA/IGlucHV0c1sxXS52YWx1ZSA6IHBhcnNlRmxvYXQoaW5wdXRzWzFdLnZhbHVlKTtcblx0XHR9XG5cblx0XHR2YXIgc2VsZWN0ZWQgPSB7fTtcblxuXHRcdGZvcih2YXIgaSA9IDI7IGk8aW5wdXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZihpbnB1dHNbaV0uY2hlY2tlZCkge1xuXHRcdFx0XHRzZWxlY3RlZFtpbnB1dHNbaV0ucGFyZW50Tm9kZS5pbm5lclRleHQudHJpbSgpXSA9IDE7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0ZWRzW2NvbHVtbkluZGV4XSA9IHNlbGVjdGVkO1xuXHRcdHRoaXMucmFuZ2VzW2NvbHVtbkluZGV4XSA9IHJhbmdlO1xuXHRcdHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcdFx0Ly/lsIbniLblhYPntKBkaXNwbGF56K6+572u5Li6bm9uZe+8jOWHj+Wwkea1j+iniOWZqOmHjee7mOasoeaVsFxuXG5cdFx0Zm9yKHZhciBpID0gMTsgaTx0aGlzLmVsLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzZCA9IHRydWU7XG5cdFx0XHRmb3IodmFyIGogPSAwOyBqPHRoaXMuZWwucm93c1tpXS5jZWxscy5sZW5ndGg7IGorKyl7XG5cdFx0XHRcdC8vIGlmKCh0aGlzLnNlbGVjdGVkc1tqXSAmJiBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkc1tqXSkubGVuZ3RoID4gMCkgfHwgKHRoaXMucmFuZ2VzW2pdICYmICh0aGlzLnJhbmdlc1tqXS5taW4gfHwgdGhpcy5yYW5nZXNbal0ubWF4KSkpIHtcblx0XHRcdFx0dmFyIHR4dCA9IHRoaXMuZWwucm93c1tpXS5jZWxsc1tqXS5pbm5lclRleHQudHJpbSgpO1xuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdGlmKHRoaXMucmFuZ2VzW2pdKSB7XG5cdFx0XHRcdFx0aWYodGhpcy5yYW5nZXNbal0ubWluICYmIHR4dCA8IHRoaXMucmFuZ2VzW2pdLm1pbikge1xuXHRcdFx0XHRcdFx0c2QgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZih0aGlzLnJhbmdlc1tqXS5tYXggJiYgdHh0ID4gdGhpcy5yYW5nZXNbal0ubWF4KSB7XG5cdFx0XHRcdFx0XHRzZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMuc2VsZWN0ZWRzW2pdICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRzW2pdKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0aWYoIXRoaXMuc2VsZWN0ZWRzW2pdW3R4dF0pIHtcblx0XHRcdFx0XHRcdHNkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCFzZCkge1xuXHRcdFx0XHR0aGlzLmVsLnJvd3NbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0fSBlbHNlIGlmKHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XG5cdFx0XHRcdHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJ0YWJsZS1yb3dcIjtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZmlsdGVyTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0dGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cdFx0dmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnNvbGUubG9nKGVuZFRpbWUtc3RhcnRUaW1lKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWJsZWZpbHRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=