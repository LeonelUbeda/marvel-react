import React from "react"
import {nanoid} from 'nanoid'


const TYPES = {
    'printPrice': 'Print'
}

export default ({prices}) => {
    return (
        <div className="w-full flex flex-wrap ">
            {prices.map(price =>
                <span className="text-gray-700 mr-3" key={nanoid(5)}>
                    {TYPES[price.type] ? TYPES[price.type] : null} <span className="text-teal-700">${price.price}</span></span>
            )}
        </div>
    )
}