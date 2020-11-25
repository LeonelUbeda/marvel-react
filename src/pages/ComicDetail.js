import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useMarvelFetch from '../hooks/useMarvelFetch'
import {buildComicDetailURL} from '../utils/urlBuilders'
import SectionHeader from "../layout/SectionHeader"
import NotFoundMessage from "../components/NotFoundMessage"
import LoadingAnimation from "../components/LoadingAnimation";
import DisplayPrices from "../components/DisplayPrices";

export default () => {
    const { id } = useParams()
    const [element, setElement] = useState(null)
    const {elements, error, isLoading, statusCode} = useMarvelFetch(buildComicDetailURL(id))

    useEffect(() => {
            if (statusCode === 200){
                if (!isLoading && elements){
                    console.log(elements[0].thumbnail.path)
                    setElement(elements[0])
                }
            }

    }, [isLoading, elements])

    return (
        <>
            <SectionHeader>
                <h3 className="text-3xl font-bold py-2 text-gray-100">Comic Detail</h3>
            </SectionHeader>
            <div className="container mx-auto pb-20 ">
                {statusCode === 404 ? <NotFoundMessage /> : null}
                {error ? <h1 >Error</h1> : null}
                {isLoading ? <LoadingAnimation /> : null}
                {element && !isLoading ?
                    <div className="flex flex-col items-center mt-4 md:flex-row md:items-start md:justify-center md:max-w-3xl md:mx-auto">
                        <img src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                             className="h-96 object-cover rounded-md shadow-md"
                             alt=""/>
                        <div className="my-2 mx-3">
                            <h1 className="text-xl uppercase font-bold text-gray-700 my-2">{element.title}</h1>

                            {element.description ?
                                <p>{element.description}</p>
                            :
                                <h2 className="font-semibold text-xl text-red-500">No description!</h2>
                            }

                            {element.prices.length > 0 ?
                                <div className="my-2">
                                    <h2 className="text-gray-600 font-semibold">Price</h2>
                                    <DisplayPrices prices={element.prices}/>
                                </div>
                            : null}
                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}