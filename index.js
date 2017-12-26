import './styles.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
  .then(function(reg){
    console.log('Successfully registered service worker', reg);
  })
  .catch(function(err) {
    console.warn('Error whilst registering service worker', err);
  });
}

ReactDOM.render(<App />, 
  document.getElementById('root'));