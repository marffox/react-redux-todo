var expect = require('expect');
var actions = require('actions');

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
			text: 'Add something to do'
		};
		var res = actions.addTodo(action.text);

		expect(res).toEqual(action);
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