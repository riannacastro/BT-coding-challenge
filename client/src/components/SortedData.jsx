import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DataChart from './DataChart';

export default function SortedData({data}) {
  const [sortedData, setSortedData] = useState([]);
  const [cat, setCat] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const sorted = data.sort((a, b) => {
      if (a.summary[0].total_sent > b.summary[0].total_sent) {
        return -1;
      }
      if (a.summary[0].total_sent > b.summary[0].total_sent) {
        return 1;
      }
      return 0;
    }).slice(0, 5)
    setSortedData(sorted)
  }, [data])

  useEffect(() => {
    sortedData.forEach((x) => {
      setCat((prevAddress) => [...prevAddress, x.address])
      setSeries((prev) => [...prev, x.summary[0].total_sent])
    })
  }, [sortedData])

  return (
    <div>
      { cat && <DataChart cat={cat} series={series} /> }
    </div>
  )
}
