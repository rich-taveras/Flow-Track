import React from 'react';
import './App.css'; // Asegúrate de que tienes el archivo de estilos si lo necesitas
import OptionFlowTable from './OptionFlowTable'; // Importa el componente OptionFlowTable

const App = () => {
  return (
    <div className="App">
      <h1>Opciones de acciones</h1>
      {/* Renderiza el componente OptionFlowTable */}
      <OptionFlowTable />
    </div>
  );
}

export default App;
