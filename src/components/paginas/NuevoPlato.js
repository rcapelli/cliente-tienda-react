import React , {useState, useContext} from 'react';
import FileUploader from 'react-firebase-file-uploader'; 
import backendUrl from '../../utils/backendUrl'
import { FirebaseContext } from '../../firebase';

const NuevoPlato = () => {

    const { firebase } = useContext(FirebaseContext);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [existencia, setExistencia] = useState("");
    const [image, setImage] = useState("");
    
    /*const guardarDatos = (e) => {
        
        login()
        
        e.preventDefault()
        //e.target.reset()
        //setNombre('')
        //setDescripcion('')
    }*/

    const login = async () => {
        if(!nombre || !descripcion || !precio || !categoria){
            console.log("ERROR todos los campos son obligatorios")  
        }
        else{
            setExistencia(true)
            setImage("asdasd")
            const url = backendUrl+"/products/new"
            await fetch(url, {
                method:"POST",
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                mode: 'no-cors',
                body: JSON.stringify({
                categoria : categoria,
                descripcion : descripcion,
                nombre : nombre,
                precio : precio,
                existencia : existencia,
                image : image,
                })
            })
        .catch((e)=>{
          console.log(e)
        })
      }
    }

    //return (
        return ( 
            <>
                <h1 className="text-3xl font-light mb-4">Nuevo Plato</h1>
    
                <div className="flex justify-center mt-10">
                    <div className="w-full max-w-3xl">
                        
                        <form onSubmit={login}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre: </label>
                                <input 
                                    className="shadow appearance-none border 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="nombre"
                                        type="text"
                                        placeholder="Ingrese Nombre"
                                        onChange={ (e) => setNombre(e.target.value) }
                                />
                            </div>

    
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción: </label>
                                <textarea 
                                    className="shadow appearance-none border 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                                        id="descripcion"
                                        type="text"
                                        placeholder="Ingrese Descripcion"
                                        onChange={ (e) => setDescripcion(e.target.value) }
                                ></textarea>
                            </div>

    
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio: </label>
                                <input 
                                    className="shadow appearance-none border 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="precio"
                                        type="number"
                                        placeholder="Precio"
                                        onChange={ (e) => setPrecio(e.target.value) }
                                />
                            </div>
                           
    
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria: </label>
                                <select
                                className="shadow appearance-none border 
                                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="categoria"
                                        name="categoria"
                                        onChange={ (e) => setCategoria(e.target.value) }>
                                            <option value="">--Seleccione--</option>
                                            <option value="desayuno">Desayuno</option>
                                            <option value="platos">Platos</option>
                                            <option value="promocion">Promociones</option>
                                            <option value="bebida">Bebida</option>
                                            <option value="postre">Postre</option>
                                            <option value="ensalada">Ensalada</option>
                                </select>
                            </div>
    
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Imagen: </label>
                                <FileUploader
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                />
                            </div>
                            <input 
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase"
                                value="Agregar"
                            />
                        </form>
                    </div>
                </div>
            </>
         );
        /*<div>
            <h2>Formulario</h2>
            <form onSubmit={ guardarDatos } >
                <input 
                    type="text"
                    placeholder="Ingrese Nombre"
                    className="form-control mb-2"
                    onChange={ (e) => setNombre(e.target.value) }
                />
                <input 
                    type="text"
                    placeholder="Ingrese Descripcion"
                    className="form-control mb-2"
                    onChange={ e => setDescripcion(e.target.value) }
                />
                <button className="btn btn-primary btn-block" type="submit">Agregar</button>
            </form>
        </div>*/
    //)
}

export default NuevoPlato