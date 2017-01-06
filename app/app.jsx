var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');

//import './../playground/firebase/index';

/*ESTO ES SOLO PARA TRABAJAR CON LOCALSTORE:
store.subscribe(() => {
	var state = store.getState();
	console.log('New state', state);
	TodoAPI.setTodos(state.todos);
});

var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));*/

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
   <Provider store={store}>{/*damos acceso a todos los componentes hijos al store*/}
   		<TodoApp/>
   </Provider>,

  document.getElementById('app')
);
