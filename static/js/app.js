//Make a variable of the JSON file
const JSON = "samples.json";

//Convert the JSON to a readable state
const Data = d3.json(JSON, function(data) {
  console.log(data)
});

// Parse the JSON and make an array of ID's
const ID = d3.json(JSON).then(function(data) {
  console.log(data.names);
});

//Parse the JSON and make an array of Metadata
const Metadata = d3.json(JSON).then(function(data) {
  console.log(data.metadata);
});

//Parse the JSON and get the Sample data
const Samples = d3.json(JSON).then(function(data) {
  console.log(data.samples);
});



// d3.select("selDataset")
//   .selectAll()
//   .data(Names)
//   .enter()
//   .append()
//   .html(function(d) {
//     return `<option value ="${d.names}">${d.names}</option>`;
//   });

//Display an initial plot
function init() {
  //Choose initial ID for base data
  var initial = 940;
// Create the labels
  var labels = Object.keys(Samples.otu_ids === initial);
  console.log(labels);
//Choose initial dataset
  var dataset = Object.values(Samples.sample_values === initial);
  console.log(dataset);
//Create the plot data
  var data = [{
    values: dataset,
    labels: labels,
    type: "bar"
  }];
  var layout = {
    height: 600,
    width:800
  };
  Plotly.newPLot("bar", data, layout);
}

init();