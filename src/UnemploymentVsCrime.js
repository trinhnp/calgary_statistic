import React from 'react';
import * as d3 from "d3";

const UnemploymentCrimeData = [
    {
        'year': 2001,
        'unemployment': 4.7,
        'crime': 69037
    },
    {
        'year': 2002,
        'unemployment': 5.73,
        'crime': 69850
    },
    {
        'year': 2003,
        'unemployment': 5.35,
        'crime': 71287
    },
    {
        'year': 2004,
        'unemployment': 5.02,
        'crime': 69667
    },
    {
        'year': 2005,
        'unemployment': 3.92,
        'crime': 69972
    },
    {
        'year': 2006,
        'unemployment': 3.42,
        'crime': 70961
    },
    {
        'year': 2007,
        'unemployment': 3.36,
        'crime': 67232
    },
    {
        'year': 2008,
        'unemployment': 3.34,
        'crime': 63787
    },
    {
        'year': 2009,
        'unemployment': 6.46,
        'crime': 61815
    },
    {
        'year': 2010,
        'unemployment': 6.91,
        'crime': 59636
    },
    {
        'year': 2011,
        'unemployment': 5.9,
        'crime': 55168
    },
    {
        'year': 2012,
        'unemployment': 4.92,
        'crime': 53461
    },
    {
        'year': 2013,
        'unemployment': 4.85,
        'crime': 53591
    },
    {
        'year': 2014,
        'unemployment': 5.03,
        'crime': 54572
    },
    {
        'year': 2015,
        'unemployment': 6.16,
        'crime': 68521
    },
    {
        'year': 2016,
        'unemployment': 9.11,
        'crime': 72505
    },
    {
        'year': 2017,
        'unemployment': 8.71,
        'crime': 75238
    }
];
class UnemploymentVsCrime extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {

        // set the dimensions and margins of the graph
        var margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 320 - margin.top - margin.bottom;
        //Set variable        
        const formatComma = d3.format(",")

        //Set svg
        const svg = d3.select("#unemployment_crime_data")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.style("margin-left", "300");
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Draw axis
        // Add X axis
        var x = d3.scaleLinear()
            .domain([50000, 80000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
      
        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(UnemploymentCrimeData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.crime); })
            .attr("cy", function (d) { return y(d.unemployment); })
            .attr("r", 7)
            .style("fill", "blue")
            .style("opacity", 0.7)
            .style("stroke", "white")
            //tooltip
            .append('title')
            .attr("data-html", "true")
            .html(function (d) { return "Unemployment rate : " + d.unemployment + ", Total recorded crime: " + d.crime +" ("+d.year+")";})
        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Total reported crimes");
        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Unemployment rate");

        //Add title
        svg.append("text")
            .attr("x", 350)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            //.attr("font-weight",'bold')          
            .text("Relationship between Unemployment rate and Crime");
        svg.append("text")
            .attr("x", 200)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-style", "italic")
            //.attr("font-weight",'bold')          
            .text("Correlation coefficient: 0.20");

    }
    render() {
        return (
            <div id="unemployment_crime_data"></div>
        )
    }
};
export default UnemploymentVsCrime;