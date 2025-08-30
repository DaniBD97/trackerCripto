import { useState, useEffect, useContext } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer } from 'victory';
import { CriptoContext } from '../Context/CriptoContext';

const TableComponent = () => {
    const { cryptoData } = useContext(CriptoContext)
    const [loading, setLoading] = useState(true);



    const formatNumber = (num) => {
        if (num === undefined || num === null) return '$0.00';
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        } catch {
            return '$0.00';
        }
    };

    const formatPercent = (num) => {
        if (num === undefined || num === null) return '0.00%';
        try {
            return num.toFixed(2) + '%';
        } catch {
            return '0.00%';
        }
    };

    return (
        <div className="dashboard-container">
            <h1>DashBoard</h1>
            <span>Precio de las 5 mejores criptoMonedas en tiempo Real</span>
          
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Direct Volume</th>
                                <th>Total Volume</th>
                                <th>Top Volume</th>
                                <th>Market Cap</th>
                                <th>7d Chart</th>
                                <th>24h Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoData.map((crypto) => (
                                <tr key={crypto.name}>
                                    <td className="crypto-name">{crypto.name}</td>
                                    <td>
                                        <div className={`price-value ${crypto.priceChange >= 0 ? 'positive' : 'negative'}`}>
                                            {formatNumber(crypto.price)}
                                            <span className="change-percent">
                                                ({formatPercent(crypto.priceChange)})
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={crypto.directVolChange >= 0 ? 'positive' : 'negative'}>
                                            {formatNumber(crypto.directVol)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={crypto.totalVolChange >= 0 ? 'positive' : 'negative'}>
                                            {formatNumber(crypto.totalVol)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={crypto.topVolChange >= 0 ? 'positive' : 'negative'}>
                                            {formatNumber(crypto.topVol)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={crypto.marketCapChange >= 0 ? 'positive' : 'negative'}>
                                            {formatNumber(crypto.marketCap)}
                                        </div>
                                    </td>
                                    <td className="chart-cell">
                                        <div className="chart-container">
                                            {crypto.historical && crypto.historical.length > 0 && (
                                                <VictoryChart
                                                    padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                                    height={60}
                                                    style={{
                                                        // Hace el texto de los ticks transparente
                                                    }}


                                                    containerComponent={
                                                        <VictoryVoronoiContainer
                                                            labels={({ datum }) => `$${(datum.y || 0).toFixed(2)}`}
                                                        />
                                                    }
                                                >

                                                    <VictoryAxis
                                                        style={{


                                                            tickLabels: { fill: "transparent" } // Hace los labels transparentes
                                                            // O puedes usar tickLabels: { display: "none" } para removerlos completamente
                                                        }}
                                                    />
                                                    <VictoryAxis
                                                        dependentAxis
                                                        style={{


                                                            ticks: { stroke: "transparent" },
                                                            tickLabels: { fill: "transparent" } // Hace los labels transparentes
                                                            // O puedes usar tickLabels: { display: "none" } para removerlos completamente
                                                        }}
                                                    />

                                                    <VictoryLine
                                                        standalone={false}
                                                        data={crypto.historical}
                                                        style={{
                                                            data: {
                                                                stroke: (crypto.change7Days || 0) >= 0 ? "#10B981" : "#EF4444",
                                                                strokeWidth: 2
                                                            }
                                                        }}
                                                    />
                                                </VictoryChart>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={crypto.exchange >= 0 ? 'positive' : 'negative'}>
                                            {formatPercent(crypto.exchange)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
         

        </div>
    );
};

export default TableComponent;