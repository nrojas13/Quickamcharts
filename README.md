Quickamcharts
==========

Usage
-----

Download the package and reference the JavaScript file:

```html
<script src="src/quickamcharts.js"></script>
```

Tutorial
--------

The easiest way to get started is follow the [Quickamcharts tutorial on Youtube](https://www.youtube.com/nicorojas01) coming soon :)


Examples
--------

The most basic chart variations with one data set:

```javascript
// Parameters
var arraySet = [
	[{"Time": "00", "Value": "1"}, {"Time": "03", "Value": "4"}]
];
var nameSet = ["Value"];
var param = "Time";
var div = "chart_div";

Quickamcharts.lineGraph(arraySet, nameSet, param, div);
Quickamcharts.barGraph(arraySet, nameSet, param, div);
Quickamcharts.areaGraph(arraySet, nameSet, param, div);
```

For two or more data sets:

```javascript
// Parameters
var arraySet = [
	[{"Time": "00", "Value": "1"}, {"Time": "03", "Value": "4"}],
	[{"Time": "00", "Value": "3"}, {"Time": "05", "Value": "1"}]
];
var nameSet = ["Value", "Value 2"];
var param = "Time";
var div = "chart_div";

Quickamcharts.lineGraph(arraySet, nameSet, param, div);
Quickamcharts.barGraph(arraySet, nameSet, param, div);
Quickamcharts.areaGraph(arraySet, nameSet, param, div);
```
=======
