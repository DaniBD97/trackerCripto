import React, { useState } from 'react'
//opciones es el valor de la api
const useSelectMonedas = (label, opciones) => {


    const [state, setState] = useState('')

    const SelectMonedas = () => (

        <section className='select-container'>
            <label htmlFor="">{label}</label>
            <select className='Select-Form'

                value={state}
                onChange={e => setState(e.target.value)}


            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option
                        //se toman los valores que se van a leer en este caso el id que es el nomber y el nombre que es el full name ejemplo btc que esigual a bitcoin
                        key={opcion.id}
                        value={opcion.id}

                    >
                        {opcion.nombre}
                    </option>
                ))}
            </select>

        </section>


    )
    //retprma el select ademas de state que es el cambio dentro de DOM
    return [state, SelectMonedas]

}

export default useSelectMonedas
