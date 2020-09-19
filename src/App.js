import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //  State de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(5);


  useEffect(() => {
    // Para que no realice una búsqueda si es que el state no posee nada
    if(busqueda === '') return;
    
    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = '17753515-79e4ffd475f28f266b4ede4c9';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      // const { hits } = resultado;
      guardarImagenes(resultado.hits);

      // calcular total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      console.log(calcularTotalPaginas);
      guardarTotalPaginas(calcularTotalPaginas);


      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }

    
    consultarAPI();
  }, [busqueda, paginaactual])

  // Se define la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0) return;
    
    guardarPaginaActual(nuevaPaginaActual);
    console.log(paginaactual);
  }


   // Se define la página siguiente
   const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
       <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imágenes
        </p>

        <Formulario 
          guardarBusqueda={guardarBusqueda} 
        />
       </div>

       <div className="row justify-content-center">
         <ListadoImagenes 
          imagenes={imagenes} 
          />
          { (paginaactual > 1 ) ?
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}

          > &laquo; Anterior
          </button> : null  
        }

          { (paginaactual === totalpaginas ) ? null
          :<button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaSiguiente}

        >Siguiente &raquo;
        </button>
        }
       </div>
     </div>
  );
}

export default App;
