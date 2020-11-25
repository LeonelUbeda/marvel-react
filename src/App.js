import React, {useContext, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import localforage from "localforage"
import './tailwind.css'
import {StateProvider, store} from './store'
import Home from "./pages/Home"
import Comics from "./pages/Comics"
import ComicDetail from "./pages/ComicDetail"
import Characters from "./pages/Characters"
import Nav from "./layout/Nav"
import CharacterDetail from "./pages/CharacterDetail"
import Favorites from "./pages/Favorites"



function Main() {
    const {dispatch} = useContext(store)

    useEffect(() => {
        function getItemsFromLocal(){
            let temp = []
            localforage.iterate((value) => {
                temp.push(value)
            }).then(() => {
                console.log(temp)
                dispatch({type: 'INITIALIZE', payload: temp})
            })
        }
        getItemsFromLocal()
    }, [])

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/comics" exact component={Comics}/>
                    <Route path="/comics/:id" exact component={ComicDetail}/>
                    <Route path="/characters" exact component={Characters}/>
                    <Route path="/characters/:id" exact component={CharacterDetail}/>
                    <Route path="/saved" exact component={Favorites}/>
                </Switch>
            </div>
            <div className="fixed inset-x-0 bottom-0 container mx-auto">
                <Nav />
            </div>
        </Router>
    );
}

function App() {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    )
}

export default App;
