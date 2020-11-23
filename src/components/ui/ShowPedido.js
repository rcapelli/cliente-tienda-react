import React, {useState} from "react";
import backendUrl from '../../utils/backendUrl'


const ShowPedido = (pedido) =>{
const {key, id, nombre, apellido, direccion,email, estado, precioTotal, productos} = pedido;


const updateEstado = async(key,estado) => {
    const url = backendUrl+"/pedidos/updateEstado"
    await fetch(url, {
        method:"PUT",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key : key,
            estado : estado
        })
    })
    .catch((e)=>{
    console.log(e)
    })
}

    return(
        <>
        <div className="w-full px-3 mb-4">
           <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        
                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2">Estado: </span>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white leading-tight 
                                                focus:outline-none focus:shadow-outline"
                
                                    onChange={(e) => updateEstado(key,e.target.value)}>
                                    <option value="En proceso" selected={estado=="En proceso"}>En proceso</option>
                                    <option value="En camino" selected={estado=="En camino"}>En camino</option>
                                    <option value="Entregado" selected={estado=="Entregado"}>Entregado</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <h3 className="mb-4"><u>Datos del pedido</u></h3>
                        <p className="text-green-600 mb-2">Id: {id}</p>
                        <p className="text-green-600 mb-2">Nombre: {nombre}</p>
                        <p className="text-green-600 mb-2">Apellido: {apellido}</p>
                        <p className="text-green-600 mb-2">Dirección: {direccion}</p>
                        <p className="text-green-600 mb-2">Dirección: {email}</p>
                        <p className="text-green-600 mb-2">Precio: ${precioTotal}</p>
                    </div>

                </div>
           </div>
        </div>
        </>
    )

}

export default ShowPedido
