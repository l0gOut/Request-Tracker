import LeftMenu from './view/main-window/components/leftMenu/LeftMenu';
import Header from './view/main-window/components/header/Header';
import Menu from './view/main-window/components/menu/Menu';
import Main from './view/join-window/components/main/Main';
import { BrowserRouter, Switch ,Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GET_ALL_TEMPLATES } from './query/user';
import { useQuery } from '@apollo/client';
import './App.css';


function App() {

  let {data, loading} = useQuery(GET_ALL_TEMPLATES);
  let [template, setTemplate] = useState([]);

  let templateBlock = document.querySelector('.show-templates');
  let applicationBlock = document.querySelector('.create-application');

  function templateChange() {
      templateBlock.style.opacity = 1;
      templateBlock.style.pointerEvents = 'initial';
      
      applicationBlock.style.opacity = 0;
      applicationBlock.style.pointerEvents = 'none';
  }

  function createTemplate() {
      applicationBlock.style.opacity = 1;
      applicationBlock.style.pointerEvents = 'initial';

      templateBlock.style.opacity = 0;
      templateBlock.style.pointerEvents = 'none';
  }

  useEffect(() => {
    if (!loading) {
      setTemplate(data.getAllApplicationTemplates);
    }
  }, [data, loading, setTemplate])

  return (
    <BrowserRouter>
      <div className='leader-menu'>
        <Switch>
          <Route exact path='/join'>
              <Main/>
          </Route>
          <Route exact path='/'>
            <Header/>
            <LeftMenu templateChange={templateChange} createTemplate={createTemplate}/>
            <Menu templateData={template} templateChange={templateChange}/>
          </Route>
          <Route component={() => {
            return (
              <div className='not-found-block'>
                <h1>404</h1>
                <h1>Not Found!</h1>
              </div>
            )
          }}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
