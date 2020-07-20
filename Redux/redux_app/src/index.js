import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = ['Smells like spirit', 'Sandman']

function playList(state = initialState, action) {
    if(action.type === 'ADD_TRACK'){
       return [
            ...state,
            action.payload
       ]
    }
    return state;
}

const store = createStore(playList, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

ReactDOM.render(
    <Provider store = { store }>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();


/*  import { createStore } from 'redux';


 function playList(state = [], action) {
     if(action.type === 'ADD_TRACK'){
        return [
             ...state,
             action.payload
        ]
     }
     return state;
 }

 const store = createStore(playList);
 const list = document.querySelector('.list');
 const trackInput = document.querySelector('.trackInput');


 store.subscribe( ()=>{
    list.innerHTML = '';
    trackInput.value = ''
    store.getState().forEach(elem => {
        let li = document.createElement('li');
        li.textContent = elem;
        list.appendChild(li);
    })
 });

 
 const addTrackBtn = document.querySelector('.addTrack');
 
 addTrackBtn.addEventListener('click', ()=>{
     const trackName = trackInput.value;
     store.dispatch( { type: 'ADD_TRACK', payload: trackName} );
 })
 */