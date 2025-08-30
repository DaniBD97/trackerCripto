import { useState, useContext } from 'react'
import useSelectMonedas from '../Hooks/useSelectMonedas'

import Error from './Error'
import { CriptoContext } from '../Context/CriptoContext'
import { monedas } from '../data/moneda'

const Formulario = ({ setMonedas }) => {
    const { criptos } = useContext(CriptoContext)
    const [error, setError] = useState(false);
    /*CONSTANTES CREADAS PARA MOSTRAR LAS MONEDAS USD Y LAS CRIPTS EJEMPLO BTC*/
    const [moneda, SelectMonedas] = useSelectMonedas('Elige Tu Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige Tu CriptoMoneda', criptos)


    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        } else {
            setError(false)
            //si todos lo svalores estan relleneados se envian la moneda y cripto seleccionada
            //esto envia al state de la aplicacion la moneda del js y la cripto moneda llamado con el useEffect
            setMonedas({
                moneda,
                criptomoneda
            })
        }



    }

    return (
        <>
            <h1>Consultor</h1>
            <span>Selecciona las monedas de tu preferencia, para ver el precio de estas en tiempo real, ademas sobre el grafico
                tendras do botones para ver las variaciones del precio de la moneda en un mes o/y en  una semana
            </span>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit} className='Formulario'>
                <div className='input-form'>
                    <div>
                        <SelectMonedas />
                    </div>

                    <div>
                        <SelectCriptomoneda />
                    </div>
                    <div>
                        <input className='Boton-Form' type="submit" value="Cotizar" name="" id="" />
                    </div>

                </div>





            </form>
        </>
    )
}

export default Formulario
