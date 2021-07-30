import './index.css';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('Market Trend');
  const [cryptos, setCryptos] = useState([]);
  const [usdtPrice, setUsdtPrice] = useState(0);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=24h';
  useEffect(() => {
    axios.get(url)
         .then(response => {
          setCryptos(response.data);
          setUsdtPrice(response.data.filter(i => i.id === 'tether')[0].current_price);
         });
  });

  return (
    <div>
      <Home title={title} setTitle={setTitle} cryptos={cryptos} setCryptos={setCryptos} usdtPrice={usdtPrice} setUsdtPrice={setUsdtPrice} />
    </div>
  );
}

export default App;
