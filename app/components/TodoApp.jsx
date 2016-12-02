var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var uuid = require('node-uuid');//genera id aleatorios y unicos para usarlos como identificadores de cada todo en este caso

var TodoApp = React.createClass({
	getInitialState: function() {
		return {
			showCompleted: false,
			searchText: '',
			todos: [
				{
					id: uuid(),
					text: 'Pasear al perro',
					completed: false
				}, {
					id: uuid(),
					text: 'Comprar la cena',
					completed: false
				}, {
					id: uuid(),
					text: 'Limpiar la casa',
					completed: true
				}, {
					id: uuid(),
					text: 'Lavar la moto',
					completed: true
				}
			]
		}
	},
	handleAddTodo: function(text) {
		this.setState({
			todos: [
				...this.state.todos,
				{
					id: uuid(),
					text: text,
					completed: false
				}
			]
		});
	},
	handleSearch: function(showCompleted, searchText) {
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText.toLowerCase()
		});
	},
	handleToggle: function(id) {
		var updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});

		this.setState({todos: updatedTodos});
	},
	render: function() {
		var {todos} = this.state;
		return (
			<div>
				<TodoSearch onSearch={this.handleSearch}/>
				<TodoList todos={todos} onToggle={this.handleToggle}/>
				<AddTodo onAddTodo={this.handleAddTodo}/>
			</div>
		);
	}	
});


module.exports = TodoApp;