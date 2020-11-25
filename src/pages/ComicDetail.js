import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useMarvelFetch from '../hooks/useMarvelFetch'
import {buildComicDetailURL} from '../utils/urlBuilders'
import SectionHeader from "../layout/SectionHeader"
import LoadingAnimation from "../components/LoadingAnimation"
import DisplayPrices from "../components/DisplayPrices"
import ErrorMessage from "../components/ErrorMessage"
import ComicDate from "../components/comics/ComicDate"
import {nanoid} from "nanoid";
import GenericRelatedItems from "../components/GenericRelatedItems";

export default () => {
    const { id } = useParams()
    const [element, setElement] = useState(null)
    const {elements, error, isLoading, statusCode} = useMarvelFetch(buildComicDetailURL(id))
    const [relatedCharacters, setRelatedCharacters] = useState(null)
    useEffect(() => {
            if (statusCode === 200){
                if (!isLoading && elements){
                    setElement(elements[0])
                    setRelatedCharacters(elements[0].characters.items.map(e => ({title: e.name, link: `/characters/${e.resourceURI.split("/characters/")[1]}`})))
                }
            }

    }, [isLoading, elements])

    return (
        <>
            <SectionHeader>
                <h3 className="text-2xl font-bold py-2 text-gray-100">Comic Detail</h3>
            </SectionHeader>
            <div className="container mx-auto pb-20 ">

                {!isLoading && statusCode !== 200?
                    <ErrorMessage title={statusCode === 404 ? 'Not Found' : 'Application Error'} actionLink={"/"} actionTitle="Go home"/>
                : null}

                {isLoading ? <LoadingAnimation /> : null}

                {/* MAIN ELEMENT */}
                {element && !isLoading && statusCode === 200?
                    <div className="flex flex-col items-center mt-4 md:flex-row md:items-start md:justify-center md:mx-auto">

                        <img src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                             className="h-96 object-cover rounded-md shadow-md"
                             alt=""/>

                        <div className="my-2 mx-3 md:ml-10 md:w-3/6">

                            <h1 className="text-xl uppercase font-bold text-gray-700 my-2">{element.title}</h1>

                            <div className="text-lg text-gray-700 font-semibold my-2">

                                <h3 className="text-red-500">Details</h3>

                                <div className="text-sm grid grid-cols-1 md:grid-cols-2">

                                    {element.pageCount ?
                                        <h5 className="mb-2">Pages: <span className="text-teal-500">{element.pageCount}</span></h5>
                                    : null}

                                    {element.issueNumber && element.issueNumber !== "" ?
                                        <h5 className="mb-2">Issue number: <span className="text-green-500">{element.issueNumber}</span></h5>
                                    : null}

                                    {element.format ?
                                        <h5 className="mb-2">Format: <span className="text-green-500">{element.format}</span></h5>
                                    : null}

                                    {element.dates ?
                                        <>
                                            {element.dates.map(e => <ComicDate type={e.type} date={e.date} key={nanoid(5)}/>)}
                                        </>
                                    : null}

                                </div>
                            </div>

                            {element.prices.length > 0 ?
                                <div className="my-2">
                                    <h2 className="text-red-500 font-semibold">Price</h2>
                                    <DisplayPrices prices={element.prices}/>
                                </div>
                            : null}

                            {element.description ?
                                <>
                                    <h3 className="text-red-500 font-semibold">Description</h3>
                                    <p>{element.description}</p>
                                </>
                            :
                                <h2 className="font-semibold text-xl text-red-500">No description!</h2>
                            }
                            <div className="mt-4">
                                <GenericRelatedItems
                                    items={relatedCharacters}
                                    title="See related characters"/>
                            </div>
                        </div>

                    </div>

                : null}
            </div>
        </>
    )
}