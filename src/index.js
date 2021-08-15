import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {createStore} from "redux";
import {Provider} from 'react-redux';
import taskReducer from './reducers/taskReducer';


if(localStorage.getItem('tasks')=== null){
  localStorage.setItem('tasks',JSON.stringify([]))
}
    
let intialState ={
  currentIndex:-1,
  list:JSON.parse(localStorage.getItem('tasks'))
  
}

let store = createStore(taskReducer,intialState) 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
