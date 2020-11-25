import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import ElementCard from "../components/ElementCard"
import Pagination from "../components/Pagination"
import useMarvelFetch from "../hooks/useMarvelFetch"
import { buildComicsURL } from '../utils/urlBuilders'
import { nanoid } from 'nanoid'
import DynamicFilter from "../components/DynamicFilter"
import SectionHeader from "../layout/SectionHeader"
import LoadingAnimation from "../components/LoadingAnimation"



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LIMIT = 20

const FILTERS = [
    {
        label: 'Order by',
        type: 'select',
        value: 'orderBy',
        options: [
            {value: null, label: 'All'},
            {value: 'issueNumber', label: 'Issue Number (ascendent)'},
            {value: '-issueNumber', label: 'Issue Number (descending)'},
        ]
    },
    {
        label: 'Comic Format',
        type: 'select',
        value: 'format',
        options: [
            {value: null, label: 'All'},
            {value: 'comic', label: 'Comic'},
            {value: 'magazine', label: 'Magazine'},
            {value: 'trade paperback', label: 'Trade Paperback'},
            {value: 'hardcover', label: 'Hardcover'},
            {value: 'digest', label: 'Digest'},
            {value: 'graphic novel', label: 'Graphic Novel'},
            {value: 'digital comic', label: 'Digital Comic'},
            {value: 'infinite comic', label: 'Infinite Comic'}
        ]
    }
]

export default () => {
    let query = useQuery()
    const [filters, setFilters] = useState({})
    const [apiURL, setApiURL] = useState('')
    const [selectedPage, setSelectedPage] = useState(parseInt(query.get('page')))
    const {response, error, isLoading, elements, total, pagesQuantity} = useMarvelFetch(apiURL, {})
    const [isFilterHidden, setIsFilterHidden] = useState(true)


    function handlePageClick({selected}){
        setSelectedPage(selected)
    }

    function toggleIsFilterHidden(){
        setIsFilterHidden(!isFilterHidden)
    }

    function filterChangeHandler(newFilterObject){
        setFilters(newFilterObject)
    }

    // change apiURL if filters or page changes
    // if apiURL changes, useMarvelFetch will make a request with the new url
    useEffect(() => {
        setApiURL(buildComicsURL({...filters, limit: LIMIT, offset: LIMIT * selectedPage}))
    }, [filters, selectedPage])


    return (
        <div className="">
            <SectionHeader>
                <h3 className="text-3xl font-bold py-2 text-gray-100">Comics</h3>
                <h3 className="text-xl font-bold py-2 text-gray-100 cursor-pointer" onClick={toggleIsFilterHidden}>Filters
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 inline transition duration-200 ease-in-out transform ${!isFilterHidden ? 'rotate-180' : null}`}
                              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                             stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <line x1="12" y1="5" x2="12" y2="19"/>
                              <line x1="18" y1="11" x2="12" y2="5"/>
                              <line x1="6" y1="11" x2="12" y2="5"/>
                        </svg>
                    </span>
                </h3>
            </SectionHeader>

            <div className="container mx-auto px-2">
                <DynamicFilter filters={FILTERS} filterChangeHandler={filterChangeHandler} hidden={isFilterHidden}/>
            </div>

            {/*Loading animation*/}
            {isLoading ?
                <LoadingAnimation />
            : null}

            <div className="container mx-auto py-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8 px-2">
                    {elements && !isLoading ?
                        <>
                            {elements.map(element =>
                                <ElementCard key={nanoid()} image={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                                             link={"/comics/"+element.id} title={element.title}
                                             extras={{characters: element.characters, format: element.format}}
                                />
                            )}
                        </>
                        : null}

                    { error ? <h1>Error!</h1> : null}
                </div>
                {!isLoading ?
                    <div className="container mx-auto pb-20 py-10">
                        <Pagination handlePageClick={handlePageClick} pagesQuantity={pagesQuantity} selectedPage={selectedPage}/>
                    </div> : null}
            </div>


        </div>

    )
}
