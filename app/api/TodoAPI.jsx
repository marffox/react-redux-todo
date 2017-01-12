var $ = require('jquery');

module.exports = {
	setTodos: function (todos) {
		if ($.isArray(todos)) {
			localStorage.setItem('todos', JSON.stringify(todos));//setItem method acepta dos parametros que han de ser strings, por eso usamos stringify para convertir el array que le pasamos en string. LocalStore no almacena object o arrais, solo strings.
			return todos;
		}
		//si los datos no son validos devuelve undefined por defecto
	},
	getTodos: function () {
		var stringTodos = localStorage.getItem('todos');//devuelve un string '[1, 2, 3]' hay que pasarlo a array con JSON.parse
		var todos = [];

		try {
			todos = JSON.parse(stringTodos);
		} catch(e) {//en caso de error
			//lo dejamos en blanco ya que por defecto devolveria un array vacio
		}

		return $.isArray(todos) ? todos : [];
	},
	filterTodos: function(todos, showCompleted, searchText) {
		var filteredTodos = todos;

		//filter by showCompleted
		filteredTodos = filteredTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});
		//filter by searchText
		filteredTodos = filteredTodos.filter((todo) => {
			var text = todo.text.toLowerCase();
			return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;//-1: no es encontrado
		});
		//sort todos with non-completed first
		filteredTodos = filteredTodos.sort((a, b) => {
			/*dados dos valores:
			si a va antes que b --> return -1
			si b va antes que a --> return 1
			si a y b son iguales --> return 0
			*/
			if (!a.completed && b.completed) {
				return -1;
			} else if (a.completed && !b.completed) {
				return 1;
			} else {
				return 0;
			}
		});
		return filteredTodos;
	}
}