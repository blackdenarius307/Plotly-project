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
    let filteredSampleData = sampleData.filter(sampleData => sampleData.id == inputValue);
    let slicedSampleNames = filteredSampleData[0].otu_ids.slice(0,10);
    let stringSampleNames = slicedSampleNames.map(sample => `OTU ${sample}`);
    console.log(stringSampleNames);
    let slicedSampleValues = filteredSampleData[0].sample_values.slice(0,10);
    // // //Order values
    // // let orderedSampleValues = filteredSampleData.map(object => object.sample_values)//.sort((a,b) => a-b);
    // // Slice down to size
    // let slicedSampleValues = orderedSampleValues.map(object => object.slice(0,10));
    // //Grab Sample names
    // let filteredSampleNames = filteredSampleData.map(object => object.otu_ids);
    // //Slice down to size
    // let slicedSampleNames = filteredSampleNames.map(object => object.slice(0,10));
    // console.log(slicedSampleNames);
    // console.log(slicedSampleValues);

    let trace1 =  {
      type: "bar",
      x: slicedSampleValues,
      y: stringSampleNames,
      orientation: "h"
    };
    let graphData = [trace1];
    let layout = {
      title: "Top 10 Bacteria Found",
      yaxis: {
        tickmode:"array",
        tickvals: slicedSampleNames
        }
      };
    
    Plotly.newPlot("bar", graphData, layout);
  });
}

  
  
  
  // //Create the Bar chart
  // d3.json("samples.json").then(readData => {
  //   let data = readData
  //   let sampleData = data.samples;
  //   //Filter Sample Data
  //   let filteredSampleData = sampleData.filter(sampleData => sampleData.id == inputValue);
  //   console.log(filteredSampleData);
  //   let Values = filteredSampleData.otu_ids;
  //   console.log(Values)

  
    //Slice down the data
    // let values = filteredSampleData.sample_values;
    // console.log(values);
//   });
// }

// const metaData = () => {
//     //Try and input the Metadata
//     d3.json("samples.json").then(readData => {
//       let data = readData;
//       //Grab Metadata
//       let metadata = data.metadata;
//       console.log(metadata);
//       //Filter it down
//       let filteredMetadata = metadata.filter(metadata => metadata.id == inputValue);
//       console.log(filteredMetadata);
//       //Append a UL with the metadata
//       filteredMetadata.forEach(data => {
//         demoBox.append("li").text(`Age: ${data.age}`);
//         demoBox.append("li").text(`bbtype: ${data.bbtype}`);
//         demoBox.append("li").text(`Ethnicity: ${data.ethnicity}`);
//         demoBox.append("li").text(`Gender: ${data.gender}`);
//         demoBox.append("li").text(`location: ${data.location}`);
//       });
//     });
// }
init();