import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

import DataChart from './DataChart';

export default function SortedData({data, setLoading}) {
  const [sortedData, setSortedData] = useState([]);
  const [cat, setCat] = useState([]);
  const [range, setRange] = useState([]);
  const [chartVisible, setChartVisible] = useState(false);
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: cat,
        labels: {
          show: true,
          rotate: -55,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          maxHeight: 220,
        }
      }
    },
    series: [
      {
        name: "Total Sent",
        data: range
      }
    ]
  });

  useEffect(() => {
    setLoading(false)
    const sorted = [...data].sort((a, b) => {
      if (a.summary[0].total_sent > b.summary[0].total_sent) {
        return -1;
      }
      if (a.summary[0].total_sent > b.summary[0].total_sent) {
        return 1;
      }
      return 0;
    }).slice(0, 5)

    setSortedData(sorted);
  }, []);
  
  useEffect(() => {
    sortedData.forEach((x) => {
      setCat(cat => [...cat, x.address])
      setRange(range => [...range, x.summary[0].total_sent])
    })
  }, [sortedData]);

  useEffect(() => {
    setChart(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: cat
        }
      },
      series: [
        {
          name: "Total Sent",
          data: range
        }
      ]
    }));
    setChartVisible(true)
  }, [cat]);
  
  return (
    <div>
      { chartVisible && <DataChart chart={chart} /> }
    </div>
  )
}
