import moment from 'moment';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';//si el fichero se llama index.js pordemos omitirlo

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

/*Hay que transformar los datos traidos de la bbdd en validos para la aplicacion:
Firebase los siver asi:
var todos =  {
	'id123456': {
		text: 'lo que sesa',
		...,
		...
	},
	'id838394': {
		text: 'otro lo que sea',
		...
	}
}
y nosotros lo queremos asi:
[{
	id: '123456',
	text: 'lo que sea',
	...,
	...
}]*/
export var startAddTodos = () => {
	return (dispatch, getState) => { //the thunk fuction
		var todosRef = firebaseRef.child('todos');

		return todosRef.once('value').then((snapshot) => {//snapshot contiene toda la informacion de la bbdd que necesito, pero me interesan los values and keys
			var todos = snapshot.val() || {}; //obtengo los datos y si no hay datos un objeto vacio
			var parsedTodos = [];//esto es lo que le pasare a redux, que es lo que espera un array de objetos

			Object.keys(todos).forEach((todoId) => {
				parsedTodos.push({
					id: todoId,
					...todos[todoId]
				});
			});

			dispatch(addTodos(parsedTodos));
		});
	};
};

export var updateTodo = (id, updates) => {
	return {
		type: 'UPDATE_TODO',
		id,
		updates
	}
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child(`todos/${id}`);//es lo mismo que ('todos/' + id)
		var updates = {
			completed,
			completedAt: completed ? moment().unix() : null
		};

		return todoRef.update(updates).then(() => {
			dispatch(updateTodo(id, updates));
		});
	}
};

export var login = (uid) => {
	return {
		type: 'LOGIN',
		uid
	};
};

export var startLogin = () => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(githubProvider).then((result) => {
			console.log('Auth worked', result);
		}, (error) => {
			console.log('Unable to auth', error);
		});
	}
};

export var logout = () => {
	return {
		type: 'LOGOUT'
	};
};

export var startLogout = () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(() => {
			console.log('Logged out!!');
		});
	}
};