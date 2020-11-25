import React from 'react'
import {Link} from 'react-router-dom'


export default ({link, title, image, extras}) => {
    return (
        <>
            <Link to={link}>
                <div className="w-full flex flex-col items-center w-full h-full relative">
                    <img src={image} alt=""
                         className="h-96 w-auto md:h-64 lg:h-96 object-cover rounded-md shadow-md"/>
                    <h5 className="whitespace-pre-wrap font-semibold mt-1 text-lg text-gray-700 uppercase mx-4 sm:mx-1">{title}</h5>
                    <div className="extras my-2 flex items-end w-full text-white text-xs absolute top-0 left-0 flex flex-col">
                        {extras.format ? <span className="px-2 py-1 bg-green-500  rounded-md my-1">{extras.format}</span> : null}

                        {extras.characters?.available > 0 ?
                            <span className="px-2 py-1 bg-red-500 rounded-md my-1">{extras.characters.available} characters</span> : null}
                    </div>
                </div>
            </Link>

        </>
    )
}