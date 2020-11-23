import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import backendUrl from '../../utils/backendUrl'
import Plato from '../ui/plato'
import ShowProduct from '../ui/ShowProduct'


class Productos extends React.Component{
    
    constructor(){
        super()
        this.state={
            productos:null
        }
    }


    getProductos = async() =>{
        const url = backendUrl+'/products/';
        await fetch(url, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({
                productos:response
            })
            console.log(response);
        })
        .catch((e)=>{
        console.log(e)
        });
    }
    
    componentDidMount(){
        this.getProductos()
    }
   
    
    render(){
        const {productos} = this.state;
        if(productos){
            return ( 
                <>
                    <h1 className="text-3xl font-light mb-4">Agregar Producto</h1>
                    <Link to="/nuevoproducto" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase">
                        Agregar producto
                    </Link>

                    { productos.map( producto => (
                    ShowProduct(producto)
                    )) }
                </>
            );
        }else{return <h1>Reintente luego</h1>}
    }
}
 
export default Productos;