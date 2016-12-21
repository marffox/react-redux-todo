import * as redux from 'redux';//redux no tienen ningun default import por ello importamos todas las propiedades de redux en la variable redux de esta forma.
import thunk from 'redux-thunk';

/*A thunk is a function that wraps an expression to delay its evaluation.*/
/*Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.*/

import {searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
	    window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}