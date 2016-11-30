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
			todos: []
			// 	{
			// 		id: uuid(),
			// 		text: 'Pasear al perro'
			// 	}, {
			// 		id: uuid(),
			// 		text: 'Comprar la cena'
			// 	}, {
			// 		id: uuid(),
			// 		text: 'Limpiar la casa'
			// 	}, {
			// 		id: uuid(),
			// 		text: 'Lavar la moto'
			// 	}
			// ]
		}
	},
	handleAddTodo: function(text) {
		this.setState({
			todos: [
				...this.state.todos,
				{
					id: uuid(),
					text: text
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
	render: function() {
		var {todos} = this.state;
		return (
			<div>
				<TodoSearch onSearch={this.handleSearch}/>
				<TodoList todos={todos}/>
				<AddTodo onAddTodo={this.handleAddTodo}/>
			</div>
		);
	}	
});


module.exports = TodoApp;