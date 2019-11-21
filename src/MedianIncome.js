import React from 'react';
import * as d3 from "d3";

const IncomeData = [
    {
        'year': 2000,
        'income': 60400
    },
    {
        'year': 2001,
        'income': 64700
    },
    {
        'year': 2002,
        'income': 66200
    },
    {
        'year': 2003,
        'income': 67200
    },
    {
        'year': 2004,
        'income': 70500
    },
    {
        'year': 2005,
        'income': 74700
    },
    {
        'year': 2006,
        'income': 82600
    },
    {
        'year': 2007,
        'income': 87120
    },
    {
        'year': 2008,
        'income': 90630
    },
    {
        'year': 2009,
        'income': 87470
    },
    {
        'year': 2010,
        'income': 88400
    },
    {
        'year': 2011,
        'income': 92160
    },
    {
        'year': 2012,
        'income': 96990
    },
    {
        'year': 2013,
        'income': 99850
    },
    {
        'year': 2014,
        'income': 102890
    },
    {
        'year': 2015,
        'income': 102700
    },
    {
        'year': 2016,
        'income': 98620
    },
    {
        'year': 2017,
        'income': 100320
    },
];
class MedianIncome extends React.Component {
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
        const svg = d3.select("#income_data")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.style("margin-left", "300");
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Draw axis

        //XAxis
        var x = d3.scalePoint()
            .domain(['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'])  
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        //YAxis       
        var y = d3.scaleLinear()
            .domain([0, 110000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Draw the line
        svg.append("path")
            .datum(IncomeData)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.year) })
                .y(function (d) { return y(d.income) })
            )
        

        // Draw the points
        svg.append("g")
            .selectAll("dot")
            .data(IncomeData)
            .attr("id", "dotIncome")
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.year) })
            .attr("cy", function (d) { return y(d.income) })
            .attr("r", 5)
            .attr("fill", "green")
            //tooltip
            .append('title')
            .attr("data-html", "true")
            .html(function (d) { return 'Median Income ('+d.year + '): $' + formatComma(d.income) ;})
            

        //Add title
        svg.append("text")
            .attr("x", 200)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            //.attr("font-weight",'bold')          
            .text("Historical Median Household Income");

    }
    render() {
        return (
            <div id="income_data"></div>
        )
    }
};
export default MedianIncome;