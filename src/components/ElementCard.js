import React from 'react'
import {Link} from 'react-router-dom'


export default ({link, title, image}) => {
    return (
        <>
            <Link to={link}>
                <div className="w-full flex flex-col items-center w-full h-full">
                    <img src={image} alt=""
                         className="h-56 w-40 object-cover rounded-md"/>
                    <h5 className="whitespace-pre-wrap font-medium mt-1">{title}</h5>
                </div>
            </Link>

        </>
    )
}