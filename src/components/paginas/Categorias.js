import React from 'react';
import {Link} from 'react-router-dom';
import backendUrl from '../../utils/backendUrl'

class Categorias extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        categorias: []
      };
    }
    logCategorias = async () => {
      var returnCategorias
      const url = backendUrl + "/categorias/"
        await fetch(url, {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (response){
            console.log(response)
            returnCategorias = response
          })
          return returnCategorias
    }
  
    async componentDidMount(){
      var listado = await this.logCategorias() 
      this.setState({categorias: listado})
    }
  
      render(){
        const {categorias} = this.state
        return(
            <>
            <h1 className="text-3xl font-light mb-4">Categorías</h1>
            <Link to="/nuevacategoria" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase">
                Agregar categoría
            </Link>
            <h2 className="text-2xl font-light mb-4"><u>Listado de categorías</u></h2>
            <ul>
                {categorias.map(categoria => {
                return (<li>{categoria.categoria}</li>)
                })}
            </ul>
          </>
        )
      }
}
 
export default Categorias;