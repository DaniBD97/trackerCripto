import { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'

import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import TableComponent from './components/TableComponent'
import { CriptoContext } from './Context/CriptoContext'
import Header from './components/Header'


const App = () => {
  /*MONEDA QUE SE SELECCIONA EN EL FORMULARIO*/
  const { setMonedas, resultado, period, chartData, setPeriod, cargando, } = useContext(CriptoContext)




  useEffect(() => {
    console.log("Resultado actualizado:", resultado);
  }, [resultado]);


  const handleButtonClick = (days) => {
    setPeriod(days);
  };


  // Función para determinar si mostrar el spinner



  console.log(period);

  return (
    <div className='contenedor'>
      <section>
      <Header />
      <span className='slogan'>TrackerCript ve en que precio estan las mejores monedas para tu proxima inversion</span>


      <>

       

        <TableComponent />



        <Formulario
          //se envia la seleccion de monedas alsatet
          setMonedas={setMonedas}
        ></Formulario>

        <div className='main-content'>
          {cargando && <Spinner />}
          {resultado.PRICE &&

            <>
              <Resultado resultado={resultado} />
              <div className='contenedor-grafico'>



                {Object.keys(chartData).length > 0 && (
                  <>
                    <div className='contenedor-grafo'>
                      <div className='botones'>
                        <button onClick={() => handleButtonClick(30)}>30 D</button>
                        <button onClick={() => handleButtonClick(7)}>7 D</button>
                      </div>

                      <VictoryChart
                        theme={VictoryTheme.material}
                        containerComponent={
                          <VictoryVoronoiContainer
                            labels={({ datum }) => `$${datum.y.toFixed(2)}`}
                            labelComponent={<VictoryTooltip />}
                          />
                        }
                      >
                        {/* Eje X con configuración personalizada */}
                        <VictoryAxis
                          tickFormat={(x) => {
                            const date = new Date(x);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11
                            const year = String(date.getFullYear()).slice(2); // Últimos 2 dígitos del año
                            return `${day}-${month}-${year}`;
                          }

                          } // Ajusta aquí el formato de las fechas
                          style={{
                            ticks: { stroke: "grey", size: 5 }, // Tamaño y color de las "flechas"
                            tickLabels: {
                              angle: -45, // Rota las etiquetas del eje X si se solapan
                              fontSize: 10,
                              padding: 15,
                            },
                          }}
                          tickCount={6} // Muestra un número razonable de ticks
                        />

                        {/* Eje Y para precios */}
                        <VictoryAxis
                          dependentAxis
                          tickFormat={(y) => `$${y}`} // Formato de precios
                          style={{
                            ticks: { stroke: "grey", size: 5 },
                            tickLabels: { fontSize: 10, padding: 5 },
                          }}
                        />
                        <VictoryLine
                          data={chartData}
                          style={{
                            data: { stroke: "#3149c4" },
                            labels: { fontSize: 12 },
                          }}
                        />
                      </VictoryChart>
                    </div>
                  </>

                )}
              </div>
            </>
          }


        </div>
      </>


      </section>
      






    </div>
  )
}

export default App
