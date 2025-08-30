import { useEffect, useState } from "react";
import { CriptoContext } from "./CriptoContext"



export const CriptoProvider = ({ children }) => {
    const [cargando, setCargando] = useState(false);
    const [monedas, setMonedas] = useState({});
    const [monedasH, setMonedasH] = useState({});
    const [resultado, setResultado] = useState({});
    const [period, setPeriod] = useState(30);
    const [chartData, setChartData] = useState([]);
    const [cryptoData, setCryptoData] = useState([]);
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false)


    useEffect(() => {
        let isSubscribed = true;

        if (Object.keys(monedasH).length > 0) {
            const fetchHistoricalData = async () => {
                try {
                    setCargando(true)
                    const { criptomoneda } = monedasH;
                    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${criptomoneda}&tsym=USD&limit=${period}&aggregate=1`;
                    const response = await fetch(url);
                    const data = await response.json();

                    if (!isSubscribed) return;

                    if (data.Response === "Success") {
                        const formattedData = data.Data.Data.map((item) => ({
                            x: item.time * 1000,
                            y: item.close,
                        }));
                        setChartData(formattedData);
                        setCargando(false)
                    }
                } catch (error) {
                    if (!isSubscribed) return;
                    console.error("Error al obtener datos históricos:", error);
                }
            };

            fetchHistoricalData();
        }

        return () => {
            isSubscribed = false;
        };
    }, [monedasH, period]);

    useEffect(() => {
        let isSubscribed = true; // Para evitar actualizaciones si el componente se desmonta

        if (Object.keys(monedas).length > 0) {
            const cotizarCripto = async () => {
                setCargando(true)
                try {
                   
                    setError(null);

                    const { moneda, criptomoneda } = monedas;
                    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
                    const respuesta = await fetch(url);
                    const data = await respuesta.json();

                    if (!isSubscribed) return;

                    if (data.Response === "Error") {
                        setError(data.Message);
                        return;
                    }

                    // Solo actualizar resultado si la respuesta es exitosa
                    if (data.DISPLAY && data.DISPLAY[criptomoneda] && data.DISPLAY[criptomoneda][moneda]) {
                        setResultado(data.DISPLAY[criptomoneda][moneda]);
                        setMonedasH({ criptomoneda }); // Actualizar monedasH para el gráfico
                       
                    }

                } catch (error) {
                    if (!isSubscribed) return;
                    setError("Error al obtener los datos");
                    console.error("Error en cotizarCripto:", error);
                } finally {
                    setCargando(false)
                    if (isSubscribed) {
                        setCargando(false);
                    }
                }
            };

            cotizarCripto();
        }

        return () => {
            isSubscribed = false; // Limpieza al desmontar
        };
    }, [monedas]);




    //Formulario

    /*VARIABLE CREADA PARA RELLENAR CON LA INFORMACION IMPORTANTE DE LA API*/






    console.log();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                setCargando(true)
                const url = "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD";
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                const arrayCriptos = resultado.Data.map(cripto => ({
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }));

                setCriptos(arrayCriptos);
                setCargando(false)
            } catch (error) {
                console.error("Error al consultar lista de criptos:", error);
            }
        };

        consultarAPI();
    }, []);

    //Table

    useEffect(() => {
        const fetchData = async () => {
           
            try {
               
                const responsePrice = await fetch(
                    'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,USDT&tsyms=USD'
                );
                const dataPrice = await responsePrice.json();

                const cryptos = ['BTC', 'ETH', 'XRP', 'USDT'];
                const historicalData = await Promise.all(
                    cryptos.map(async (crypto) => {
                        const response = await fetch(
                            `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${crypto}&tsym=USD&limit=7`
                        );
                        const data = await response.json();
                        return {
                            symbol: crypto,
                            history: data?.Data?.Data?.map(day => ({
                                x: new Date(day.time * 1000),
                                y: day.close || 0
                            })) || []
                        };
                    })
                );

                const formattedData = Object.entries(dataPrice.RAW || {}).map(([symbol, value]) => {
                    const historicalPrices = historicalData.find(h => h.symbol === symbol)?.history || [];
                    const usdData = value?.USD || {};
                    return {
                        name: symbol,
                        price: usdData.PRICE || 0,
                        priceChange: usdData.CHANGEPCT24HOUR || 0,
                        directVol: usdData.VOLUMEDAY || 0,
                        directVolChange: ((usdData.VOLUMEDAY || 0) - (usdData.VOLUMEDAYTO || 0)) / (usdData.VOLUMEDAYTO || 1) * 100,
                        totalVol: usdData.VOLUMEDAYTO || 0,
                        totalVolChange: usdData.TOTALVOLUME24HTO || 0,
                        topVol: usdData.VOLUMEHOUR || 0,
                        topVolChange: usdData.VOLUMEHOURTO || 0,
                        marketCap: usdData.MKTCAP || 0,
                        marketCapChange: usdData.MKTCAPCHANGE24HOUR || 0,
                        change7Days: usdData.CHANGEPCT7DAYS || 0,
                        exchange: usdData.CHANGEPCT24HOUR || 0,
                        historical: historicalPrices
                    };
                });

                setCryptoData(formattedData);
                

            } catch (error) {
                console.error('Error fetching data:', error);
                

            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);




    return (
        <CriptoContext.Provider value={{
            resultado,
            setMonedas,
            monedas,
            setPeriod,
            period,
            criptos,
            chartData,
            cryptoData,
            cargando,
            monedasH,
           


        }}>
            {children}
        </CriptoContext.Provider>
    )
}