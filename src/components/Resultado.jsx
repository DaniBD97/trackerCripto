import React from 'react'

const Resultado = ({ resultado }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado
    return (
        <div className='Contenedor-Detalle'>
            <img className='imagenDetalle' src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />

            <div className='detalle'>

                <p className='Precio'>El Precio es de: <span>{PRICE}</span></p>
                <p>El Precio Mas Alto: <span>{HIGHDAY}</span></p>
                <p>El Precio Mas Bajo: <span>{LOWDAY}</span></p>
                <p>Variacion del Precio: <span>{CHANGEPCT24HOUR}</span></p>

                <p>Ultima Actualizacion del Precio: <span>{LASTUPDATE}</span></p>


            </div>



        </div>
    )
}

export default Resultado
