import './tailwind.css'
import Home from "./pages/Home"
import Comics from "./pages/Comics"
import ComicDetail from "./pages/ComicDetail"
import React from 'react'
import Nav from "./layout/Nav"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";



function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/comics" exact component={Comics}/>
                    <Route path="/comics/:id" exact component={ComicDetail}/>
                </Switch>
            </div>
            <div className="fixed inset-x-0 bottom-0 container mx-auto">
                <Nav />
            </div>
        </Router>

    );
}

export default App;
