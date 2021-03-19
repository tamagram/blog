import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./layout";
import Summary from "./pages/summary";
import About from "./pages/about";
import Article from "./pages/article";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Route exact path="/blog/" component={Summary}></Route>
        <Route exact path="/blog/about" component={About}></Route>
        <Route exact path="/blog/article/:articleDirname" component={Article}></Route>
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
