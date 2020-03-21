// URL for sample dataset
const url = "http://www.json-generator.com/api/json/get/cgrXRZCQlK?indent=2"
var h = d3.select("#selDataset").property("value")
// Runs buildPlot() on drop down menu change
d3.selectAll("#selDataset").on("change", buildPlot);

// logs sample set to console
// d3.json(url).then(function(data) {
// 	console.log(data);
// });

// I guess this is the only way to make the findIndex method work?
function returnSelf() {
	h = d3.select("#selDataset").property("value");
	return h;
};

function buildPlot() {
	
	d3.json(url).then(function(data) {

	// Determines index of drop down selection
	var i = data.names.indexOf(parseInt(d3.select("#selDataset").property("value")));
	console.log(i);
	// Takes first 10 values from OTU IDs, Sample Values, and OTU Labels
	// Reverses array order to format chart correctly
    var name = data.samples[i].id;
    var otu_ids = data.samples[i].otu_ids.slice(0,10).reverse();
    var sample_values = data.samples[i].sample_values.slice(0,10).reverse();
    var otu_labels = data.samples[i].otu_labels.slice(0,10).reverse();

	// Data formatting
	var data = [{
	type: "bar",
	x: sample_values,
	y: Array(10).keys(),
	text: otu_labels,
	orientation: "h"
	}];

	// Layout formatting
    var layout = {
		yaxis: {
			// Formatting ticks for graph
			tickmode: "array",
			tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			ticktext: [
				"OTU" + otu_ids[0],
				"OTU" + otu_ids[1],
				"OTU" + otu_ids[2],
				"OTU" + otu_ids[3],
				"OTU" + otu_ids[4],
				"OTU" + otu_ids[5],
				"OTU" + otu_ids[6],
				"OTU" + otu_ids[7],
				"OTU" + otu_ids[8],
				"OTU" + otu_ids[9]
				],
		}
	};

    Plotly.newPlot("bar", data, layout);

  });
}
