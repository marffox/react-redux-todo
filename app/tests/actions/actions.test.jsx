import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
import * as actions from 'actions';

//A mock store for testing your redux async action creators and middleware. The mock store will store the dispatched actions in an array to be used in your tests.
//Debemos usar un mockStore por cada test, no se debe compartir este entre varios tests
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
	it('Should generate searcht text action', () => {
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText: 'Some search text'
		};
		var res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it('Should generate toggle show completed action', () => {
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};
		var res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it('Should generate add todo action', () => {
		var action = {
			type: 'ADD_TODO',
			todo: {
				id: '123abc',
				text: 'lo que sea',
				completed: false,
				createdAt: 0
			}
		};
		var res = actions.addTodo(action.todo);

		expect(res).toEqual(action);
	});

	it('Should create todo and dispatch ADD_TODO', (done) => {//si trabajamos de forma asincrona, usamos done para indicar a karma que no deje de escuchar cuando termine el test, solo hasta que llamemos a done().
		const store = createMockStore({});
		const todoText = 'My todo item';

		store.dispatch(actions.startAddTodo(todoText)).then(() => {
			const actions = store.getActions();//retorna un array con todos los actions de mock store

			expect(actions[0]).toInclude({
				type: 'ADD_TODO'
			});
			expect(actions[0].todo).toInclude({
				text: todoText
			});
			done();//termina el test
		}).catch(done);
	});

	it('Should generate add todos action object', () => {
		var todos = [{
			id: '111',
			text: 'lo que sea',
			completed: false,
			createdAt: 22000,
			completedAt: false
		}];
		var action = {
			type: 'ADD_TODOS',
			todos
		};
		var res = actions.addTodos(todos);

		expect(res).toEqual(action);
	});

	it('Should generate update to do action', () => {
		var action = {
			type: 'UPDATE_TODO',
			id: 1,
			updates: {completed: false}
		};
		var res = actions.updateTodo(action.id, action.updates);

		expect(res).toEqual(action);
	});

	describe('Tests with firebase Todos', () => {
		var testTodoRef;

		//beforeEach (async test from mocha) se ejecuta antes de cada uno de los unit test
		//creamos un todo y lo guardamos en firebase
		beforeEach((done) => {
			var todosRef = firebaseRef.child('todos');

			todosRef.remove().then(() => {
				testTodoRef = firebaseRef.child('todos').push();

				return testTodoRef.set({
					text: 'Something to do',
					completed: false,
					createdAt: 1234566
				})
			})
			.then(() => done())//cuando arrow func tiene solo una linea, podemos omitir los {}
			.catch(done);
		});
		//beforeEach se ejecuta despues de cada uno de los unit test
		//borramos el todo introducido antes
		afterEach((done) => {
			testTodoRef.remove().then(() => done());
		});

		it('Should toggle todo and dispatch UPDATE_TODO action', (done) => {
			const store = createMockStore({});
			const action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0]).toInclude({
					type: 'UPDATE_TODO',
					id: testTodoRef.key
				});
				expect(mockActions[0].updates).toInclude({
					completed: true
				});
				expect(mockActions[0].updates.completedAt).toExist();
				done();
			}, done);
		});
		it('Should populate todos and dispatch ADD_TODOS', (done) => {
			const store = createMockStore({});
			const action = actions.startAddTodos();

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0].type).toEqual('ADD_TODOS');
				expect(mockActions[0].todos.length).toEqual(1);
				expect(mockActions[0].todos[0].text).toEqual('Something to do');
				done();
			}, done);
		});
	});
});