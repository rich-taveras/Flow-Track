import React, { useState, useEffect } from 'react';

const OptionFlowTable = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState('SPY'); // Estado para el ticker
  const [search, setSearch] = useState(''); // Estado para el input de búsqueda

  const API_KEY = '8yz8VWhwVib720bkCz_oNLAoIrcmcREj';

  // Función para hacer la consulta de los datos
  const fetchOptionsData = async () => {
    if (!ticker) return; // Evitar hacer la consulta si no hay un ticker
    setLoading(true);
    try {
      const response = await fetch(`https://api.polygon.io/v3/reference/options/contracts?ticker=${ticker}&contract_type=put&limit=10&apiKey=${API_KEY}`);
      const data = await response.json();
      console.log('Datos de opciones:', data); // Verifica la estructura de los datos
      setOptionsData(data.results || []); // Asegura que se tome 'results' si está presente
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos de opciones:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionsData();
  }, [ticker]); // Re-efectuar cada vez que el ticker cambie

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setTicker(search.toUpperCase()); // Cambia el ticker basado en la búsqueda
  };

  return (
    <div className="option-flow-table">
      <h2>Options Contracts {ticker}</h2>

      {/* Formulario para buscar el ticker */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Ingrese un ticker"
        />
        <button type="submit">Submit</button>
      </form>

      {loading ? (
        <p>Loading option data...</p>) :
         (
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
            {optionsData.length > 0 ? (
              optionsData.map((option, index) => (
                <tr key={index}>
                  <td>{option.symbol}</td>
                  <td>{option.strike_price}</td>
                  <td>{option.expiration_date}</td>
                  <td>{option.volume}</td>
                  <td>{option.open_interest}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OptionFlowTable;
