import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

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

	it('Should generate toggle to do action', () => {
		var action = {
			type: 'TOGGLE_TODO',
			id: 1
		};
		var res = actions.toggleTodo(action.id);

		expect(res).toEqual(action);
	});
});