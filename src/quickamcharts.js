(function(window){
	function defineQuickamcharts() {
		var Quickamcharts = {};
		/*
			Merges x arrays into one by a key value
			@param: arraySet set of arrays of data to be displayed
		*/
		Quickamcharts.merge = function (arraySet, nameSet, param) {
			//
			var first = arraySet[0];
			var firstName = nameSet[0];
			for(var i = 1; i < arraySet.length; i++) {
				Quickamcharts.mergeHelper(first, arraySet[i], firstName, nameSet[i], param);
			}
			return first;
		};
		/*
			Helper method for merge
			@param: arraySet set of arrays of data to be displayed
		*/
		Quickamcharts.mergeHelper = function (g, c, value1, value2, param) {
	        for (i = 0; i < g.length; i++) {        //Loop trough first array
	            var curID = g[i][param];                //Get ID of current object
	            var exists = false;
	            var temoObj;
	            for (j = 0; j < c.length; j++) {    //Loop trough second array
	                exists = false;
	                if (curID === c[j][param]){          //If id from array1 exists in array2
	                    exists = true;
	                    tempObj = c[j];             //Get id,object from array 2
	                    break;
	                }
	            }
	            if(exists) {
	                g[i][value2] = tempObj[value1];//If exists add circle from array2 to the record in array1
	                //console.log(tempObj);
	            }else{
	                g[i][value2] = "0";          //If it doesn't add circle with value "no"
	            }
	        }

	        for (i = 0; i < c.length; i++) {        //Loop trough array 2
	            var curObj = c[i];
	            var ex = true;
	            g.forEach(function(row) {           //Loop to check if id form array2 exists in array1
	                if (curObj[param] === row[param]){
	                    ex = false;
	                }
	            });
	            if(ex){                             //If it doesn't exist add goal to object with value "no" and push it into array1
	                var temp = curObj[value1];
	                curObj[value2] = temp;
	                curObj[value1] = "0";

	                g.push(curObj);
	            }
	        }

	    };
		/*
			Sorts an array in ascending order by a key value
			1: ASC, -1: DESC
			@param: array array to be sorted
		*/
		Quickamcharts.sort = function (objArray, prop, direction) {
			// 
			if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
	        var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

	        if (objArray && objArray.constructor===Array){
	            var propPath = (prop.constructor===Array) ? prop : prop.split(".");
	            objArray.sort(function(a,b){
	                for (var p in propPath){
	                    if (a[propPath[p]] && b[propPath[p]]){
	                        a = a[propPath[p]];
	                        b = b[propPath[p]];
	                    }
	                }
	                // convert numeric strings to integers
	                a = a.match(/^\d+$/) ? +a : a;
	                b = b.match(/^\d+$/) ? +b : b;
	                return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
	            });
	        }
		};
		/*
			Creates a line chart with the arrays included in the param set
			@param: arraySet set of arrays to graph in a line chart
		*/
		Quickamcharts.lineGraph = function (arraySet, nameSet, param, div) {
			// 
			var chartNum = arraySet.length;
			var chartData = Quickamcharts.merge(arraySet, nameSet, param);
			Quickamcharts.sort(chartData, param);
			var chart = AmCharts.makeChart(div,
	          {
	            "type": "serial",
	            "categoryField": "Time",
	            "dataDateFormat": "YYYY-MM-DD HH",
	            "chartCursor": {
	              "enabled": true,
	              "categoryBalloonDateFormat": "JJ:NN"
	            },
	            "trendLines": [],
	            "graphs": [
	              {
	                "id": "AmGraph-1",
	                "lineAlpha": 1,
	                "lineThickness": 2,
	                "title": nameSet[0],
	                "valueField": nameSet[0]
	              }
	            ],
	            "guides": [],
	            "valueAxes": [
	              {
	                "id": "ValueAxis-1",
	                "title": ""
	              }
	            ],
	            "allLabels": [],
	            "balloon": {},
	            "legend": {
	              "enabled": true
	            },
	            "titles": [
	              {
	                "id": "Title-1",
	                "size": 15,
	                "text": ""
	              }
	            ],
	            "dataProvider": chartData
	          }
	        );
        	for( var i = 1; i < chartNum; i++) {
	        	var graph = new AmCharts.AmGraph();
	        	graph.lineAlpha = 1;
	        	graph.valueField = nameSet[i];
	        	graph.lineThickness = 2;
	        	graph.title = nameSet[i];
	        	chart.addGraph(graph);
	        }	        
		};
		/*
			Creates a bar chart with the arrays included in the param set
			@param: arraySet set of arrays to graph in a bar chart
		*/
		Quickamcharts.barGraph = function (arraySet, nameSet, param, div) {
			// 
			var chartNum = arraySet.length;
			var chartData = Quickamcharts.merge(arraySet, nameSet, param);
			Quickamcharts.sort(chartData, param);
			var chart = AmCharts.makeChart(div,
	          {
	            "type": "serial",
	            "categoryField": "Time",
	            "dataDateFormat": "YYYY-MM-DD HH",
	            "chartCursor": {
	              "enabled": true,
	              "categoryBalloonDateFormat": "JJ:NN"
	            },
	            "trendLines": [],
	            "graphs": [
	              {
	                "id": "AmGraph-1",
	                "type": "column",
	                "fillAlphas": 1,
	                "title": nameSet[0],
	                "valueField": nameSet[0]
	              }
	            ],
	            "guides": [],
	            "valueAxes": [
	              {
	                "id": "ValueAxis-1",
	                "title": ""
	              }
	            ],
	            "allLabels": [],
	            "balloon": {},
	            "legend": {
	              "enabled": true
	            },
	            "titles": [
	              {
	                "id": "Title-1",
	                "size": 15,
	                "text": ""
	              }
	            ],
	            "dataProvider": chartData
	          }
	        );
	        for( var i = 1; i < chartNum; i++) {
	        	var graph = new AmCharts.AmGraph();
	        	graph.type = "column";
	        	graph.fillAlphas = 1;
	        	graph.valueField = nameSet[i];
	        	graph.title = nameSet[i];
	        	chart.addGraph(graph);
	        }
		};
		/*
			Creates an area chart with the arrays included in the param set
			@param: arraySet set of arrays to graph in an area chart
		*/
		Quickamcharts.areaGraph = function (arraySet, nameSet, param, div) {
			//
			var chartNum = arraySet.length;
			var chartData = Quickamcharts.merge(arraySet, nameSet, param);
			Quickamcharts.sort(chartData, param);
			var chart = AmCharts.makeChart(div,
	          {
	            "type": "serial",
	            "categoryField": "Time",
	            "dataDateFormat": "YYYY-MM-DD HH",
	            "chartCursor": {
	              "enabled": true,
	              "categoryBalloonDateFormat": "JJ:NN"
	            },
	            "trendLines": [],
	            "graphs": [
	              {
	                "id": "AmGraph-1",
	                "lineAlpha": 0,
	                "fillAlphas": 0.9,
	                "title": nameSet[0],
	                "valueField": nameSet[0]
	              }
	            ],
	            "guides": [],
	            "valueAxes": [
	              {
	                "id": "ValueAxis-1",
	                "title": ""
	              }
	            ],
	            "allLabels": [],
	            "balloon": {},
	            "legend": {
	              "enabled": true
	            },
	            "titles": [
	              {
	                "id": "Title-1",
	                "size": 15,
	                "text": ""
	              }
	            ],
	            "dataProvider": chartData
	          }
	        );
	        for( var i = 1; i < chartNum; i++) {
	        	var graph = new AmCharts.AmGraph();
	        	graph.fillAlphas = 0.7;
	        	graph.lineAlpha = 0;
	        	graph.valueField = nameSet[i];
	        	graph.title = nameSet[i];
	        	chart.addGraph(graph);
	        }
		};
		return Quickamcharts;
	}
	if(typeof(Quickamcharts) === 'undefined') {
		window.Quickamcharts = defineQuickamcharts();
	}
})(window);