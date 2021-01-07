//Select the Dropdown for later use.
const dropdownMenu = d3.select("#selDataset");

//Select the Demographic Box for later use
const demoBox = d3.select(".summary");

//Read the data to get datasets
d3.json("samples.json").then((readData) => {
  //Full dataset
  let data = readData;
  //Metadata only
  let metadata = data.metadata;
});

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
}

const optionChanged = () => {
  //grab the value
  var inputValue = dropdownMenu.property("value");
  //Print the value
  console.log(inputValue);
  //Try and input the Metadata
  d3.json("samples.json").then(readData => {
    let data = readData;
    //Grab Metadata
    let metadata = data.metadata;
    //Filter it down
    let filteredMetadata = metadata.filter(metadata => metadata.id == inputValue);
    //Clear demoBox
    demoBox.html("");
    //Append a UL with the metadata
    filteredMetadata.forEach(data => {
      demoBox.append("li").text(`Age: ${data.age}`);
      demoBox.append("li").text(`bbtype: ${data.bbtype}`);
      demoBox.append("li").text(`Ethnicity: ${data.ethnicity}`);
      demoBox.append("li").text(`Gender: ${data.gender}`);
      demoBox.append("li").text(`location: ${data.location}`);
    });
    //Gather Sample Data
    let sampleData = data.samples;
    //Filter down to your inputvalue
    let filteredSampleData = sampleData.filter(sampleData => sampleData.id == inputValue);
    //Slice the ID's to top 10
    let slicedSampleNames = filteredSampleData[0].otu_ids.slice(0,10);
    //Make a string with OTU on the front so Plotly doesn't have a stroke with your graph
    let stringSampleNames = slicedSampleNames.map(sample => `OTU ${sample}`);
    //Slice the Sample Values down to size
    let slicedSampleValues = filteredSampleData[0].sample_values.slice(0,10);
    
    //Create Bar Trace Information
    let trace1 =  {
      type: "bar",
      x: slicedSampleValues,
      y: stringSampleNames,
      orientation: "h"
    };
    let barData = [trace1];
    let barLayout = {
      title: "Top 10 Bacteria Found",
      yaxis: {
        tickmode:"array",
        tickvals: slicedSampleNames
        }
      };
      //Create Bubble Graph information
      let trace2 = {
      x: slicedSampleNames,
      y: slicedSampleValues,
      text: stringSampleNames,
      mode: "markers",
      marker: {
        size: slicedSampleValues,
        color: slicedSampleNames
        }
    };
    let pieData = [trace2];
    let pieLayout = {
      title: "Top 10 Bacteria Found"
    };
    //Make the Plots happen.
    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", pieData, pieLayout);
  });
}
init();