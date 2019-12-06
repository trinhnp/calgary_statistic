import React from 'react';
import * as d3 from "d3";

const UnemploymentIncomeData = [
    {
        'year': 2001,
        'unemployment': 4.7,
        'income': 64700
    },
    {
        'year': 2002,
        'unemployment': 5.73,
        'income': 66200
    },
    {
        'year': 2003,
        'unemployment': 5.35,
        'income': 67200
    },
    {
        'year': 2004,
        'unemployment': 5.02,
        'income': 70500
    },
    {
        'year': 2005,
        'unemployment': 3.92,
        'income': 74700
    },
    {
        'year': 2006,
        'unemployment': 3.42,
        'income': 82600
    },
    {
        'year': 2007,
        'unemployment': 3.36,
        'income': 87120
    },
    {
        'year': 2008,
        'unemployment': 3.34,
        'income': 90630
    },
    {
        'year': 2009,
        'unemployment': 6.46,
        'income': 87470
    },
    {
        'year': 2010,
        'unemployment': 6.91,
        'income': 88400
    },
    {
        'year': 2011,
        'unemployment': 5.9,
        'income': 92160
    },
    {
        'year': 2012,
        'unemployment': 4.92,
        'income': 96990
    },
    {
        'year': 2013,
        'unemployment': 4.85,
        'income': 99850
    },
    {
        'year': 2014,
        'unemployment': 5.03,
        'income': 102890
    },
    {
        'year': 2015,
        'unemployment': 6.16,
        'income': 102700
    },
    {
        'year': 2016,
        'unemployment': 9.11,
        'income': 98620
    },
    {
        'year': 2017,
        'unemployment': 8.71,
        'income': 100320
    }
];
const TrendLine = [
    {
        'x': 65000,
        'y': 4.3839
    },
    {
        'x': 105000,
        'y': 5.9839
    },
];
class UnemploymentVsIncome extends React.Component {
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
        const svg = d3.select("#unemployment_income_data")
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
            .domain([60000, 110000])
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
            .data(UnemploymentIncomeData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.income); })
            .attr("cy", function (d) { return y(d.unemployment); })
            .attr("r", 7)
            .style("fill", "blue")
            .style("opacity", 0.7)
            .style("stroke", "white")
            //tooltip
            .append('title')
            .attr("data-html", "true")
            .html(function (d) { return "Unemployment rate : " + d.unemployment + ", Median Income: $" + formatComma(d.income) + " (" + d.year + ")"; })
        //Add trendline
        svg.append("path")
            .datum(TrendLine)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .style("stroke-dasharray", ("3, 3"))
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.x) })
                .y(function (d) { return y(d.y) })
            )
        //Add equation
        svg.append("text")
            .attr("x", 670)
            .attr("y", 85)
            .attr("text-anchor", "middle")
            .style("font-size", "10px")
            //.attr("font-weight",'bold')          
            .text("eq: y = 4E-05x+1.7839");
        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Median Income");
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
            .text("Relationship between Unemployment rate and Median Income");
        svg.append("text")
            .attr("x", 200)
            .attr("y", 40)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-style", "italic")
            //.attr("font-weight",'bold')          
            .text("Correlation coefficient: 0.48");

    }
    render() {
        return (
            <div id="unemployment_income_data"></div>
        )
    }
};
export default UnemploymentVsIncome;