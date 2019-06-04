
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

function xScale(healthdata) {
    // create scales
    var LinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d[chosenXAxis]) * 0.8,
        d3.max(healthdata, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return LinearScale;
} // end xScale

function yScale(healthdata) {
    // create scales
    var LinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d[chosenYAxis]) * 0.8,
        d3.max(healthdata, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);
  
    return LinearScale;
} // end yScale

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale); 
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis); 
    return xAxis;
}
  
// function used for updating circles group with a transition to
// new circles
function renderXCircles(circlesGroup, statelabels, newXScale ) {
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
    statelabels.transition()
       .duration(1000)
       .attr("dx", d => newXScale(d[chosenXAxis]))
    return circlesGroup;
}

function xclick (element,  healthdata, xAxis, agelabel, povertylabel, incomelabel, circlesGroup, statelabels){
    var value = d3.select(element).attr("value");
    console.log("X axis has been clicked to : ", value);
    if (value !== chosenXAxis){
        chosenXAxis = value;
        xLinearScale = xScale(healthdata);
        xAxis = renderXAxes(xLinearScale, xAxis);
        circlesGroup = renderXCircles(circlesGroup, statelabels, xLinearScale);
        switch(chosenXAxis){
            case "poverty":
                povertylabel.classed("active", true).classed("inactive", false);
                agelabel.classed("active", false).classed("inactive",true);
                incomelabel.classed("active", false).classed("inactive", true);
                break;
            case "age":
                povertylabel.classed("active", false).classed("inactive", true);
                agelabel.classed("active", true).classed("inactive",false);
                incomelabel.classed("active", false).classed("inactive", true);
                break;
            case "income":
                povertylabel.classed("active", false).classed("inactive", true);
                agelabel.classed("active", false).classed("inactive",true);
                incomelabel.classed("active", true).classed("inactive", false);
                break;     
            default:
                console.log("Not able to switch x-axis for ", chosenXAxis)
        }
    }
} // end xclick
// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale); 
    yAxis.transition()
      .duration(1000)
      .call(leftAxis); 
    return yAxis;
}
  
// function used for updating circles group with a transition to
// new circles
function renderYCircles(circlesGroup, statelabels,  newYScale) {
    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
    statelabels.transition()
      .duration(1000)
      .attr("dy", d => newYScale(d[chosenYAxis])+5)
    return circlesGroup;
}
function yclick(element,  healthdata, yAxis, healthlabel, smokelabel, obeselabel, circlesGroup, statelabels) {
    var value = d3.select(element).attr("value");
    console.log("Y axis has been clicked to : ", value)
    if (value !== chosenYAxis){
        chosenYAxis = value;
        yLinearScale = yScale(healthdata);
        yAxis = renderYAxes(yLinearScale, yAxis);
        circlesGroup = renderYCircles(circlesGroup, statelabels, yLinearScale);
        switch(chosenYAxis){
            case "healthcare":
                healthlabel.classed("active", true).classed("inactive", false);
                smokelabel.classed("active", false).classed("inactive",true);
                obeselabel.classed("active", false).classed("inactive", true);
                break;
            case "smokes":
                healthlabel.classed("active", false).classed("inactive", true);
                smokelabel.classed("active", true).classed("inactive",false);
                obeselabel.classed("active", false).classed("inactive", true);
                break;
            case "obesity":
                healthlabel.classed("active", false).classed("inactive", true);
                smokelabel.classed("active", false).classed("inactive",true);
                obeselabel.classed("active", true).classed("inactive", false);
                break;
            default:
                console.log("Not able to switch y-axis for ", chosenYAxis)
        }
    }
} // end yclick

function draw_scatter(healthdata){
   // Create axes
   var xLinearScale = xScale(healthdata, chosenXAxis);
   var yLinearScale = yScale(healthdata, chosenYAxis);
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);
   // append  axis
   var xAxis = chartGroup.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(bottomAxis);
   var yAxis = chartGroup.append("g")
       .call(leftAxis);

   // Create group for  3 x- axis labels
   var xlabelsGroup = chartGroup.append("g")
   .attr("transform", `translate(${width / 2}, ${height + 20})`);

   var povertylabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 20)
   .attr("value", "poverty") // value to grab for event listener
   .classed("active", true)
   .text("In Poverty %");

   var agelabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 40)
   .attr("value", "age") // value to grab for event listener
   .classed("inactive", true)
   .text("Age (Median)");

   var incomelabel = xlabelsGroup.append("text")
   .attr("x",0)
   .attr("y",60)
   .attr("value","income")
   .classed("inactive", true)
   .text("Household Income (Median)")

   // Create group for  3 Y- axis labels
   var ylabelsGroup = chartGroup.append("g")
   .attr("transform", "rotate(-90)");

   var healthlabel = ylabelsGroup.append("text")
   .attr("y", 0 - margin.left+60)
   .attr("x", 0 - (height / 2))
   .attr("value", "healthcare") // value to grab for event listener
   .classed("active", true)
   .text("Lacks Healthcare(%)");

   var smokelabel = ylabelsGroup.append("text")
   .attr("y", 0 - margin.left+40)
   .attr("x", 0 - (height / 2))
   .attr("value", "smokes") // value to grab for event listener
   .classed("inactive", true)
   .text("Smokes(%)");

    var obeselabel = ylabelsGroup.append("text")
    .attr("y", 0-margin.left+20)
    .attr("x", 0- (height/2))
    .attr("value","obesity")
    .classed("inactive", true)
    .text("Obese(%)")

    var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .html(function(d) { 
        return d["state"] + "<br>" + chosenXAxis + ":" + d[chosenXAxis] + "<br>" + chosenYAxis + ":" + d[chosenYAxis]; 
    });
    svg.call(tool_tip);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5")
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);

    var statelabels = chartGroup.append("g").selectAll("text")
    .data(healthdata)
    .enter()
    .append("text")
    .text(function (d) {
        return d.abbr;
    })
    .attr("dx", d => xLinearScale(d[chosenXAxis]))
    .attr("dy", d => yLinearScale(d[chosenYAxis])+5)
    .attr("class","stateText");

    // Enable transition on x axis
   xlabelsGroup.selectAll("text")
   .on("click", function () {
       xclick(this, healthdata, xAxis, agelabel, povertylabel, incomelabel,  circlesGroup, statelabels);
    });
   ylabelsGroup.selectAll("text")
   .on("click", function () {
       yclick(this, healthdata, yAxis, healthlabel, smokelabel, obeselabel, circlesGroup, statelabels);
   });

} // end draw_scatter
function successfunction(healthdata){
    healthdata.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.age = +data.age;
    });
    console.log("data.state, data.abbr, data.healthcare, data.poverty, data.smokes, data.age");
    healthdata.forEach(function(data) {
        console.log(data.state, data.abbr, data.healthcare, data.poverty, data.smokes, data.age)
    });

    draw_scatter(healthdata);
 
} // end successfunction

function errorfunction(error){
    console.error("Cannot read csv : ", error);
}

d3.csv("assets/data/data.csv").then(successfunction, errorfunction);