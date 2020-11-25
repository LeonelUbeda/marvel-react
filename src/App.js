import './tailwind.css'
import Home from "./pages/Home"
import Comics from "./pages/Comics"
import ComicDetail from "./pages/ComicDetail"
import Characters from "./pages/Characters"
import { StateProvider } from './store'
import React from 'react'
import Nav from "./layout/Nav"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import CharacterDetail from "./pages/CharacterDetail";



function App() {
    return (
        <Router>
            <StateProvider>
                <div className="app">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/comics" exact component={Comics}/>
                        <Route path="/comics/:id" exact component={ComicDetail}/>
                        <Route path="/characters" exact component={Characters}/>
                        <Route path="/characters/:id" exact component={CharacterDetail}/>
                    </Switch>
                </div>
            </StateProvider>
            <div className="fixed inset-x-0 bottom-0 container mx-auto">
                <Nav />
            </div>
        </Router>

    );
}

export default App;
