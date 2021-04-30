import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './component/NavigationBar'
import React from 'react';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path='/' component={() => <h1>Hello World!</h1>}/>
        <Route component={() => <div><h1>HTTP Not Found!</h1></div>}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
