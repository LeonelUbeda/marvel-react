import {useState, useEffect} from 'react'
import useFetch from "./useFetch"


const useMarvelFetch = (url, options={}) => {

    const {error, response, isLoading} = useFetch(url, options)
    const [elements, setElements] = useState(null)
    const [total, setTotal] = useState(null)


    useEffect(() => {
        if (response){
            console.log(response, error)
            setElements(response.data.results)
            setTotal(response.data.total)
        }
    }, [error, response])

    return {
        error,
        elements,
        total,
        isLoading
    }
};


export default useMarvelFetch