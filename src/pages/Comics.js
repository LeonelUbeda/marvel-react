import React, {useEffect} from 'react'
import SectionCard from "../components/SectionCard";
import useFetch from "../hooks/useFetch";
import {API_KEY, BASE_URL} from "../constants";
import ElementCard from "../components/ElementCard";
import ReactPaginate from 'react-paginate'
import useMarvelFetch from "../hooks/useMarvelFetch";



export default () => {
    const {response, error, isLoading, elements, total} = useMarvelFetch(`${BASE_URL}/comics?orderBy=-onsaleDate&apikey=${API_KEY}`, {})

    useEffect(() => {
        console.log(elements, 'hey')
    }, [elements])

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold px-4 py-2">Comics</h1>
            </div>
            <div className="mx-2 grid grid-cols-2 gap-x-4 gap-y-4">
                {isLoading ? <h1>Cargando!</h1> : null}
                {elements ?
                    <>
                        {elements.map(element =>
                            <ElementCard image={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                             link={"/hey"} title={element.title}/>
                        )}
                    </>
                : null}


                { error ? <h1>Error!</h1> : null}
            </div>
            <ReactPaginate pageCount={20}/>
        </>

    )
}
