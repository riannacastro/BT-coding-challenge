import React, { useState } from 'react'

import '../css/InputForm.css'
import DataTable from './DataTable';
import SortedData from './SortedData';

export default function InputForm() {
  const [addresses, setAddresses] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [addressType, setAddressType] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddresses = (e) => {
    const rawAddresses = e.target.value;
    const array = rawAddresses.split(/\r?\n/);
    setAddresses(array);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    fetch('https://bt-coding-challenge.herokuapp.com/api', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ addresses, apiKey, addressType })
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error('Sorry, something went wrong.')
      }
      return res.json();
    })
    .then((data) => {
      if (data.statusCode >= 400) {
        setLoading(false)
        setError(true)
      } else {
        setData(data.body)
      }
    })
    .catch(err => {
      console.log(err)
    });
  };

  const startLoading = (
    <h1> LOADING... </h1>
  );

  return (
    <div className='formBox'>
     { loading ? startLoading : 
      <form method='POST' action='https://bt-coding-challenge.herokuapp.com/api' onSubmit={handleSubmit}>
        {error && <h3>An error has occured.</h3>}
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
      </form>}
      <div className='dataResults'>
        {data && <DataTable data={data} />}
        {data && <SortedData data={data} setLoading={setLoading} />}
      </div>
    </div>
  )
}
