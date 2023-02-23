import React from 'react'
import { useState } from 'react'
import Chart from 'react-apexcharts';
import '../css/DataChart.css';

export default function DataChart({cat, series}) {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          barHeight: '80%'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: cat
      }
    },
    series: [
      {
        name: "Total Sent",
        data: series
      }
    ]
  })
  
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="800"
          />
        </div>
      </div>
    </div>
  )
}
