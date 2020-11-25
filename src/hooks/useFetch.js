import {useState, useEffect} from 'react'




const useFetch = (url, options={}) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!url) return;
        setIsLoading(true)
        const fetchData = async () => {
            try{
                const res = await fetch(url, options)
                const json = await res.json()
                setResponse(json)
            }catch (error){
                setError(error)
            }finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { response, error, isLoading }
};


export default useFetch