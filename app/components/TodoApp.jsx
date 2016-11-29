var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
	getInitialState: function() {
		return {
			todos: [
				{
					id: 1,
					text: 'Pasear al perro'
				}, {
					id: 2,
					text: 'Comprar la cena'
				}, {
					id: 3,
					text: 'Limpiar la casa'
				}, {
					id: 4,
					text: 'Lavar la moto'
				}
			]
		}
	},
	handleAddTodo: function(text) {
		alert('New todo: ' + text);
	},
	render: function() {
		var {todos} = this.state;
		return (
			<div>
				<TodoList todos={todos}/>
				<AddTodo onAddTodo={this.handleAddTodo}/>
			</div>
		);
	}	
});


module.exports = TodoApp;