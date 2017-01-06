var React = require('react');
var {connect} = require('react-redux');//connect conecta este componente con Provider
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
	render: function() {
		var {todos, showCompleted, searchText} = this.props;
		var renderTodos = () => {
			var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
			if (filteredTodos.length === 0) {
				return (
					<p className="container__message">Nothing To Do</p>
				);
			};
			return filteredTodos.map((todo) => {
				return (
					<Todo key={todo.id} {...todo}/>
					//con los ... le estamos pasando las propiedades de cada todo
				);
			});
		};
		return (
			<div>
				{renderTodos()}
			</div>
		);
	}
});
//la forma de conectar redux con los componentes individuales es asi:
export default connect(
	(state) => {
		return state;
	}
)(TodoList);