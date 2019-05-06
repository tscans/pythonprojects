import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import RunCode from './components/RunCode.jsx';
import OpenCV from './components/OpenCV.jsx';

class App extends React.Component {
    
    render() {
        return (
            <Router>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/runcode" exact component={RunCode} />
                <Route path="/opencv" exact component={OpenCV} />
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));