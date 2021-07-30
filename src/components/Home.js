import '../index.css';
import { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import CryptoRow from './CryptoRow';
import CryptoView from './CryptoView';
import WithdrawForm from './WithdrawForm';
import PaginateList from './PaginateList';
import DepositForm from './DepositForm';

export default function Home({title, setTitle, cryptos, setCryptos, usdtPrice, setUsdtPrice}) {
  
  const [wallet, setWallet] = useState([
    {
      id: 'tether',
      amount: 0,
      symbol: 'USDT',
    }
  ]);

  const [page, setPage] = useState(0);
  const perPage = 15;
  const [fiat, setFiat] = useState(0);
  const [dollar, setDollar] = useState(0);

  setTitle('Market Trend');

  useEffect(() => {
    const usdt = wallet.filter(i => i.id == 'tether');
    setFiat(usdt[0].amount);
  });
  
  const cryptoRoutes = cryptos.map(crypto => <Route path={'/trade/' + crypto.id}><CryptoView crypto={crypto} key={crypto.id} setTitle={setTitle} setFiat={setFiat} setWallet={setWallet} fiat={fiat} wallet={wallet} /></Route>);
  const cryptoDisplay = cryptos.map(crypto => <CryptoRow key={crypto.id} crypto={crypto} color={crypto.price_change_percentage_24h > 0 ? 'text-green-500 text-right' : 'text-red-500 text-right'}/>);
  return (
    <div className="bg-gradient-to-br from-yellow-200 to-transparent bg-cover">
      <div className="md:container md:mx-auto pt-12 min-h-screen">
        <div className="grid-rows-12">
          <div className="flex flex-row items-start justify-between">
            <div><h1 className="text-2xl font-bold text-yellow-400"><Link to={'/home'} >TRADELAH</Link></h1></div>
            <div>
                <p className="font-bold">My US Dollar Wallet:</p>
                <p>{dollar} USD</p>
                <p className="font-bold">My Crypto Wallet:</p>
                <p>{fiat} USDT</p>
                {wallet.filter(i => i.id !== 'tether').map(i => {
                  return <p>{i.amount} {i.symbol.toUpperCase()}</p>
                })}
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-between pt-8">
              <div><p className="text-4xl">{title}</p></div>
              <div>
                <Link className="bg-gray-300 hover:bg-gray-200 pt-2 pb-2 pl-8 pr-8 mr-2 round-md" to={'/deposit'}>Deposit</Link>
                <Link className="bg-yellow-400  hover:bg-yellow-300 pt-2 pb-2 pl-8 pr-8 round-md" to={'/withdraw'}>Withdraw</Link>
              </div>
              </div>
          </div>
            <Switch>
              <Route path="/home">
                <div className="w-full bg-white py-2 px-4 mt-4 shadow-md rounded-md">
                  <PaginateList page={page} setPage={setPage} perPage={perPage} data={cryptoDisplay} />
                </div>
              </Route>
              <Route path="/deposit">
                <DepositForm usdtPrice={usdtPrice} wallet={wallet} setWallet={setWallet} fiat={fiat} title={title} setTitle={setTitle} />
              </Route>
              <Route path="/withdraw">
                <WithdrawForm usdtPrice={usdtPrice} wallet={wallet} setWallet={setWallet} fiat={fiat} title={title} setTitle={setTitle} dollar={dollar} setDollar={setDollar}  />
              </Route>
              {cryptoRoutes}
            </Switch>
        </div>
      </div>
    </div>
  );
}
