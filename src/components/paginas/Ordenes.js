import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import backendUrl from '../../utils/backendUrl'
import ShowPedido from '../ui/ShowPedido'


class Pedidos extends React.Component{
    
    constructor(){
        super()
        this.state={
            pedidos:null
        }
    }

    getPedidos = async() =>{
        const url = backendUrl+'/pedidos/';
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
                pedidos:response
            })
            console.log(response);
        })
        .catch((e)=>{
        console.log(e)
        });
    }
    
    componentDidMount(){
        this.getPedidos()
    }
    
    render(){
        const {pedidos} = this.state;
        if(pedidos){
            return ( 
                <>
                    <h1 className="text-3xl font-light mb-4">Pedidos</h1>
                    
                    { pedidos.map( pedido => (
                    ShowPedido(pedido)
                    )) }
                </>
            );
        }else{return <h1>Reintente luego</h1>}
    }
}
 
export default Pedidos;