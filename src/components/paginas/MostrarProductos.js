import { render } from '@testing-library/react';
import React, {useState, Component} from 'react';
import backendUrl from '../../utils/backendUrl';
import {Link} from 'react-router-dom';
import Plato from '../ui/plato';


const [platos, guardarPlatos] = useState([]);
class MostrarProductos extends Component {
    constructor(){
        super();
    }


    componentDidMount() {
        fetch(backendUrl+'/products/get')
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
        });
    }

    render() {
        return ( 
            <>
                <h1 className="text-3xl font-light mb-4">Agregar Producto</h1>
                <Link to="/nuevoproducto" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase">
                    Agregar producto
                </Link>
    
                {platos.map( plato => (
                    <Plato 
                        key={plato.id}
                        plato={plato}
                    />
                ))}
            </>
         );
    }

}

export default MostrarProductos;