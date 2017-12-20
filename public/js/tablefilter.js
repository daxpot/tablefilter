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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTgyYTAxNzNlNmZmOTE1MDg3M2M/YzI4NyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFibGVmaWx0ZXIuanM/OWJmMiJdLCJuYW1lcyI6WyJUYWJsZUZpbHRlciIsInRhcmdldCIsImVsIiwidGFnTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJFcnJvciIsInNlbGVjdGVkcyIsInJhbmdlcyIsImluaXQiLCJmaXJzdFJvdyIsInJvd3MiLCJpIiwiY2VsbHMiLCJsZW5ndGgiLCJkYXRhc2V0IiwiY2xhc3NOYW1lIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImZpbHRlclRpcCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbGljayIsImJpbmQiLCJmaWx0ZXJPYmoiLCJjdXJyZW50VGFyZ2V0IiwicGFyZW50Tm9kZSIsImZpbHRlckxpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY29sdW1uSW5kZXgiLCJnZXRDb2x1bW5JbmRleCIsImNyZWF0ZUZpbHRlckxpc3QiLCJzdHlsZSIsImRpc3BsYXkiLCJmbCIsImNlbGwiLCJzZWxlY3RzIiwiaW5uZXJUZXh0IiwidHJpbSIsImlkIiwiaW5uZXJIVE1MIiwiZmlsdGVyU2Nyb2xsIiwiaXRlbSIsImZpbHRlckl0ZW0iLCJmaWx0ZXJCdG5zIiwib2tCdG4iLCJzZXRBdHRyaWJ1dGUiLCJvbk9rQ2xpY2siLCJjYW5jZWxCdG4iLCJpbmRleCIsInJhbmdlIiwibWluIiwibWF4IiwiaW5wdXRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ2YWx1ZSIsImlzTmFOIiwicGFyc2VGbG9hdCIsInNlbGVjdGVkIiwiY2hlY2tlZCIsInNkIiwiaiIsInR4dCIsIk9iamVjdCIsImtleXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMvRHFCQSxXO0FBQ3BCLHNCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE1BQUlDLEtBQUtELE9BQU9FLE9BQVAsR0FBaUJGLE1BQWpCLEdBQTBCRyxTQUFTQyxjQUFULENBQXdCSixNQUF4QixDQUFuQztBQUNBLE1BQUcsQ0FBQ0MsRUFBRCxJQUFPQSxHQUFHQyxPQUFILElBQWMsT0FBeEIsRUFBaUM7QUFDaEMsU0FBTSxJQUFJRyxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNBO0FBQ0QsT0FBS0osRUFBTCxHQUFVQSxFQUFWO0FBQ0EsT0FBS0ssU0FBTCxHQUFpQixFQUFqQjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsT0FBS0MsSUFBTDtBQUNBOzs7O3lCQUVNO0FBQ04sT0FBSUMsV0FBVyxLQUFLUixFQUFMLENBQVFTLElBQVIsQ0FBYSxDQUFiLENBQWY7QUFDQSxPQUFHLENBQUNELFFBQUosRUFBYztBQUNiO0FBQ0E7QUFDRCxRQUFJLElBQUlFLElBQUUsQ0FBVixFQUFhQSxJQUFFRixTQUFTRyxLQUFULENBQWVDLE1BQTlCLEVBQXFDRixHQUFyQyxFQUEwQztBQUN6QyxRQUFHRixTQUFTRyxLQUFULENBQWVELENBQWYsRUFBa0JHLE9BQWxCLENBQTBCLFFBQTFCLEtBQXVDLE1BQTFDLEVBQWtEO0FBQ2pETCxjQUFTRyxLQUFULENBQWVELENBQWYsRUFBa0JJLFNBQWxCLElBQStCLGVBQS9CO0FBQ0EsU0FBSUMsTUFBTWIsU0FBU2MsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0FELFNBQUlELFNBQUosR0FBZ0IsV0FBaEI7QUFDQSxTQUFJRyxZQUFZZixTQUFTYyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FDLGVBQVVILFNBQVYsR0FBc0IsV0FBdEI7QUFDQUMsU0FBSUcsV0FBSixDQUFnQkQsU0FBaEI7QUFDQUYsU0FBSUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsWUFBVTtBQUN2Q0MsWUFBTUMsZUFBTjtBQUNBLE1BRkQsRUFFRyxLQUZIO0FBR0FKLGVBQVVFLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLEtBQUtHLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFwQyxFQUE2RCxLQUE3RDtBQUNBZixjQUFTRyxLQUFULENBQWVELENBQWYsRUFBa0JRLFdBQWxCLENBQThCSCxHQUE5QjtBQUNBO0FBQ0Q7QUFDRDs7OzBCQUVPSyxLLEVBQU87QUFDZCxPQUFJSSxZQUFZSixNQUFNSyxhQUFOLENBQW9CQyxVQUFwQztBQUNBLE9BQUlDLGFBQWFILFVBQVVJLHNCQUFWLENBQWlDLFlBQWpDLENBQWpCO0FBQ0EsT0FBRyxDQUFDRCxXQUFXZixNQUFmLEVBQXVCO0FBQ3RCLFFBQUlpQixjQUFjLEtBQUtDLGNBQUwsQ0FBb0JOLFNBQXBCLENBQWxCO0FBQ0FHLGlCQUFhLEtBQUtJLGdCQUFMLENBQXNCRixXQUF0QixDQUFiO0FBQ0FMLGNBQVVOLFdBQVYsQ0FBc0JTLFVBQXRCO0FBQ0EsSUFKRCxNQUlPO0FBQ05BLGlCQUFhQSxXQUFXLENBQVgsQ0FBYjtBQUNBO0FBQ0QsT0FBR0EsV0FBV0ssS0FBWCxDQUFpQkMsT0FBakIsSUFBNEIsT0FBL0IsRUFBd0M7QUFDdkNOLGVBQVdLLEtBQVgsQ0FBaUJDLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0EsSUFGRCxNQUVPO0FBQ05OLGVBQVdLLEtBQVgsQ0FBaUJDLE9BQWpCLEdBQTJCLE9BQTNCO0FBQ0E7QUFDRCxRQUFJLElBQUl2QixJQUFFLENBQVYsRUFBWUEsSUFBRSxLQUFLVixFQUFMLENBQVFTLElBQVIsQ0FBYUcsTUFBM0IsRUFBbUNGLEdBQW5DLEVBQXdDO0FBQ3ZDLFFBQUl3QixLQUFLaEMsU0FBU0MsY0FBVCxDQUF3QixnQkFBZ0JPLENBQXhDLENBQVQ7QUFDQSxRQUFHd0IsTUFBTUEsTUFBTVAsVUFBZixFQUEyQjtBQUMxQk8sUUFBR0YsS0FBSCxDQUFTQyxPQUFULEdBQW1CLE1BQW5CO0FBQ0E7QUFDRDtBQUNEYixTQUFNQyxlQUFOO0FBQ0E7OztpQ0FFY0csUyxFQUFXO0FBQ3pCLE9BQUloQixXQUFXLEtBQUtSLEVBQUwsQ0FBUVMsSUFBUixDQUFhLENBQWIsQ0FBZjtBQUNBLE9BQUkwQixPQUFPWCxVQUFVRSxVQUFyQjtBQUNBLFFBQUksSUFBSWhCLElBQUUsQ0FBVixFQUFhQSxJQUFFRixTQUFTRyxLQUFULENBQWVDLE1BQTlCLEVBQXFDRixHQUFyQyxFQUEwQztBQUN6QyxRQUFHRixTQUFTRyxLQUFULENBQWVELENBQWYsS0FBcUJ5QixJQUF4QixFQUE4QjtBQUM3QixZQUFPekIsQ0FBUDtBQUNBO0FBQ0Q7QUFDRDs7O21DQUVnQm1CLFcsRUFBYTtBQUM3QixPQUFJTyxVQUFVLEVBQWQ7QUFDQSxRQUFJLElBQUkxQixJQUFJLENBQVosRUFBZUEsSUFBRSxLQUFLVixFQUFMLENBQVFTLElBQVIsQ0FBYUcsTUFBOUIsRUFBc0NGLEdBQXRDLEVBQTJDO0FBQzFDO0FBQ0MwQixZQUFRLEtBQUtwQyxFQUFMLENBQVFTLElBQVIsQ0FBYUMsQ0FBYixFQUFnQkMsS0FBaEIsQ0FBc0JrQixXQUF0QixFQUFtQ1EsU0FBbkMsQ0FBNkNDLElBQTdDLEVBQVIsSUFBK0QsQ0FBL0Q7QUFDRDtBQUNBO0FBQ0QsT0FBSVgsYUFBYXpCLFNBQVNjLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQVcsY0FBV1ksRUFBWCxHQUFnQixnQkFBZ0JWLFdBQWhDO0FBQ0FGLGNBQVdiLFNBQVgsR0FBdUIsWUFBdkI7O0FBRUFhLGNBQVdhLFNBQVgsR0FBdUI7Ozs7O21DQUF2Qjs7QUFPQSxPQUFJQyxlQUFldkMsU0FBU2MsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBeUIsZ0JBQWEzQixTQUFiLEdBQXlCLGNBQXpCO0FBQ0EsUUFBSSxJQUFJNEIsSUFBUixJQUFnQk4sT0FBaEIsRUFBeUI7QUFDeEIsUUFBSU8sYUFBYXpDLFNBQVNjLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQTJCLGVBQVc3QixTQUFYLEdBQXVCLFlBQXZCO0FBQ0E2QixlQUFXSCxTQUFYLEdBQXVCLG1FQUFpRUUsSUFBakUsR0FBc0UsVUFBN0Y7QUFDQUQsaUJBQWF2QixXQUFiLENBQXlCeUIsVUFBekI7QUFDQTtBQUNEaEIsY0FBV1QsV0FBWCxDQUF1QnVCLFlBQXZCOztBQUVBLE9BQUlHLGFBQWExQyxTQUFTYyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0E0QixjQUFXOUIsU0FBWCxHQUF1QixZQUF2QjtBQUNBLE9BQUkrQixRQUFRM0MsU0FBU2MsYUFBVCxDQUF1QixRQUF2QixDQUFaO0FBQ0E2QixTQUFNUixTQUFOLEdBQWtCLElBQWxCO0FBQ0FRLFNBQU1DLFlBQU4sQ0FBbUIsWUFBbkIsRUFBaUNqQixXQUFqQztBQUNBZ0IsU0FBTTFCLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLEtBQUs0QixTQUFMLENBQWV4QixJQUFmLENBQW9CLElBQXBCLENBQWhDLEVBQTJELEtBQTNEO0FBQ0FxQixjQUFXMUIsV0FBWCxDQUF1QjJCLEtBQXZCO0FBQ0EsT0FBSUcsWUFBWTlDLFNBQVNjLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQWdDLGFBQVVYLFNBQVYsR0FBc0IsSUFBdEI7QUFDQVcsYUFBVUYsWUFBVixDQUF1QixZQUF2QixFQUFxQ2pCLFdBQXJDO0FBQ0FtQixhQUFVN0IsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBVTtBQUM3QyxRQUFJVSxjQUFjVCxNQUFNSyxhQUFOLENBQW9CWixPQUFwQixDQUE0Qm9DLEtBQTlDO0FBQ0EvQyxhQUFTQyxjQUFULENBQXdCLGdCQUFnQjBCLFdBQXhDLEVBQXFERyxLQUFyRCxDQUEyREMsT0FBM0QsR0FBcUUsTUFBckU7QUFDQWIsVUFBTUMsZUFBTjtBQUNBLElBSkQsRUFJRyxLQUpIO0FBS0F1QixjQUFXMUIsV0FBWCxDQUF1QjhCLFNBQXZCO0FBQ0FyQixjQUFXVCxXQUFYLENBQXVCMEIsVUFBdkI7QUFDQSxVQUFPakIsVUFBUDtBQUNBOzs7NEJBRVNQLEssRUFBTztBQUNoQixPQUFJUyxjQUFjVCxNQUFNSyxhQUFOLENBQW9CWixPQUFwQixDQUE0Qm9DLEtBQTlDO0FBQ0EsT0FBSXRCLGFBQWF6QixTQUFTQyxjQUFULENBQXdCLGdCQUFnQjBCLFdBQXhDLENBQWpCOztBQUVBLE9BQUlxQixRQUFRLEVBQUNDLEtBQUksSUFBTCxFQUFXQyxLQUFLLElBQWhCLEVBQVo7QUFDQSxPQUFJQyxTQUFTMUIsV0FBVzJCLG9CQUFYLENBQWdDLE9BQWhDLENBQWI7QUFDQSxPQUFHRCxPQUFPLENBQVAsRUFBVUUsS0FBYixFQUFvQjtBQUNuQkwsVUFBTUMsR0FBTixHQUFZSyxNQUFNSCxPQUFPLENBQVAsRUFBVUUsS0FBaEIsSUFBeUJGLE9BQU8sQ0FBUCxFQUFVRSxLQUFuQyxHQUEyQ0UsV0FBV0osT0FBTyxDQUFQLEVBQVVFLEtBQXJCLENBQXZEO0FBQ0E7QUFDRCxPQUFHRixPQUFPLENBQVAsRUFBVUUsS0FBYixFQUFvQjtBQUNuQkwsVUFBTUUsR0FBTixHQUFZSSxNQUFNSCxPQUFPLENBQVAsRUFBVUUsS0FBaEIsSUFBeUJGLE9BQU8sQ0FBUCxFQUFVRSxLQUFuQyxHQUEyQ0UsV0FBV0osT0FBTyxDQUFQLEVBQVVFLEtBQXJCLENBQXZEO0FBQ0E7O0FBRUQsT0FBSUcsV0FBVyxFQUFmOztBQUVBLFFBQUksSUFBSWhELElBQUksQ0FBWixFQUFlQSxJQUFFMkMsT0FBT3pDLE1BQXhCLEVBQWdDRixHQUFoQyxFQUFxQztBQUNwQyxRQUFHMkMsT0FBTzNDLENBQVAsRUFBVWlELE9BQWIsRUFBc0I7QUFDckJELGNBQVNMLE9BQU8zQyxDQUFQLEVBQVVnQixVQUFWLENBQXFCVyxTQUFyQixDQUErQkMsSUFBL0IsRUFBVCxJQUFrRCxDQUFsRDtBQUNBO0FBQ0Q7QUFDRCxRQUFLakMsU0FBTCxDQUFld0IsV0FBZixJQUE4QjZCLFFBQTlCO0FBQ0EsUUFBS3BELE1BQUwsQ0FBWXVCLFdBQVosSUFBMkJxQixLQUEzQjs7QUFFQSxRQUFJLElBQUl4QyxJQUFJLENBQVosRUFBZUEsSUFBRSxLQUFLVixFQUFMLENBQVFTLElBQVIsQ0FBYUcsTUFBOUIsRUFBc0NGLEdBQXRDLEVBQTJDO0FBQzFDLFFBQUlrRCxLQUFLLElBQVQ7QUFDQSxTQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFFLEtBQUs3RCxFQUFMLENBQVFTLElBQVIsQ0FBYUMsQ0FBYixFQUFnQkMsS0FBaEIsQ0FBc0JDLE1BQXZDLEVBQStDaUQsR0FBL0MsRUFBbUQ7QUFDbEQ7QUFDQSxTQUFJQyxNQUFNLEtBQUs5RCxFQUFMLENBQVFTLElBQVIsQ0FBYUMsQ0FBYixFQUFnQkMsS0FBaEIsQ0FBc0JrRCxDQUF0QixFQUF5QnhCLFNBQXpCLENBQW1DQyxJQUFuQyxFQUFWO0FBQ0E7QUFDQSxTQUFHLEtBQUtoQyxNQUFMLENBQVl1RCxDQUFaLENBQUgsRUFBbUI7QUFDbEIsVUFBRyxLQUFLdkQsTUFBTCxDQUFZdUQsQ0FBWixFQUFlVixHQUFmLElBQXNCVyxNQUFNLEtBQUt4RCxNQUFMLENBQVl1RCxDQUFaLEVBQWVWLEdBQTlDLEVBQW1EO0FBQ2xEUyxZQUFLLEtBQUw7QUFDQTtBQUNBO0FBQ0QsVUFBRyxLQUFLdEQsTUFBTCxDQUFZdUQsQ0FBWixFQUFlVCxHQUFmLElBQXNCVSxNQUFNLEtBQUt4RCxNQUFMLENBQVl1RCxDQUFaLEVBQWVULEdBQTlDLEVBQW1EO0FBQ2xEUSxZQUFLLEtBQUw7QUFDQTtBQUNBO0FBQ0Q7QUFDRCxTQUFHLEtBQUt2RCxTQUFMLENBQWV3RCxDQUFmLEtBQXFCRSxPQUFPQyxJQUFQLENBQVksS0FBSzNELFNBQUwsQ0FBZXdELENBQWYsQ0FBWixFQUErQmpELE1BQS9CLEdBQXdDLENBQWhFLEVBQW1FO0FBQ2xFLFVBQUcsQ0FBQyxLQUFLUCxTQUFMLENBQWV3RCxDQUFmLEVBQWtCQyxHQUFsQixDQUFKLEVBQTRCO0FBQzNCRixZQUFLLEtBQUw7QUFDQTtBQUNBO0FBQ0Q7QUFDRDtBQUNELFFBQUcsQ0FBQ0EsRUFBSixFQUFRO0FBQ1AsVUFBSzVELEVBQUwsQ0FBUVMsSUFBUixDQUFhQyxDQUFiLEVBQWdCc0IsS0FBaEIsQ0FBc0JDLE9BQXRCLEdBQWdDLE1BQWhDO0FBQ0EsS0FGRCxNQUVPLElBQUcsS0FBS2pDLEVBQUwsQ0FBUVMsSUFBUixDQUFhQyxDQUFiLEVBQWdCc0IsS0FBaEIsQ0FBc0JDLE9BQXRCLElBQWlDLE1BQXBDLEVBQTRDO0FBQ2xELFVBQUtqQyxFQUFMLENBQVFTLElBQVIsQ0FBYUMsQ0FBYixFQUFnQnNCLEtBQWhCLENBQXNCQyxPQUF0QixHQUFnQyxXQUFoQztBQUNBO0FBQ0Q7QUFDRE4sY0FBV0ssS0FBWCxDQUFpQkMsT0FBakIsR0FBMkIsTUFBM0I7QUFDQWIsU0FBTUMsZUFBTjtBQUNBOzs7Ozs7a0JBMUttQnZCLFciLCJmaWxlIjoidGFibGVmaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU4MmEwMTczZTZmZjkxNTA4NzNjIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZUZpbHRlciB7XG5cdGNvbnN0cnVjdG9yKHRhcmdldCkge1xuXHRcdHZhciBlbCA9IHRhcmdldC50YWdOYW1lID8gdGFyZ2V0IDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KTtcblx0XHRpZighZWwgfHwgZWwudGFnTmFtZSAhPSBcIlRBQkxFXCIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRWxlbWVudCBtdXN0IGJlIGEgdGFibGUnKTtcblx0XHR9XG5cdFx0dGhpcy5lbCA9IGVsO1xuXHRcdHRoaXMuc2VsZWN0ZWRzID0gW107XG5cdFx0dGhpcy5yYW5nZXMgPSBbXTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dmFyIGZpcnN0Um93ID0gdGhpcy5lbC5yb3dzWzBdO1xuXHRcdGlmKCFmaXJzdFJvdykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IodmFyIGk9MDsgaTxmaXJzdFJvdy5jZWxscy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRpZihmaXJzdFJvdy5jZWxsc1tpXS5kYXRhc2V0W1wiZmlsdGVyXCJdID09IFwidHJ1ZVwiKSB7XG5cdFx0XHRcdGZpcnN0Um93LmNlbGxzW2ldLmNsYXNzTmFtZSArPSBcIiBjb2x1bW5maWx0ZXJcIjtcblx0XHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGRpdi5jbGFzc05hbWUgPSBcImZpbHRlck9ialwiO1xuXHRcdFx0XHR2YXIgZmlsdGVyVGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0ZmlsdGVyVGlwLmNsYXNzTmFtZSA9IFwiZmlsdGVyVGlwXCI7XG5cdFx0XHRcdGRpdi5hcHBlbmRDaGlsZChmaWx0ZXJUaXApO1xuXHRcdFx0XHRkaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0ZmlsdGVyVGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdFx0Zmlyc3RSb3cuY2VsbHNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrKGV2ZW50KSB7XG5cdFx0dmFyIGZpbHRlck9iaiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZTtcblx0XHR2YXIgZmlsdGVyTGlzdCA9IGZpbHRlck9iai5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmlsdGVyTGlzdFwiKTtcblx0XHRpZighZmlsdGVyTGlzdC5sZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5JbmRleCA9IHRoaXMuZ2V0Q29sdW1uSW5kZXgoZmlsdGVyT2JqKTtcblx0XHRcdGZpbHRlckxpc3QgPSB0aGlzLmNyZWF0ZUZpbHRlckxpc3QoY29sdW1uSW5kZXgpO1xuXHRcdFx0ZmlsdGVyT2JqLmFwcGVuZENoaWxkKGZpbHRlckxpc3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdFswXTtcblx0XHR9XG5cdFx0aWYoZmlsdGVyTGlzdC5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIikge1xuXHRcdFx0ZmlsdGVyTGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlckxpc3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR9XG5cdFx0Zm9yKHZhciBpPTA7aTx0aGlzLmVsLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBmbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGkpO1xuXHRcdFx0aWYoZmwgJiYgZmwgIT0gZmlsdGVyTGlzdCkge1xuXHRcdFx0XHRmbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG5cblx0Z2V0Q29sdW1uSW5kZXgoZmlsdGVyT2JqKSB7XG5cdFx0dmFyIGZpcnN0Um93ID0gdGhpcy5lbC5yb3dzWzBdO1xuXHRcdHZhciBjZWxsID0gZmlsdGVyT2JqLnBhcmVudE5vZGU7XG5cdFx0Zm9yKHZhciBpPTA7IGk8Zmlyc3RSb3cuY2VsbHMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYoZmlyc3RSb3cuY2VsbHNbaV0gPT0gY2VsbCkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjcmVhdGVGaWx0ZXJMaXN0KGNvbHVtbkluZGV4KSB7XG5cdFx0dmFyIHNlbGVjdHMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAxOyBpPHRoaXMuZWwucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly8gaWYodGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpIHtcblx0XHRcdFx0c2VsZWN0c1t0aGlzLmVsLnJvd3NbaV0uY2VsbHNbY29sdW1uSW5kZXhdLmlubmVyVGV4dC50cmltKCldID0gMTtcdFxuXHRcdFx0Ly8gfVxuXHRcdH1cblx0XHR2YXIgZmlsdGVyTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZmlsdGVyTGlzdC5pZCA9IFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4O1xuXHRcdGZpbHRlckxpc3QuY2xhc3NOYW1lID0gXCJmaWx0ZXJMaXN0XCI7XG5cblx0XHRmaWx0ZXJMaXN0LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZmlsdGVySXRlbVwiPuaMieadoeS7tui/h+a7pDwvZGl2PlxcXG48ZGl2IGNsYXNzPVwiZmlsdGVyQ29uZFwiPlxcXG4gICAgPGRpdj48bGFiZWw+5LuOOjxsYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlsdGVySW5wdXRcIj48L2xhYmVsPjwvbGFiZWw+PC9kaXY+XFxcbiAgICA8ZGl2PjxsYWJlbD7liLA6PGxhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaWx0ZXJJbnB1dFwiPjwvbGFiZWw+PC9sYWJlbD48L2Rpdj5cXFxuPC9kaXY+XFxcbjxkaXYgY2xhc3M9XCJmaWx0ZXJJdGVtXCI+5oyJ5YC86L+H5rukPC9kaXY+JztcblxuXHRcdHZhciBmaWx0ZXJTY3JvbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlclNjcm9sbC5jbGFzc05hbWUgPSBcImZpbHRlclNjcm9sbFwiO1xuXHRcdGZvcih2YXIgaXRlbSBpbiBzZWxlY3RzKSB7XG5cdFx0XHR2YXIgZmlsdGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRmaWx0ZXJJdGVtLmNsYXNzTmFtZSA9IFwiZmlsdGVySXRlbVwiO1xuXHRcdFx0ZmlsdGVySXRlbS5pbm5lckhUTUwgPSAnPGxhYmVsPiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImZpbHRlckNoZWNrYm94XCIgdmFsdWU9XCJcIj4nK2l0ZW0rJzwvbGFiZWw+Jztcblx0XHRcdGZpbHRlclNjcm9sbC5hcHBlbmRDaGlsZChmaWx0ZXJJdGVtKTtcblx0XHR9XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJTY3JvbGwpO1xuXG5cdFx0dmFyIGZpbHRlckJ0bnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGZpbHRlckJ0bnMuY2xhc3NOYW1lID0gXCJmaWx0ZXJCdG5zXCI7XG5cdFx0dmFyIG9rQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRva0J0bi5pbm5lclRleHQgPSBcIuehruWumlwiO1xuXHRcdG9rQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpO1xuXHRcdG9rQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uT2tDbGljay5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cdFx0ZmlsdGVyQnRucy5hcHBlbmRDaGlsZChva0J0bik7XG5cdFx0dmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y2FuY2VsQnRuLmlubmVyVGV4dCA9IFwi5Y+W5raIXCI7XG5cdFx0Y2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgY29sdW1uSW5kZXgpXG5cdFx0Y2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGNvbHVtbkluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWx0ZXJMaXN0LVwiICsgY29sdW1uSW5kZXgpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH0sIGZhbHNlKTtcblx0XHRmaWx0ZXJCdG5zLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cdFx0ZmlsdGVyTGlzdC5hcHBlbmRDaGlsZChmaWx0ZXJCdG5zKTtcblx0XHRyZXR1cm4gZmlsdGVyTGlzdDtcblx0fVxuXG5cdG9uT2tDbGljayhldmVudCkge1xuXHRcdHZhciBjb2x1bW5JbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcblx0XHR2YXIgZmlsdGVyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsdGVyTGlzdC1cIiArIGNvbHVtbkluZGV4KTtcblxuXHRcdHZhciByYW5nZSA9IHttaW46bnVsbCwgbWF4OiBudWxsfTtcblx0XHR2YXIgaW5wdXRzID0gZmlsdGVyTGlzdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpO1xuXHRcdGlmKGlucHV0c1swXS52YWx1ZSkge1xuXHRcdFx0cmFuZ2UubWluID0gaXNOYU4oaW5wdXRzWzBdLnZhbHVlKSA/IGlucHV0c1swXS52YWx1ZSA6IHBhcnNlRmxvYXQoaW5wdXRzWzBdLnZhbHVlKTtcblx0XHR9XG5cdFx0aWYoaW5wdXRzWzFdLnZhbHVlKSB7XG5cdFx0XHRyYW5nZS5tYXggPSBpc05hTihpbnB1dHNbMV0udmFsdWUpID8gaW5wdXRzWzFdLnZhbHVlIDogcGFyc2VGbG9hdChpbnB1dHNbMV0udmFsdWUpO1xuXHRcdH1cblxuXHRcdHZhciBzZWxlY3RlZCA9IHt9O1xuXG5cdFx0Zm9yKHZhciBpID0gMjsgaTxpbnB1dHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKGlucHV0c1tpXS5jaGVja2VkKSB7XG5cdFx0XHRcdHNlbGVjdGVkW2lucHV0c1tpXS5wYXJlbnROb2RlLmlubmVyVGV4dC50cmltKCldID0gMTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RlZHNbY29sdW1uSW5kZXhdID0gc2VsZWN0ZWQ7XG5cdFx0dGhpcy5yYW5nZXNbY29sdW1uSW5kZXhdID0gcmFuZ2U7XG5cblx0XHRmb3IodmFyIGkgPSAxOyBpPHRoaXMuZWwucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHNkID0gdHJ1ZTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGo8dGhpcy5lbC5yb3dzW2ldLmNlbGxzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0Ly8gaWYoKHRoaXMuc2VsZWN0ZWRzW2pdICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRzW2pdKS5sZW5ndGggPiAwKSB8fCAodGhpcy5yYW5nZXNbal0gJiYgKHRoaXMucmFuZ2VzW2pdLm1pbiB8fCB0aGlzLnJhbmdlc1tqXS5tYXgpKSkge1xuXHRcdFx0XHR2YXIgdHh0ID0gdGhpcy5lbC5yb3dzW2ldLmNlbGxzW2pdLmlubmVyVGV4dC50cmltKCk7XG5cdFx0XHRcdC8vIH1cblx0XHRcdFx0aWYodGhpcy5yYW5nZXNbal0pIHtcblx0XHRcdFx0XHRpZih0aGlzLnJhbmdlc1tqXS5taW4gJiYgdHh0IDwgdGhpcy5yYW5nZXNbal0ubWluKSB7XG5cdFx0XHRcdFx0XHRzZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRoaXMucmFuZ2VzW2pdLm1heCAmJiB0eHQgPiB0aGlzLnJhbmdlc1tqXS5tYXgpIHtcblx0XHRcdFx0XHRcdHNkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5zZWxlY3RlZHNbal0gJiYgT2JqZWN0LmtleXModGhpcy5zZWxlY3RlZHNbal0pLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZighdGhpcy5zZWxlY3RlZHNbal1bdHh0XSkge1xuXHRcdFx0XHRcdFx0c2QgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoIXNkKSB7XG5cdFx0XHRcdHRoaXMuZWwucm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHR9IGVsc2UgaWYodGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcblx0XHRcdFx0dGhpcy5lbC5yb3dzW2ldLnN0eWxlLmRpc3BsYXkgPSBcInRhYmxlLXJvd1wiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmaWx0ZXJMaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90YWJsZWZpbHRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=