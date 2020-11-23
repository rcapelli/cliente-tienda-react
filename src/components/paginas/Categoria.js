import React from "react";
import backendUrl from '../../utils/backendUrl'

class Categoria extends React.Component{
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
        categorias.map(categoria => {
        return (<option value={categoria.categoria}>{categoria.categoria}</option>)
        })
      )
    }
  
}


export default Categoria


