import React, { useState, useEffect } from 'react';
import './App.css'; // Asegúrate de que tienes el archivo de estilos si lo necesitas
import OptionFlowTable from './OptionFlowTable'; // Importa el componente OptionFlowTable

const App = () => {
  const [indicesData, setIndicesData] = useState({});
  const [loadingIndices, setLoadingIndices] = useState(true);

  const API_KEY = '8yz8VWhwVib720bkCz_oNLAoIrcmcREj';

  useEffect(() => {
    const fetchIndicesData = async () => {
      try {
        const responseSPX = await fetch(`https://api.polygon.io/v2/aggs/ticker/SPX/prev?apiKey=${API_KEY}`);
        const responseIXIC = await fetch(`https://api.polygon.io/v2/aggs/ticker/IXIC/prev?apiKey=${API_KEY}`);
        const responseDJI = await fetch(`https://api.polygon.io/v2/aggs/ticker/DJI/prev?apiKey=${API_KEY}`);
        
        const dataSPX = await responseSPX.json();
        const dataIXIC = await responseIXIC.json();
        const dataDJI = await responseDJI.json();

        setIndicesData({
          SPX: dataSPX.results ? dataSPX.results[0] : {},
          IXIC: dataIXIC.results ? dataIXIC.results[0] : {},
          DJI: dataDJI.results ? dataDJI.results[0] : {},
        });
        setLoadingIndices(false);
      } catch (error) {
        console.error('Error fetching indices data:', error);
        setLoadingIndices(false);
      }
    };

    fetchIndicesData();
  }, []);

  return (
    <div className="App">
      <h1>Flow Track</h1>

      {/* Mostrar los datos de los índices */}
      {loadingIndices ? (
        <p>Loading index data...</p>
      ) : (
        <div className="indices">
          <h2>Market Indices</h2>
          <div className="indices-container">
            <div className="index">
              <h3>S&P 500 (SPX)</h3>
              <p>Price: ${indicesData.SPX.c}</p>
              <p>Change: {indicesData.SPX.c - indicesData.SPX.o} ({(((indicesData.SPX.c - indicesData.SPX.o) / indicesData.SPX.o) * 100).toFixed(2)}%)</p>
            </div>
            <div className="index">
              <h3>Nasdaq (IXIC)</h3>
              <p>Price: ${indicesData.IXIC.c}</p>
              <p>Change: {indicesData.IXIC.c - indicesData.IXIC.o} ({(((indicesData.IXIC.c - indicesData.IXIC.o) / indicesData.IXIC.o) * 100).toFixed(2)}%)</p>
            </div>
            <div className="index">
              <h3>Dow Jones (DJI)</h3>
              <p>Price: ${indicesData.DJI.c}</p>
              <p>Change: {indicesData.DJI.c - indicesData.DJI.o} ({(((indicesData.DJI.c - indicesData.DJI.o) / indicesData.DJI.o) * 100).toFixed(2)}%)</p>
            </div>
          </div>
        </div>
      )}

      {/* Renderiza el componente OptionFlowTable */}
      <OptionFlowTable />
      <div className="announcement">
        <p>🚨 Special Offer! Get 10% off your first options subscription. <strong>Sign up today!</strong></p>
      </div>
    </div>
  );
}

export default App;
