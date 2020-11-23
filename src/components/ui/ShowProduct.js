import React, {useState} from "react";
import backendUrl from '../../utils/backendUrl'


const ShowProduct = (product) =>{
const {key, id, nombre, url, categoria, existencia, precio, descripcion} = product;


const eliminarProducto = async(key) => {
    const url = backendUrl+"/products/deleteByKey"
    await fetch(url, {
        method:"DELETE",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key : key
        })
    })
    .catch((e)=>{
    console.log(e)
    })
    window.location.reload()
    
}

const updateExistencia = async(key,existencia) => {
    const url = backendUrl+"/products/updateExistencia"
    await fetch(url, {
        method:"PUT",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key : key,
            existencia : existencia
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
                        <img src={url} alt=""/>
                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2">Existencia: </span>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white leading-tight 
                                                focus:outline-none focus:shadow-outline"
                
                                    onChange={(e) => updateExistencia(key,e.target.value)}>
                                    <option value="true" selected={existencia=="true"}>Disponible</option>
                                    <option value="false"selected={existencia=="false"}>No Disponible</option>
                                </select>
                            </label>
                        </div>
                        <div className="sm:flex sm:-mx-2 pl-2">
                            <button className="block mt-5 sm:w-2/4 bg-red-600" onClick={ () => eliminarProducto(key)}>
                                <span className="block text-white mb-2">Borrar</span>
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
                        <p className="text-green-600 mb-4">Categoria: {''} 
                            <span className="text-gray-700 font-bold">{categoria.toUpperCase()}</span>
                        </p>
                        <p className="text-green-600 mb-4">Id: {id}</p>
                        <p className="text-green-600 mb-4">{descripcion}</p>
                        <p className="text-green-600 mb-4">Precio: ${precio}</p>
                        <p className="text-green-600 mb-4">{existencia}</p>
                    </div>

                </div>
           </div>
        </div>
        </>
    )

}

export default ShowProduct
