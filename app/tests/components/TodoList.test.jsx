var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
	it('should exist', () => {
		expect(TodoList).toExist();
	});

	it('should render one Todo component for each todo item', () => {
		var todos = [{
			id: 1,
			text: 'Do something'
		},{
			id: 2,
			text: 'Send email'
		}];
		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
		//cuantos componentes renderiza dentro de un componente padre. Primer argumento es el comp padre y segundo arg es el componente que renderiza dentro del padre (todos los Todo). Esto devuelve un array de componentes renderizados, por lo que tenemos que comprobar su longitud

		expect(todosComponents.length).toBe(todos.length);
	});
	it('should render empty message if no todos', () => {
		var todos = [];
		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
		var $el = $(ReactDOM.findDOMNode(todoList));

		expect($el.find('.container__message').length).toBe(1);
	});
})