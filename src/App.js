import React from 'react';
import { Routes, Route } from 'react-router';

import firebase, { FirebaseContext }  from './firebase'
import Ordenes from './components/paginas/Ordenes.js'
import Menu from './components/paginas/Menu.js'
import Sidebar from './components/ui/sidebar.js'
import NuevoProducto from './components/paginas/NuevoProducto.js';
import NuevaCategoria from './components/paginas/NuevaCategoria';
import Productos from './components/paginas/Productos';
import Categorias from './components/paginas/Categorias';


function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }} 
    >
      <div className="md:flex min-h-screen">
      <Sidebar />
      <div className="md:w-3/5 xl:w-4/5 p-6">
        <Routes>
          <Route path="/" element={<Ordenes />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/nuevoproducto" element={<NuevoProducto />} />
          <Route path="/nuevacategoria" element={<NuevaCategoria />} />
        </Routes>
      </div>
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
