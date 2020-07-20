import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(playList);

const initialState = ['Test']

function playList(state = initialState, action){
    if(action.type === 'ADD_TRACK'){
        return [
            ...state,
            action.payload
        ]
    }
    return state;
}

ReactDOM.render(<Provider store = { store }>
                    <App />
                </Provider>, document.getElementById('root'));

serviceWorker.unregister();
