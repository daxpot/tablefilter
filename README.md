tablefilter
---

A small & simple filter component for tables written in JavaScript.

### Quick start

``` html
<script src='tablefilter.js'></script>
<link rel="stylesheet" type="text/css" href="tablefilter.css">

<script>
  new TableFilter(document.getElementById('table-id'));
</script>
```
```html
<table id='filter-table'>
	<thead><tr><th>A<th data-filter='true'>B<th data-filter='true'>C<th data-filter='true'>D</thead>
	<tbody>	<tr><td>1<td>B1<td>C1<td>2
			<tr><td>2<td>B1<td>C2<td>1
			<tr><td>3<td>B2<td>C3<td>7
			<tr><td>4<td>B2<td>C2<td>3
			<tr><td>5<td>B1<td>C1<td>8
			<tr><td>6<td>B1<td>C2<td>5
			<tr><td>7<td>B2<td>C3<td>4
			<tr><td>8<td>B2<td>C2<td>6
	</tbody>
</table>
```
**[See usage and demos for more](http://zengkv.com/tablefilter/public/)**