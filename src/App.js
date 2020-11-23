import './tailwind.css'
import Home from "./pages/Home"
import Comics from "./pages/Comics"
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
            <div className="app container mx-auto max-w-md">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/comics" exact component={Comics}/>
                </Switch>
            </div>
            <div className="fixed inset-x-0 bottom-0">
                <Nav />
            </div>
        </Router>

    );
}

export default App;
