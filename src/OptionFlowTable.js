import React, { useState, useEffect } from 'react';

const OptionFlowTable = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Agregar un estado de error

  const SYMBOL = 'aapl';
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchOptionsData = async () => {
    try {
      const response = await fetch("https://api.polygon.io/v3/reference/options/contracts?ticker=spy&limit=10&apiKey=8yz8VWhwVib720bkCz_oNLAoIrcmcREj");
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setOptionsData(data.results);
      } else {
        setError('No data available for this contract or symbol.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos de opciones:', error);
      setError('Failed to fetch data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionsData();
    const interval = setInterval(fetchOptionsData, 60000);
    return () => clearInterval(interval);
  }, [API_KEY]);

  return (
    <div className="option-flow-table">
      <h2>Option Contracts {SYMBOL}</h2>
      {loading ? (
        <p>Loading option data...</p>
      ) : error ? (
        <p>{error}</p>  // Mostrar mensaje de error si no hay datos
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Strike Price</th>
              <th>Expiration</th>
              <th>Volume</th>
              <th>Open Interest</th>
            </tr>
          </thead>
          <tbody>
            {optionsData.map((option, index) => (
              <tr key={index}>
                <td>{option.ticker}</td>
                <td>{option.strike_price}</td>
                <td>{option.expiration_date}</td>
                <td>{option.volume}</td>
                <td>{option.open_interest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OptionFlowTable;
