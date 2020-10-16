import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../../firebase'

import Plato from '../ui/plato'


const Menu = () => {

    // defino state
    const [platos, guardarPlatos] = useState([]);
    
    const { firebase } = useContext(FirebaseContext);

    // consultar base de datos al cargar
    useEffect(() => {
        const obtenerPlatos = () => {
           firebase.db.collection("productos").onSnapshot(handleSnapshot)
        }
        obtenerPlatos();
    }, []);


    // Snapshot para utilizar el realtime database
    function handleSnapshot(snapshot){
        const platos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        //guardo resultados en state
        guardarPlatos(platos);
    }




    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/nuevoplato" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase">
                Agregar plato
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
 
export default Menu;