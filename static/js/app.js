const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

let jsondata = [];
let names = [];
let value = [];
let label = [];

//Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Fetch the JSON data and console log it
d3.json(url).then(function(data){
    for (i = 0; i < data["samples"].length; i++) {
        jsondata.push(data["samples"][i]);
    }
    for (i = 0; i < data["names"].length; i++) {
        names.push(data["names"][i]);
    }

    let drop = d3.select("#selDataset");
    drop.append("option").property("",names[i]).text("Choose ID");
    for (i = 0; i < names.length; i++) {
        drop.append("option").property("value",names[i]).text(names[i]);
    }

});

// Function called by DOM changes
function optionChanged(dataset) {
    let value = [];
    let label = [];

    // for (i = 0; i < names.length; i++) {
    //     if (dataset == names[i]) {
    //         value.push(jsondata[i]["sample_values"].slice(0,10));
    //         label.push(jsondata[i]["otu_ids"].slice(0,10));
    //     }
    // }

    for (i = 0; i < names.length; i++) {
        if (dataset == names[i]) {
            value.push(jsondata[i]["sample_values"]);
            label.push(jsondata[i]["otu_ids"]);
        }
    }

    value = value[0];
    label = label[0];

    barValue = value.slice(0,10);
    barLabel = label.slice(0,10);

    // console.log(value);
    // console.log(label);

    allData = [];
    for (i = 0; i < label.length; i++) {
        newlabel = `OTU ${barLabel[i]}`
        allData.push({
            label: newlabel,
            value: barValue[i]
        })
    }

    allData.sort((a, b) => a.value - b.value);

    sortedLabels = allData.map(e => e.label);
    sortedValues = allData.map(e => e.value);

    let horBar = {
        x: sortedValues,
        y: sortedLabels,
        type: "bar",
        orientation: "h"
    };

    Plotly.newPlot("bar",[horBar]);

    colorScale = d3.scaleThreshold()
        .domain([500, 1000, 2000])
        .range(["blue", "green", "brown", "orange"]);

    let bubble = {
        x: label,
        y: value,
        mode: 'markers',
        marker: {
            size: value,
            color: colorScale(label.length )
        }
    };

    Plotly.newPlot("bubble",[bubble]);

}
