import React from 'react';
import {Link} from 'react-router-dom';

export default function CryptoRow({crypto, color}) {
    const {id, name, image, current_price, price_change_percentage_24h, high_24h, low_24h, market_cap, total_volume, symbol, market_cap_rank} = crypto;
    return (
        <tr className="hover:bg-gray-100 h-16 p-4">
            <td className="text-left">{market_cap_rank}</td>
            <td className="text-left">
                <div className="flex flex-row items-between justify-start">
                    <div><img src={image} alt={name} className="h-8 w-8 mr-4" /></div>
                    <div><p>{name}</p></div>
                </div>
            </td>
            <td className="text-left uppercase">{symbol}</td>
            <td className={color}>{(current_price).toFixed(2)}</td>
            <td className={color}>{price_change_percentage_24h}%</td>
            <td className="text-right text-green-500">{(high_24h).toFixed(2)}</td>
            <td className="text-right text-red-500">{(low_24h).toFixed(2)}</td>
            <td className="text-right">{market_cap}</td>
            <td className="text-right">{total_volume}</td>
            <td className="text-right"><Link className="border-gray-200 border-1 text-yellow-400 py-2 px-4 hover:bg-yellow-400 hover:text-black rounded shadow" to={'/trade/' + id} key={id}>Trade</Link></td>
        </tr>
    )
}
