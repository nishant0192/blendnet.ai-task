import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Dashboard: React.FC = () => {
  const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
  const [symbol, setSymbol] = useState<string>('IBM'); // Default symbol to IBM
  const [stockData, setStockData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/watchlist/stock/${symbol}`);
      setStockData(response.data['Time Series (5min)']);
      setError('');
    } catch (error) {
      setError('Error fetching stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial stock data when component mounts
    handleSubmit({} as React.FormEvent<HTMLFormElement>);
  }, []);

  return (
    <div className='mt-28 ml-9' style={{ width: '90vw', height: '80vh' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} /> {/* Ensure symbol is uppercase */}
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {Object.keys(stockData).length > 0 && (
        <Plot
          data={[
            {
              x: Object.keys(stockData),
              y: Object.values(stockData).map((data: any) => parseFloat(data['1. open'])),
              type: 'scatter',
              mode: 'lines',
              name: 'Open Price',
            },
            {
              x: Object.keys(stockData),
              y: Object.values(stockData).map((data: any) => parseFloat(data['4. close'])),
              type: 'scatter',
              mode: 'lines',
              name: 'Close Price',
            },
          ]}
          layout={{ title: 'Intraday Stock Prices', xaxis: { title: 'Time' }, yaxis: { title: 'Price' } }}
          style={{ width: '100%', height: '100%' }} // Make plot full width and height
        />
      )}
    </div>
  );
};

export default Dashboard;
