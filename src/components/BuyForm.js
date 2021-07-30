import {React, useState, useEffect} from 'react';
import InputField from './InputField';

export default function BuyForm({crypto, fiat, setFiat, wallet, setWallet, coin, setCoin}) {
    const [usdt, setUsdt] = useState(fiat);
    const [usdtColor, setUsdtColor] = useState('black');
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);

    const onChangeHandler = (e) => {
        const walletCopy = [...wallet];
        if(parseFloat(fiat) > 0)
        {
            if(parseFloat(fiat) > parseFloat(total))
            {
                if(wallet.filter(i => i.id == crypto.id).length > 0)
                {
                    const current = walletCopy.filter(i => i.id == crypto.id);
                    current[0].amount = parseFloat(current[0].amount) + parseFloat(amount);

                    const usdt = walletCopy.filter(i => i.id == 'tether');
                    usdt[0].amount = parseFloat(usdt[0].amount) - parseFloat(total);
                    setWallet(walletCopy);
                    setCoin(current[0].amount);
                }else{
                    walletCopy.push({id: crypto.id, amount: amount, symbol: crypto.symbol});
                    const usdt = walletCopy.filter(i => i.id == 'tether');
                    usdt[0].amount = parseFloat(usdt[0].amount) - parseFloat(total);
                    setWallet(walletCopy);
                    setCoin(amount);
                }
            }
        }
    }

    //console.log("fiat:" + fiat);
    //console.log("usdt:" + usdt);

    return (
        <div className="w-full">
            <div className="flex flex-row items-end justify-between">
                <div><h3 className="text-2xl font-bold">Buy {crypto.symbol.toUpperCase()}</h3></div>
                <div><p>Available: <span className={"text-"+usdtColor+"-500"}>{fiat}</span> USDT</p></div>
            </div>
            <div className="shadow-sm rounded w-full bg-gray-200 flex flex-row items-end justify-between py-2 px-4 my-4">
                <div><p>Price</p></div>
                <div><p className="font-bold">{(crypto.current_price).toFixed(2)} USDT</p></div>
            </div>
            <div>
            <InputField
                className=""
                type="number"
                name="Amount"
                name={crypto.symbol.toUpperCase()}
                onChange={(e) => {
                    const input = e.target.value.length > 0 ? e.target.value : 0;
                    setAmount(input);
                    const tot = parseFloat(input) * parseFloat(crypto.current_price);
                    setTotal(tot);
                    setUsdt(parseFloat(fiat) - parseFloat(tot));
                    setUsdtColor(usdt < 0 ? 'red' : 'black');
                }}
                value={amount}
            />
            </div>
            <div className="shadow-sm rounded w-full bg-gray-200 flex flex-row items-end justify-between py-2 px-4 my-4">
                <div><p>Total</p></div>
                <div><p className="font-bold">{total ? total : 0} USDT</p></div>
            </div>
            <div>
                <button className="hover:bg-green-400 bg-green-500 py-2 px-4 rounded-md shadow w-full text-white" onClick={onChangeHandler}>Buy {crypto.symbol.toUpperCase()}</button>
            </div>
        </div>
    )
}
