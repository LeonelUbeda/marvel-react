import React from "react"
import {nanoid} from 'nanoid'


const TYPES = {
    'printPrice': 'Print'
}

export default ({prices}) => {
    return (
        <div className="w-full flex flex-wrap ">
            {prices.map(price =>
                <span className="text-teal-500 mr-3" key={nanoid(5)}>
                    {TYPES[price.type] ? TYPES[price.type] : null} ${price.price}</span>
            )}
        </div>
    )
}