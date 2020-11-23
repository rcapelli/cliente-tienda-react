import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl text-center">Cliente Tienda Online</p>
                <p className="mt-3 text-gray-600 text-center">Administra tu tienda: </p>

                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/">Pedidos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/productos">Productos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" exact="true" to="/categorias">Categorías</NavLink>
                </nav>
            </div>
        </div>
    );
}
 
export default Sidebar;