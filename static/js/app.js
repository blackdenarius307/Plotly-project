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

// d3.select("selDataset")
//   .selectAll()
//   .data(Names)
//   .enter()
//   .append()
//   .html(function(d) {
//     return `<option value ="${d.names}">${d.names}</option>`;
//   });
