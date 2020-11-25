import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AnimateHeight from "react-animate-height"
import SimpleArrow from "./SimpleArrow"


export default ({title, items}) => {
    const [show, setShow] = useState(false)

    return (
        <div>
            <h6 className="cursor-pointer text-blue-500 font-semibold" onClick={() => setShow(!show)}>
                {title}
                <span className="mx-2">
                    <SimpleArrow isUp={!show} sizeClassName="w-5"/>
                </span>
            </h6>
            <AnimateHeight height={show ? 'auto' : 0}>
                <div className="mt-3 divide-gray-300 divide-y">
                    {items.map(item => (
                        <div className="flex justify-between py-2">
                            <h6 className="font-medium text-gray-600">
                                {item.title}
                            </h6>
                            <Link to={item.link}>
                                <span className="text-red-600 mx-2 whitespace-no-wrap">see more</span>
                            </Link>
                        </div>

                    ))}
                    {items.length === 0 ?
                        <h6 className="text-red-600">No related items found</h6>
                    : null }
                </div>
            </AnimateHeight>
        </div>
    )
}