import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/';//si el fichero se llama index.js pordemos omitirlo

export var setSearchText = (searchText) => {
	return {
		type: 'SET_SEARCH_TEXT',
		searchText
	}
};

export var toggleShowCompleted = () => {
	return {
		type: 'TOGGLE_SHOW_COMPLETED'
	}
};

export var addTodo = (todo) => {
	return {
		type: 'ADD_TODO',
		todo
	}
};
//los actions generatos devuelven siempre un objeto y para trabajar con firebase de forma asincrona, necesitamos que devuelva una funcion en lugar de un objeto. Una funcion en la que pueda usar el dispatch cuando lo necesite.
export var startAddTodo = (text) => {
	return (dispatch, getState) => {
		var todo = {
			text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: null
		};
		var todoRef = firebaseRef.child('todos').push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});
	}
}

export var addTodos = (todos) => {
	return {
		type: 'ADD_TODOS',
		todos
	}
};

export var toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	}
};