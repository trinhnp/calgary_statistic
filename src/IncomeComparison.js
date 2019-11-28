import React from 'react';
import * as d3 from "d3";

const IncomeCitiesData = [{
    "name": "Calgary",
    "show": true,
    "color": "green",
    "currentIncome": 102060,
    "height": 102060,
    "history": [
        {
            "year": 2005,
            "income": 74700
        },
        {
            "year": 2006,
            "income": 82600
        },
        {
            "year": 2007,
            "income": 87120
        },
        {
            "year": 2008,
            "income": 90630
        },
        {
            "year": 2009,
            "income": 87470
        },
        {
            "year": 2010,
            "income": 88400
        },
        {
            "year": 2011,
            "income": 92160
        },
        {
            "year": 2012,
            "income": 96990
        },
        {
            "year": 2013,
            "income": 99850
        },
        {
            "year": 2014,
            "income": 102890
        },
        {
            "year": 2015,
            "income": 102700
        },
        {
            "year": 2016,
            "income": 98620
        },
        {
            "year": 2017,
            "income": 100320
        },
    ]
},
{
    "name": "Edmonton",
    "show": true,
    "color": "blue",
    "currentIncome": 93600,
    "height": 93000,
    "history": [
        {
            "year": 2005,
            "income": 66400
        },
        {
            "year": 2006,
            "income": 72800
        },
        {
            "year": 2007,
            "income": 76720
        },
        {
            "year": 2008,
            "income": 81230
        },
        {
            "year": 2009,
            "income": 79190
        },
        {
            "year": 2010,
            "income": 80590
        },
        {
            "year": 2011,
            "income": 84140
        },
        {
            "year": 2012,
            "income": 88010
        },
        {
            "year": 2013,
            "income": 90300
        },
        {
            "year": 2014,
            "income": 92930
        },
        {
            "year": 2015,
            "income": 93640
        },
        {
            "year": 2016,
            "income": 91160
        },
        {
            "year": 2017,
            "income": 93600
        },
    ]
},
{
    "name": "Canada",
    "show": true,
    "color": "red",
    "currentIncome": 84950,
    "height": 85000,
    "history": [
        {
            "year": 2005,
            "income": 60600
        },
        {
            "year": 2006,
            "income": 63600
        },
        {
            "year": 2007,
            "income": 66550
        },
        {
            "year": 2008,
            "income": 68860
        },
        {
            "year": 2009,
            "income": 68410
        },
        {
            "year": 2010,
            "income": 69860
        },        
        {
            "year": 2011,
            "income":72240
        },
        {
            "year": 2012,
            "income": 74540
        },
        {
            "year": 2013,
            "income": 76550
        },
        {
            "year": 2014,
            "income": 78870
        },
        {
            "year": 2015,
            "income": 80940
        },
        {
            "year": 2016,
            "income": 82110
        },
        {
            "year": 2017,
            "income": 84950
        },
    ]
},

];
class IncomeComparison extends React.Component {
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

        // Define the scales and tell D3 how to draw the line        
        const line = d3.line().x(d => x(d.year)).y(d => y(d.income));
        const formatComma = d3.format(",")
        //const chart = d3.select('svg').append('g')
         //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const tooltip = d3.select('#tooltip');
        const tooltipLine = svg.append('line');

        // Add the axes and a title
        //const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
        //const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
       // chart.append('g').call(yAxis);
        //chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
        
         //Add title
         svg.append("text")
         .attr("x", 200)
         .attr("y", 15)
         .attr("text-anchor", "begin")
         .style("font-size", "20px")
         //.attr("font-weight",'bold')          
         .text("Historical Median Household Income in Different Cities");

         // Draw axis
        //XAxis
        var x = d3.scaleLinear()
        .domain([2005, 2017])
        .range([0, width-50]);
         svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
         //YAxis       
         var y = d3.scaleLinear()
        .domain([50000, 120000])
         .range([height, 20]);
         svg.append("g")
            .call(d3.axisLeft(y));
        //Draw the lines
        svg.selectAll()
                .data(IncomeCitiesData).enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', d => d.color)
                .attr('stroke-width', 2)
                .datum(d => d.history)
                .attr("d", d3.line()
                .x(function (d) { return x(d.year) })
                .y(function (d) { return y(d.income) })
            )
            //Label the lines
            svg.selectAll()
                .data(IncomeCitiesData).enter()
                .append('text')
                .html(d => d.name)
                .attr('fill', d => d.color)
                .attr('alignment-baseline', 'middle')
                .attr('x', width)
                .attr('dx', '-3em')
                .attr('y', d => y(d.height));

                var tipBox = svg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('opacity', 0)
                .on('mousemove', drawTooltip)
                .on('mouseout', removeTooltip);
        

        function removeTooltip() {
            if (tooltip) tooltip.style('display', 'none');
            if (tooltipLine) tooltipLine.attr('stroke', 'none');
        }

        function drawTooltip() {
            const year = Math.floor(x.invert(d3.mouse(this)[0]));
           
            tooltipLine.attr('stroke', 'grey')
                .attr('x1', x(year))
                .attr('x2', x(year))
                .attr('y1', 0)
                .attr('y2', height);

            tooltip.html(year)
                .style('display', 'block')
                .style('left', d3.event.pageX + 20 + "px")
                .style('top', d3.event.pageY - 20 + "px")
                .selectAll()
                .data(IncomeCitiesData).enter()
                .append('div')
                .style('color', d => d.color)
                .html(d => d.name + ': $' + formatComma(d.history.find(h => h.year === year).income));
        }
    }
            render() {
                return (
                    <div>
                     <div id='tooltip' style={{position:'absolute',backgroundColor:'lightgray',padding:'5px'}}></div>
                    <div id="income_data"></div>
                   
                    </div>
                )
            }
        };
        export default IncomeComparison;