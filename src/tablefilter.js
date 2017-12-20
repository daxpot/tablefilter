
export default class TableFilter {
	constructor(target) {
		var el = target.tagName ? target : document.getElementById(target);
		if(!el || el.tagName != "TABLE") {
			throw new Error('Element must be a table');
		}
		this.el = el;
		this.selecteds = [];
		this.ranges = [];
		this.init();
	}

	init() {
		var firstRow = this.el.rows[0];
		if(!firstRow) {
			return;
		}
		for(var i=0; i<firstRow.cells.length;i++) {
			if(firstRow.cells[i].dataset["filter"] == "true") {
				firstRow.cells[i].className += " columnfilter";
				var div = document.createElement("div");
				div.className = "filterObj";
				var filterTip = document.createElement("div");
				filterTip.className = "filterTip";
				div.appendChild(filterTip);
				div.addEventListener("click", function(){
					event.stopPropagation();
				}, false);
				filterTip.addEventListener('click', this.onClick.bind(this), false);
				firstRow.cells[i].appendChild(div);
			}
		}
	}

	onClick(event) {
		var filterObj = event.currentTarget.parentNode;
		var filterList = filterObj.getElementsByClassName("filterList");
		if(!filterList.length) {
			var columnIndex = this.getColumnIndex(filterObj);
			filterList = this.createFilterList(columnIndex);
			filterObj.appendChild(filterList);
		} else {
			filterList = filterList[0];
		}
		if(filterList.style.display == "block") {
			filterList.style.display = "none";
		} else {
			filterList.style.display = "block";
		}
		for(var i=0;i<this.el.rows.length; i++) {
			var fl = document.getElementById("filterList-" + i);
			if(fl && fl != filterList) {
				fl.style.display = "none";
			}
		}
		event.stopPropagation();
	}

	getColumnIndex(filterObj) {
		var firstRow = this.el.rows[0];
		var cell = filterObj.parentNode;
		for(var i=0; i<firstRow.cells.length;i++) {
			if(firstRow.cells[i] == cell) {
				return i;
			}
		}
	}

	createFilterList(columnIndex) {
		var selects = {};
		for(var i = 1; i<this.el.rows.length; i++) {
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
		for(var item in selects) {
			var filterItem = document.createElement("div");
			filterItem.className = "filterItem";
			filterItem.innerHTML = '<label> <input type="checkbox" name="filterCheckbox" value="">'+item+'</label>';
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
		cancelBtn.setAttribute("data-index", columnIndex)
		cancelBtn.addEventListener("click", function(){
			var columnIndex = event.currentTarget.dataset.index;
			document.getElementById("filterList-" + columnIndex).style.display = "none";
			event.stopPropagation();
		}, false);
		filterBtns.appendChild(cancelBtn);
		filterList.appendChild(filterBtns);
		return filterList;
	}

	onOkClick(event) {
		var columnIndex = event.currentTarget.dataset.index;
		var filterList = document.getElementById("filterList-" + columnIndex);

		var range = {min:null, max: null};
		var inputs = filterList.getElementsByTagName("input");
		if(inputs[0].value) {
			range.min = isNaN(inputs[0].value) ? inputs[0].value : parseFloat(inputs[0].value);
		}
		if(inputs[1].value) {
			range.max = isNaN(inputs[1].value) ? inputs[1].value : parseFloat(inputs[1].value);
		}

		var selected = {};

		for(var i = 2; i<inputs.length; i++) {
			if(inputs[i].checked) {
				selected[inputs[i].parentNode.innerText.trim()] = 1;
			}
		}
		this.selecteds[columnIndex] = selected;
		this.ranges[columnIndex] = range;

		for(var i = 1; i<this.el.rows.length; i++) {
			var sd = true;
			for(var j = 0; j<this.el.rows[i].cells.length; j++){
				// if((this.selecteds[j] && Object.keys(this.selecteds[j]).length > 0) || (this.ranges[j] && (this.ranges[j].min || this.ranges[j].max))) {
				var txt = this.el.rows[i].cells[j].innerText.trim();
				// }
				if(this.ranges[j]) {
					if(this.ranges[j].min && txt < this.ranges[j].min) {
						sd = false;
						break;
					}
					if(this.ranges[j].max && txt > this.ranges[j].max) {
						sd = false;
						break;
					}
				}
				if(this.selecteds[j] && Object.keys(this.selecteds[j]).length > 0) {
					if(!this.selecteds[j][txt]) {
						sd = false;
						break;
					}
				}
			}
			if(!sd) {
				this.el.rows[i].style.display = "none";
			} else if(this.el.rows[i].style.display == "none") {
				this.el.rows[i].style.display = "table-row";
			}
		}
		filterList.style.display = "none";
		event.stopPropagation();
	}
}