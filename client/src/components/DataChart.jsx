import React from 'react'
import Chart from 'react-apexcharts';

import '../css/DataChart.css';

export default function DataChart({ chart }) {
  
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
            { chart.options.xaxis.categories === [] ? 
              <p>Loading Chart...</p> : 
              <Chart
                options={chart.options}
                series={chart.series}
                type="bar"
                width="800" 
              /> 
            }
        </div>
      </div>
    </div>
  )
}
