//Select the Dropdown for later use.
const dropdownMenu = d3.select("#selDataset");

//Select the Demographic Box for later use
const demoBox = d3.select(".summary");

//Read the data to get datasets
d3.json("samples.json").then((readData) => {
  //Full dataset
  let data = readData;
  console.log(data)
  //Metadata only
  let metadata = data.metadata;
  console.log(metadata);
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
  
  var inputValue = 940

  //Read Input
  console.log(inputValue);

  //Initial Demigraphics
    //Try and input the Metadata
    d3.json("samples.json").then(readData => {
      let data = readData;
      //Grab Metadata
      let metadata = data.metadata;
      console.log(metadata);
      //Filter it down
      let filteredMetadata = metadata.filter(metadata => metadata.id == inputValue);
      console.log(filteredMetadata);
      //Append a UL with the metadata
      filteredMetadata.forEach(data => {
        demoBox.append("li").text(`Age: ${data.age}`);
        demoBox.append("li").text(`bbtype: ${data.bbtype}`);
        demoBox.append("li").text(`Ethnicity: ${data.ethnicity}`);
        demoBox.append("li").text(`Gender: ${data.gender}`);
        demoBox.append("li").text(`location: ${data.location}`);
      });
    });
}

const optionChanged = () => {
  //grab the value
  var inputValue = dropdownMenu.property("value");
  // var inputValue = `${input}`
  
  //Print the value
  console.log(inputValue);
  
  //Try and input the Metadata
  d3.json("samples.json").then(readData => {
    let data = readData;
    //Grab Metadata
    let metadata = data.metadata;
    console.log(metadata);
    //Filter it down
    let filteredMetadata = metadata.filter(metadata => metadata.id == inputValue);
    console.log(filteredMetadata);
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
  });
  d3.json("samples.json").then(readData => {
    let data = readData
    let sampleData = data.samples;
    console.log(sampleData);
  });
}

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