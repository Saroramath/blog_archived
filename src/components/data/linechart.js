import React, { useEffect } from 'react';
import * as d3 from 'd3';


function LineChart(props) {
  const { data, width, height } = props;

  useEffect(() => {
    drawChart();
  }, [data]);
  
  function drawChart() {
    // Add logic to draw the chart hereconst margin = { top: 50, right: 50, bottom: 50, left: 50 };
const yMinValue = d3.min(data, d => d.value);
const yMaxValue = d3.max(data, d => d.value);
const xMinValue = d3.min(data, d => d.label);
const xMaxValue = d3.max(data, d => d.label);


  }
  return <div />;
}

export default LineChart;