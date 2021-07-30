import {React, useState} from 'react';
import {useEffect} from 'react';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

export default function CryptoView({crypto, setTitle, fiat, setFiat, wallet, setWallet}) {
    const {ath, atl, ath_change_percentage, atl_change_percentage, id, name, image, current_price, price_change_percentage_24h, high_24h, low_24h, market_cap, total_volume, symbol, market_cap_rank, max_supply} = crypto;
    useEffect(() => {
        setTitle('Trade ' + symbol.toUpperCase() + '/USDT')
    });

    const current = wallet.filter(i => i.id == crypto.id);
    const [coin, setCoin] = useState(current.length > 0 ? current[0].amount : 0);
    return (
        <div>
            <div className="w-full bg-white py-2 px-4 mt-4 shadow-md rounded-md">
                <div className="flex flex-row flex-wrap items-start justify-start">
                    <div><img src={image} alt={name} className="h-12 w-12 mr-4 mt-1" /></div>
                    <div className="mr-20">
                        <p className="text-2xl font-bold">{symbol.toUpperCase()}/USDT</p>
                        <p className="text-md">{name}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-2xl font-bold">{(current_price).toFixed(2)}</p>
                        <p className="text-md">&#36;{(current_price).toFixed(2)}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-md">24h Change</p>
                        <p className="text-2xl font-bold">{(current_price).toFixed(2)}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-md">24h High</p>
                        <p className="text-2xl font-bold">{(high_24h).toFixed(2)}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-md">24h Low</p>
                        <p className="text-2xl font-bold">{(low_24h).toFixed(2)}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-md">Market Cap</p>
                        <p className="text-2xl font-bold">{(market_cap).toFixed(2)}</p>
                    </div>
                    <div className="mr-20">
                        <p className="text-md">Max Supply</p>
                        <p className="text-2xl font-bold">{max_supply ? max_supply : '-'}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row flex-wrap items-start justify-start w-full">
                <div className="bg-white py-2 px-4 my-4 mr-6 shadow-md rounded-md w-2/5"><BuyForm crypto={crypto} coin={coin} setCoin={setCoin} fiat={fiat} wallet={wallet} setFiat={setFiat} setWallet={setWallet} /></div>
                <div className="bg-white py-2 px-4 my-4 mr-6 shadow-md rounded-md w-2/5"><SellForm crypto={crypto} coin={coin} wallet={wallet} setCoin={setCoin} setFiat={setFiat} setWallet={setWallet} /></div>
                <div className="bg-white py-2 px-4 my-4 pr-14 shadow-md rounded-md">
                    <h3 className="text-2xl font-bold">History</h3>
                    <br/>
                    <p className="text-sm">All Time High</p>
                    <p className="text-2xl font-bold">{(ath).toFixed(2)}<span className="text-sm"> ({ath_change_percentage}%)</span></p>
                    <br/>
                    <p className="text-sm">All Time Low</p>
                    <p className="text-2xl font-bold">{(atl).toFixed(2)}<span className="text-sm"> ({atl_change_percentage}%)</span></p>
                </div>
            </div>
        </div>
    )
}
