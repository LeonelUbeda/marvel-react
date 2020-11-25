import React from 'react'
import {Link} from 'react-router-dom'


export default ({src, link, title, className=""}) => {
    return (
        <>
            <Link to={link}>
                <div className="relative h-32 md:h-full w-full">
                    <div className="w-full h-full bg-black opacity-25 absolute  rounded-xl"></div>
                    <h3 className="text-2xl font-bold absolute text-white ml-4 mt-2 text-shadow-lg z-10">{title}</h3>
                    <img src={src} className="h-full w-full object-cover border-lg rounded-xl transition duration-500 hover:scale-150"/>
                </div>
            </Link>

        </>
    )
}