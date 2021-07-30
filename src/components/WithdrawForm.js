import { wait } from '@testing-library/dom';
import React from 'react';
import { useState, useEffect } from 'react';
import InputField from './InputField';

export default function WithdrawForm({usdtPrice, fiat, wallet, setWallet, title, setTitle, dollar, setDollar}) {
    const [amount, setAmount] = useState(0);
    const [receive, setReceive] = useState(0);
    useEffect(() => {
        setTitle('Withdraw');
    });

    const onChangeHandler = (e) => {
        const walletCopy = [...wallet];
        const usdt = walletCopy.filter(i => i.id == 'tether');
        if(parseFloat(fiat) > 0)
        {
            if(parseFloat(fiat) > parseFloat(amount))
            {
                usdt[0].amount = parseFloat(fiat) - (parseFloat(amount) * parseFloat(usdtPrice));
                setWallet(walletCopy);
                setDollar(parseFloat(dollar) + parseFloat(receive));
            }
        }
        
    }

    return (
        <div className="bg-white py-2 px-4 my-4 mr-6 shadow-md rounded-md w-full">
            <h3 className="text-2xl font-bold">Withdraw Form</h3>
            <br />
            <div className="flex flex-row justify-start items-start">
                <div className="w-1/5">
                    <InputField
                        className=""
                        type="number"
                        label="Amount"
                        name="Amount"
                        value={amount}
                        onChange={(e) => {
                            const input = e.target.value.length > 0 ? e.target.value : 0;
                            setAmount(input);
                            setReceive(parseFloat(fiat) > 0 ? parseFloat(input) / parseFloat(usdtPrice) : 0);
                        }}
                    />
                    <button className="bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md shadow w-full mt-4" onClick={onChangeHandler}>Withdraw Amount</button>
                </div>
                <div className="w-auto px-12 text-left w-4/5">
                    <p>Conversion:</p>
                    <p className="font-bold text-2xl">{usdtPrice} USDT = 1 USD</p><br/>
                    <p>Your crypto wallet:</p>
                    <p className="font-bold text-2xl">{fiat} USDT</p><br/>
                    <p>You will receive:</p>
                    <p className="font-bold text-2xl">{receive} USD</p><br/>
                </div>
            </div>
        </div>
    )
}
