import React, { useState } from 'react'
import '../css/InputForm.css'
import DataTable from './DataTable';
import SortedData from './SortedData';

export default function InputForm() {
  const [addresses, setAddresses] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [addressType, setAddressType] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const handleAddresses = (e) => {
    const rawAddresses = e.target.value;

    const array = rawAddresses.split(/\r?\n/);
    setAddresses(array);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ addresses, apiKey, addressType })
    })
    .then((res) => res.json())
    .then((data) => setData(data.body))
    .catch(err => {
      console.log(err)
    });
  };

  return (
    <div className='formBox'>
      <form method='POST' action='http://localhost:3001/api' onSubmit={handleSubmit}>
        {error && <div>An error has occured.</div>}
        <label>
          Addresses:
          <textarea
            className='input'
            type='text' 
            name='addresses'
            value={addresses}
            onChange={handleAddresses}
          ></textarea>
        </label>
        <label>
          API Key:
          <input 
            type='text' 
            name='apiKey'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <label>
          Crypto Address Type:
          <input 
            type='text' 
            name='addressType'
            value={addressType} 
            onChange={(e) => setAddressType(e.target.value)}
          />
        </label>
        <button className='submitBtn' type='submit'>Submit</button>
      </form>
      <div className='dataResults'>
        {data && <DataTable data={data} />}
        {data && <SortedData data={data} />}
      </div>
    </div>
  )
}
