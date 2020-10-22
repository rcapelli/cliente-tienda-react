import React , {useState, useContext} from 'react';
import FileUploader from 'react-firebase-file-uploader'; 
import backendUrl from '../../utils/backendUrl'
import { FirebaseContext } from '../../firebase';

const NuevoProducto = () => {

    const { firebase } = useContext(FirebaseContext);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [image, setUrl] = useState("");
    const [progreso, guardarProgreso] = useState("");
    const [subiendo, guardarSubiendo] = useState("");

    

    const submit = async (inputs) => {
        if(!nombre || !descripcion || !precio || !categoria || !image){
            console.log("ERROR todos los campos son obligatorios")  
        }
        else{
            const url = backendUrl+"/products/new"
            await fetch(url, {
                method:"POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    precio : precio,
                    nombre : nombre,
                    descripcion : descripcion,
                    categoria : categoria,
                    url : image
                })
            })
        .catch((e)=>{
          console.log(e)
        })
        console.log("el precio es: "+precio+". El nombre es: "+nombre+" y su descripcion: "+descripcion)
        inputs.preventDefault()
        inputs.target.reset()
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setCategoria('')
        setUrl('')
      }
    }

        //manejo storage imagenes
        const handleUploadStart = () => {
            guardarProgreso(0);
            guardarSubiendo(true);
        }
    
        const handleUploadError = error => {
            guardarSubiendo(false);
            console.log(error);
        }
    
        const handleUploadSuccess = async nombre => {
            guardarProgreso(100);
            guardarSubiendo(false);
    
            //almacenar url
            const url = await firebase
                            .storage
                            .ref("productos")
                            .child(nombre)
                            .getDownloadURL();
    
            console.log(url);
            setUrl(url);
        }
    
        const handleProgress = progreso => {
            guardarProgreso(progreso);
            console.log(progreso);
        }

    //return (
        return ( 
            <>
                <h1 className="text-3xl font-light mb-4">Nuevo Producto</h1>
    
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
                                    onChange={(e) => setCategoria(e.target.value)}>
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
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>
                            { subiendo && (
                                <div className="h-8 relative w-full border">
                                    <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-8 flex items-center" style={{width: `${progreso}%`}}>
                                        { progreso } %
                                    </div>
                                </div>
                            ) }

                            { image && (
                                <p className="bg-green-500 text-white p-3 text-center my-5">
                                    La imagen se subió correctamente
                                </p>
                            )}
                           
    
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

export default NuevoProducto