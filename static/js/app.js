//Select the Dropdown for later use.
const dropdownMenu = d3.select("#selDataset");

//Select the Demographic Box for later use
const demoBox = d3.select("#panel-body");

//Read the data to get datasets
d3.json("samples.json").then((readData) => {
  //Full dataset
  let data = readData;
  console.log(data)
  //Metadata only
  let metadata = data.metadata;
  console.log(metadata);
});


// //Make a variable of the JSON file
// const JSON = "samples.json";

// //Convert the JSON to a readable state
// const Data = d3.json(JSON, function(data) {
//   console.log(data)
// });

// // Parse the JSON and make an array of ID's
// const ID = d3.json(JSON).then(function(data) {
//   console.log(data.names);
// });

// //Parse the JSON and make an array of Metadata
// const Metadata = d3.json(JSON).then(function(data) {
//   console.log(data.metadata);
// });

// //Parse the JSON and get the Sample data
// const Samples = d3.json(JSON).then(function(data) {
//   console.log(data.samples);
// });
// //Display an initial plot
// function init() {
//   //Choose initial ID for base data
//   // var initial = Samples.id("940");
// // Create the labels
//   var labels = Object.keys(Samples.otu_ids === 940);
//   console.log(labels);
// //Choose initial dataset
//   var dataset = Object.values(Samples.sample_values === 940);
//   console.log(dataset);
// //Create the plot data
//   var trace1 = {
//     x: dataset,
//     y: labels,
//     type: "bar"
//   };
  
//   var data = [trace1]
  
//   var layout = {
//     title: "Starter Graph",
//     xaxis: {title: "Numbers"},
//     yaxis: { title: "labels"}
//     // height: 600,
//     // width: 800
//     // hovermode: 
//   };
  
// Plotly.newPLot(".bar", data, layout);
// };
// function changeGraph() {
//   let name = dropdownMenu.property("value");

//   d3.json("samples.json")
// }

//Create initial state function
const init = () => {
  //Append the ID's to the dropdown
  d3.json("samples.json").then(readData => {
    let data = readData;
    let fullID = data.names
    fullID.forEach(names => {
      dropdownMenu.append("option").text(names).property("value", names);
    });
  });
  
  var id = 940

  //Read Input
  console.log(id);
}

const optionChanged = () => {
  //grab the value
  var id = dropdownMenu.property("value");
  //Print the value
  console.log(id);
}
init();