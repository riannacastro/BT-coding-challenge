import React from 'react';

import '../css/DataTable.css';

export default function DataTable({data}) {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Address Name</th>
            <th>Address Type</th>
            <th>Balance</th>
            <th>Total Sent</th>
            <th>Total Received</th>
            <th>Risk Score</th>
          </tr>
        </thead>
        {data.map((val, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>{val.address}</td>
                <td>{val.summary[1].name}</td>
                <td>{val.asset}</td>
                <td>{val.summary[1].current_balance}</td>
                <td>{val.summary[1].total_sent}</td>
                <td>{val.summary[1].total_received}</td>
                <td>{val.summary[1].score}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
  </div>
  )
}
