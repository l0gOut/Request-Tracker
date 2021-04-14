import LeftMenu from './components/leftMenu/LeftMenu';
import Header from './components/header/Header';
import Menu from './components/menu/Menu'
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
    <div className='leader-menu'>
      <Header/>
      <LeftMenu templateChange={templateChange} createTemplate={createTemplate}/>
      <Menu templateData={template} templateChange={templateChange}/>
    </div>
  );
}

export default App;
