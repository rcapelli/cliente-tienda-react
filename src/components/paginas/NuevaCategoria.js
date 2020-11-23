import React , {useState, useContext} from 'react';
import backendUrl from '../../utils/backendUrl'

const NuevaCategoria = () => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const submit = async (inputs) => {
        if(!nombre || !descripcion){
            console.log("ERROR todos los campos son obligatorios")  
        }
        else{
            const url = backendUrl+"/categorias/new"
            await fetch(url, {
                method:"POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    categoria : nombre,
                    descripcion : descripcion
                })
            })
        .catch((e)=>{
          console.log(e)
        })
        console.log("El nombre es: "+nombre+" y su descripcion: "+descripcion)
        inputs.preventDefault()
        inputs.target.reset()
        setNombre('')
        setDescripcion('')
      }
    }

    //return (
        return ( 
            <>
                <h1 className="text-3xl font-light mb-4">Nueva Categoría</h1>
    
                <div className="flex justify-center mt-10">
                    <div className="w-full max-w-3xl">
                        
                        <form onSubmit={submit}>
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

}

export default NuevaCategoria