var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import router from 'app/router/';
import firebase from 'app/firebase/';
// var TodoAPI = require('TodoAPI');

//import './../playground/firebase/index';

/*ESTO ES SOLO PARA TRABAJAR CON LOCALSTORE:
store.subscribe(() => {
	var state = store.getState();
	console.log('New state', state);
	TodoAPI.setTodos(state.todos);
});

var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));*/

//parametro user: si hay user el state es login y si no es que es logout
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(actions.login(user.uid));
		store.dispatch(actions.startAddTodos());
		hashHistory.push('/todos');
	} else {
		store.dispatch(actions.logout());
		hashHistory.push('/');
	}
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
	<Provider store={store}>{/*damos acceso a todos los componentes hijos al store*/}
		{router}
	</Provider>,
	document.getElementById('app')
);
