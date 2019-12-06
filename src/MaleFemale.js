import React from 'react';
import * as d3 from "d3";

const DensityData = [{
    sex: 'Female',
    density: 433
},
{
    sex: 'Female',
    density: 440
},
{
    sex: 'Female',
    density: 447
},
{
    sex: 'Female',
    density: 585
},
{
    sex: 'Female',
    density: 661
},
{
    sex: 'Female',
    density: 680
},
{
    sex: 'Female',
    density: 754
},
{
    sex: 'Female',
    density: 826
},
{
    sex: 'Female',
    density: 959
},
{
    sex: 'Female',
    density: 996
},
{
    sex: 'Female',
    density: 1095
},
{
    sex: 'Female',
    density: 1264
},
{
    sex: 'Female',
    density: 1328
},
{
    sex: 'Female',
    density: 2002
},
{
    sex: 'Male',
    density: 438
},
{
    sex: 'Male',
    density: 440
},
{
    sex: 'Male',
    density: 462
},
{
    sex: 'Male',
    density: 584
},
{
    sex: 'Male',
    density: 682
},
{
    sex: 'Male',
    density: 724
},
{
    sex: 'Male',
    density: 738
},
{
    sex: 'Male',
    density: 815
},
{
    sex: 'Male',
    density: 947
},
{
    sex: 'Male',
    density: 970
},
{
    sex: 'Male',
    density: 1042
},
{
    sex: 'Male',
    density: 1315
},
{
    sex: 'Male',
    density: 1398
},
{
    sex: 'Male',
    density: 2122
}
]
class MaleFemale extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {

        // set the dimensions and margins of the graph
        var margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 320 - margin.top - margin.bottom;

        //Set svg
        const svg = d3.select("#income_data")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.style("margin-left", "300");
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function (d) { return d.sex; })
            .rollup(function (d) {
                var q1 = d3.quantile(d.map(function (g) { return g.density; }).sort(d3.ascending), .25)
                var median = d3.quantile(d.map(function (g) { return g.density; }).sort(d3.ascending), .5)
                var q3 = d3.quantile(d.map(function (g) { return g.density; }).sort(d3.ascending), .75)
                var interQuantileRange = q3 - q1
                var min = q1 - 1.5 * interQuantileRange
                var max = q3 + 1.5 * interQuantileRange
                return ({ q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max })
            })
            .entries(DensityData)

        // Show the X scale
        var x = d3.scaleBand()
            .range([0, width])
            .domain(["Male", "Female"])
            .paddingInner(1)
            .paddingOuter(.5)
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Show the Y scale
        var y = d3.scaleLinear()
            .domain([0, 2300])
            .range([height, 0])
        svg.append("g").call(d3.axisLeft(y))

        // Show the main vertical line
        svg
            .selectAll("vertLines")
            .data(sumstat)
            .enter()
            .append("line")
            .attr("x1", function (d) { return (x(d.key)) })
            .attr("x2", function (d) { return (x(d.key)) })
            .attr("y1", function (d) { return (y(d.value.min)) })
            .attr("y2", function (d) { return (y(d.value.max)) })
            .attr("stroke", "black")
            .style("width", 40)

        // rectangle for the main box
        var boxWidth = 100
        svg
            .selectAll("boxes")
            .data(sumstat)
            .enter()
            .append("rect")
            .attr("x", function (d) { return (x(d.key) - boxWidth / 2) })
            .attr("y", function (d) { return (y(d.value.q3)) })
            .attr("height", function (d) { return (y(d.value.q1) - y(d.value.q3)) })
            .attr("width", boxWidth)
            .attr("stroke", "black")
            .style("fill", "#69b3a2")

        // Show the median
        svg
            .selectAll("medianLines")
            .data(sumstat)
            .enter()
            .append("line")
            .attr("x1", function (d) { return (x(d.key) - boxWidth / 2) })
            .attr("x2", function (d) { return (x(d.key) + boxWidth / 2) })
            .attr("y1", function (d) { return (y(d.value.median)) })
            .attr("y2", function (d) { return (y(d.value.median)) })
            .attr("stroke", "black")
            .style("width", 80)
        // Add individual points with jitter
        var jitterWidth = 50
        svg
            .selectAll("indPoints")
            .data(DensityData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return (x(d.sex) - jitterWidth / 2 + Math.random() * jitterWidth) })
            .attr("cy", function (d) { return (y(d.density)) })
            .attr("r", 4)
            .style("fill", "white")
            .attr("stroke", "black")
        //Add title
        svg.append("text")
            .attr("x", 150)
            .attr("y", 0)
            .attr("text-anchor", "begin")
            .style("font-size", "20px")
            //.attr("font-weight",'bold')          
            .text("Boxplot of Male and Female Density in Calgary in 2016");
    }
    render() {
        return (
            <div>
                <div id='tooltip' style={{ position: 'absolute', backgroundColor: 'lightgray', padding: '5px' }}></div>
                <div id="income_data"></div>

            </div>
        )
    }
};
export default MaleFemale;