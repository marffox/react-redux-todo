//var uuid = require('node-uuid');//genera id aleatorios y unicos para usarlos como identificadores de cada todo en este caso
import moment from 'moment';

export var searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_SEARCH_TEXT':
			return action.searchText;
		default:
			return state;
	};
};

export var showCompletedReducer = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_SHOW_COMPLETED':
			return !state;
		default:
			return state;
	}
};

export var todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				action.todo
			];
		case 'ADD_TODOS':
			return [
				...state,
				...action.todos
			];
		case 'UPDATE_TODO':
			return state.map((todo) => {
				if (todo.id === action.id) {
					return {
						...todo,
						...action.updates//cuando ponemos un ... a continuacion de otro, este ultimo va a sobreescribir todas las propiedades del primero
					}
				} else {
					return todo;
				};
			});
		case 'DELETE_TODO':
			return state.filter(todo => todo.id !== action.id);
		case 'LOGOUT':
			return [];
		default:
			return state;
	}
};

export var authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	};
};