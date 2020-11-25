import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useMarvelFetch from '../hooks/useMarvelFetch'
import {buildCharacterDetail} from '../utils/urlBuilders'
import SectionHeader from "../layout/SectionHeader"
import LoadingAnimation from "../components/LoadingAnimation"
import DisplayPrices from "../components/DisplayPrices"
import ErrorMessage from "../components/ErrorMessage"
import GenericRelatedItems from "../components/GenericRelatedItems"

export default () => {
    const { id } = useParams()
    const [element, setElement] = useState(null)
    const {elements, error, isLoading, statusCode} = useMarvelFetch(buildCharacterDetail(id))
    const [relatedComics, setRelatedComics] = useState(null)
    const [relatedStories, setRelatedStories] = useState(null)

    useEffect(() => {
        if (statusCode === 200){
            if (!isLoading && elements){
                let temp = elements[0]
                const { comics, stories } = temp
                setElement(temp)
                setRelatedStories(stories.items.map(e => ({title: e.name, link: `/series/${e.resourceURI.split("/series/")[1]}`})))
                setRelatedComics(comics.items.map(e => ({title: e.name, link: `/comics/${e.resourceURI.split("/comics/")[1]}`})))

            }
        }

    }, [isLoading, elements])

    return (
        <>
            <SectionHeader>
                <h3 className="text-2xl font-bold py-2 text-gray-100">Comic Detail</h3>
            </SectionHeader>
            <div className="container mx-auto pb-20">

                {!isLoading && statusCode !== 200?
                    <ErrorMessage title={statusCode === 404 ? 'Not Found' : 'Application Error'} actionLink={"/"} actionTitle="Go home"/>
                : null}

                {isLoading ? <LoadingAnimation /> : null}

                {element && !isLoading ?
                    <div className="flex flex-col px-1 mt-4 md:flex-row md:items-start md:justify-center md:mx-auto">
                        <img src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                             className="h-96 object-cover rounded-md shadow-md md:w-3/6" />

                        <div className="my-2 mx-3 md:ml-10 md:w-3/6">
                            <h1 className="text-xl uppercase font-bold text-gray-700 my-2">{element.name}</h1>

                            {element.description ?
                                <p>{element.description}</p>
                            :
                                <h2 className="font-semibold text-xl text-red-500">No description!</h2>
                            }

                            {element.prices && element.prices.length > 0 ?
                                <div className="my-2">
                                    <h2 className="text-gray-600 font-semibold">Price</h2>
                                    <DisplayPrices prices={element.prices}/>
                                </div>
                            : null}

                            <div className="my-2">
                                <GenericRelatedItems
                                    items={relatedStories}
                                    title="See related stories"/>
                            </div>

                            <div className="my-2">
                                <GenericRelatedItems
                                    items={relatedComics}
                                    title="See related comics"/>
                            </div>
                        </div>

                    </div>

                : null}
            </div>
        </>
    )
}