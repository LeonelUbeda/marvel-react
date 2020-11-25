import React from 'react'
import { useHistory } from 'react-router-dom'
export default () => {
    let history = useHistory()
    return (
        <div className="mt-20 px-20">
            <h1 className="text-center bg-red-500 font-bold text-white py-4 rounded-md">Not found!</h1>
            <h3 className="text-center font-bold text-green-500 py-2 text-xl" onClick={() => history.goBack()}>Go back</h3>
        </div>
    )
}