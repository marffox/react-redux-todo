var expect = require('expect');
var df = require('deep-freeze-strict');/*como uno de los 3 principios de redux es el de trabajar con funciones puras.
Estas:
	- Dado unos parámetros de entrada de idéntico valor, la función siempre devolverá el mismo resultado.
	- El cómputo de la función, su lógica, no implica ningún efecto observable colateral fuera de ella.
Para seguir cumpliendo estas reglas en los tests usamos esta libreria.
En realidad hace un Object.freeze() recursivo, Object.freeze() mantiene inmutable el objeto ante cualquier cambio futuro que pueda ocurrir.
*/

var reducers = require('reducers');

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('Should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'Kawasaki'
			};
			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompletedReducer', () => {
		it('Should toggle showCompleted', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};
			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	});
});