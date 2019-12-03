import React from 'react';
import * as d3 from "d3";

const AgeGroupPopulationData = [
    {
        "Children": 18.32,
        "Youth": 11.97,
        "Adult": 58.54,
        "Senior": 11.17
    },
    {
        "year": 2011,
        "children": 17.91,
        "youth": 13.14,
        "adult": 59.00,
        "senior": 9.95
    },
    {
        "year": 2006,
        "children": 18.45,
        "youth": 14.39,
        "adult": 57.79,
        "senior": 9.38
    }

];
class AgeGroupPopulation extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {

        // set the dimensions and margins of the graph
        var width = 450
        var height = 450
        var margin = 40
        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin
        //Set svg
        const svg = d3.select("#age_group_data")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(AgeGroupPopulationData)
            .range(d3.schemeSet2);
        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function (d) { return d.value; })
        var data_ready = pie(d3.entries(AgeGroupPopulationData[0]))
        // shape helper to build arcs:
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
        //Add title
        svg.append("text")
            .attr("x", -100)
            .attr("y", -200)
            .attr("text-anchor", "begin")
            .style("font-size", "20px")
            //.attr("font-weight",'bold')          
            .text("Age structure in Calgary in 2016");
        //Add anotation
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) { return d.data.key })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    }
    render() {
        return (
            <div>
                <div id='tooltip' style={{ position: 'absolute', backgroundColor: 'lightgray', padding: '5px' }}></div>
                <div id="age_group_data"></div>

            </div>
        )
    }
};
export default AgeGroupPopulation;