import React from 'react';
import * as d3 from "d3";

const PopulationData = [
    {
        'year': 2009,
        'population': 1107192
    },
    {
        'year': 2010,
        'population': 1123699
    },
    {
        'year': 2011,
        'population': 1141585
    },
    {
        'year': 2012,
        'population': 1120225
    },
    {
        'year': 2013,
        'population': 1149552
    },
    {
        'year': 2014,
        'population': 1242290
    },
    {
        'year': 2015,
        'population': 1261596
    },
    {
        'year': 2016,
        'population': 1278982
    },
    {
        'year': 2017,
        'population': 1292133
    },
    {
        'year': 2018,
        'population': 1311833
    },
];
class Population extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        // set the dimensions and margins of the graph
        var margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 320 - margin.top - margin.bottom;
        //Set variable
        const padding = 20;
        const formatComma = d3.format(",")
        // const xScale = d3.scaleBand()
        //   .range([0, 730])
        // .domain(PopulationData.map((s) => s.year))
        //.padding(0.1);    

        //const ydomain = d3.extent(PopulationData, function (d) { return d.population });
        //const yScale = d3.scaleLinear()
        //  .domain(ydomain).nice()
        //.range(0, height);

        //Set svg
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.style("margin-left", "300");
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Draw axis
        //XAxis
        var x = d3.scaleBand()
            .range([0, width])
            .domain(PopulationData.map(function (d) { return d.year; }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)")
            .style("text-anchor", "middle");

        //YAxis       
        var y = d3.scaleLinear()
            .domain([0, 1500000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Draw bar chart
        svg.selectAll("mybar")
            .data(PopulationData)
            .enter()
            .append("rect")
            // .attr("x", (d, i) => 30 + i * 70)
            //.attr("y", (d, i) => 300 - d.population / 5000)
            .attr("x", function (d) { return x(d.year); })
            .attr("y", function (d) { return y(d.population); })
            // .attr("width", 35)
            // .attr("height", (d, i) => d.population / 5000)
            .attr("width", x.bandwidth()/6*5)
            .attr("height", function (d) { return height - y(d.population); })
            .attr("fill", "green")
            //tooltip
            .append('title')
            .text(function (d) { return 'Population : ' + formatComma(d.population); })
        //Add title
        svg.append("text")
            .attr("x", 200)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            //.attr("font-weight",'bold')          
            .text("Historical Total Population");







    }
    render() {
        return (
            <div id="my_dataviz"></div>
        )
    }
};
export default Population;