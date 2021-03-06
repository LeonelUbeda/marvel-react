import React, {useContext} from 'react'
import SectionHeader from "../layout/SectionHeader"
import {nanoid} from "nanoid"
import {store} from "../store"
import GenericMessage from "../components/GenericMessage"
import ElementCard from "../components/ElementCard"


export default () => {
    const {state: favoriteItems, dispatch} = useContext(store)
    return (
        <>
            <SectionHeader>
                <h3 className="text-2xl font-bold py-2 text-gray-100">Favorites</h3>
            </SectionHeader>
            <>
                {favoriteItems.length === 0 ?
                    <GenericMessage title="No elements" subTitle="Try a adding items"/>
                : null}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8 px-2 mt-4 container mx-auto py-5">
                    {favoriteItems.map(element => {
                            return (
                                <ElementCard key={nanoid()} image={element.thumbnail}
                                             link={element.link} title={element.title} extras={[{className: 'bg-green-500', title: element.type}]} />
                            )
                        }
                    )}
                </div>


            </>
        </>
    )
}