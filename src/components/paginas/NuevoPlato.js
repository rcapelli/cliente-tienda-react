import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader'; 
import backendUrl from '../../utils/backendUrl'

const NuevoPlato = () => {

    //context firebase
    const { firebase } = useContext(FirebaseContext);

    //state para imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlImagen, guardarUrl] = useState('');
    //DESDE ACA
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [existencia, setExistencia] = useState("");
    const [image, setImage] = useState("");
    //HASTA ACA
    // Hook para redireccionar
    const navigate = useNavigate();


    //validacion y lectura de formulario
    const formik = useFormik({
        initialValues:{
            nombre: '',
            descripcion: '',
            precio: '',
            categoria: '',
            image: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .min(5, 'El nombre debe tener al menos 5 caracteres')
                    .required('Campo obligatorio'),
            descripcion: Yup.string()
                    .min(10, 'El nombre debe tener al menos 10 caracteres')
                    .required('Campo obligatorio'),
            precio: Yup.number()
                    .min(1)
                    .required('Campo obligatorio'),
            categoria: Yup.string()
                    .required('Campo obligatorio'),
        }),
        onSubmit: async (datos) => {
            try {
                datos.existencia = true;
                datos.image = urlImagen;
                //DESDE ACA
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
                    existencia : existencia,
                    image : image,
                    precio : precio,
                    nombre : nombre,
                    descripcion : descripcion,
                    })
                })
                .then(function(response){
                    switch(response.status){
                    case 201: return response.json()
                    break;
                    case 401: console.log("Mail incorrecto")
                    break
                    case 402: console.log("Contrasena incorrecta")
                    break
                    default: console.log("ERROR")
                    }
                    
                })
                
            }catch (error) {
                console.log(error);
            }
    
            //HASTA ACA
                //firebase.db.collection('productos').add(datos);
        }
    });


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
        guardarUrl(url);
    }

    const handleProgress = progreso => {
        guardarProgreso(progreso);
        console.log(progreso);
    }

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Nuevo Plato</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre: </label>
                            <input 
                                className="shadow appearance-none border 
                                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre plato"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción: </label>
                            <textarea 
                                className="shadow appearance-none border 
                                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                                    id="descripcion"
                                    placeholder="Inserte descripción"
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                            ></textarea>
                        </div>
                        { formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.descripcion}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio: </label>
                            <input 
                                className="shadow appearance-none border 
                                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    type="number"
                                    placeholder="Precio"
                                    value={formik.values.precio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.precio && formik.errors.precio ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria: </label>
                            <select
                            className="shadow appearance-none border 
                                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="categoria"
                                    name="categoria"
                                    value={formik.values.categoria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>
                                        <option value="">--Seleccione--</option>
                                        <option value="desayuno">Desayuno</option>
                                        <option value="platos">Platos</option>
                                        <option value="promocion">Promociones</option>
                                        <option value="bebida">Bebida</option>
                                        <option value="postre">Postre</option>
                                        <option value="ensalada">Ensalada</option>
                            </select>
                        </div>
                        { formik.touched.categoria && formik.errors.categoria ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.categoria}</p>
                            </div>
                        ) : null }

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

                            { urlImagen && (
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
}
 
export default NuevoPlato;