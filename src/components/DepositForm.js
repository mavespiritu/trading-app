import { wait } from '@testing-library/dom';
import React from 'react';
import { useState, useEffect } from 'react';
import InputField from './InputField';

export default function DepositForm({usdtPrice, fiat, wallet, setWallet, title, setTitle}) {
    const [amount, setAmount] = useState(0);
    const [receive, setReceive] = useState(0);
    useEffect(() => {
        setTitle('Deposit');
    });

    const onChangeHandler = (e) => {
        const walletCopy = [...wallet];
        const usdt = walletCopy.filter(i => i.id == 'tether');
        usdt[0].amount = parseFloat(fiat) + (parseFloat(amount) * parseFloat(usdtPrice));
        setWallet(walletCopy);
    }

    return (
        <div className="bg-white py-2 px-4 my-4 mr-6 shadow-md rounded-md w-full">
            <h3 className="text-2xl font-bold">Deposit Form</h3>
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
                            setReceive(parseFloat(input) * parseFloat(usdtPrice));
                        }}
                    />
                    <button className="bg-green-500 py-2 px-4 rounded-md shadow w-full mt-4" onClick={onChangeHandler}>Deposit Amount</button>
                </div>
                <div className="w-auto px-12 text-left w-4/5">
                    <p>Conversion:</p>
                    <p className="font-bold text-2xl">1 USD = {usdtPrice} USDT</p><br/>
                    <p>You will receive:</p>
                    <p className="font-bold text-2xl">{receive} USDT</p><br/>
                    <p>Your crypto wallet:</p>
                    <p className="font-bold text-2xl">{fiat} USDT</p>
                </div>
            </div>
        </div>
    )
}
