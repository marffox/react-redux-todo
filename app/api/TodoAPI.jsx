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
	}
}