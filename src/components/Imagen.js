import React from 'react'

const Imagen = ({imagen}) => {
    
    // Extraemos las variables
    const { largeImageURL, likes, previewURL, tags, views } = imagen;

    return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <div className="card">
                    <img src={previewURL} alt={tags} height="250" className="card-img-top img-bg-cover" />

                    <div className="card-body">
                        <p className="card-text">{likes} Me Gusta</p>
                        <p className="card-text">{views} Vistas</p>
                    </div>

                    <div className="card-footer">
                        <a 
                            href={largeImageURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-block"
                        >
                            Ver Imagen HD
                        </a>
                    </div>
    
                </div>
            </div>
    )
}

export default Imagen;
