import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyA3A8jIdX3o0lpOoUDhpnrjqqLLOZJ4ZHc",
	authDomain: "todoapp-61831.firebaseapp.com",
	databaseURL: "https://todoapp-61831.firebaseio.com",
	storageBucket: "todoapp-61831.appspot.com",
	messagingSenderId: "1063268507007"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

// Con promesas:
/*firebaseRef.set({
	app: {
		name: 'Todo App',
		version: '1.0.0'
	}
}).then(() => {
	console.log('Set worked!!');
}, (e) => {
	console.log('Set failed!!');
});*/

firebaseRef.set({
	app: {
		name: 'Todo App',
		version: '1.0.0'
	},
	isRunning: true,
	user: {
		name: 'Marffox',
		age: 39
	},
	/*todos: {//aqui vendria un array pero firebase usa objetos
		'123estoeselid45': {//en lugar de crear un obj con id como primer campo, firebase lo almacena asi
			text: 'Ver una pelicula'
		}
	}*/
});

//SAVE & UPDATE DATA

//machaca todas las propiedades de user y lo actualiza por name
/*firebaseRef.child('user').set({
	name: 'Rafa'
});*/

//Update no machaca el resto de propiedades, pero en este caso si machaca las de app (version)
/*firebaseRef.update({
	app: {
		name: 'Todo Application'
	}
});*/

//solucion a Update: Dos formas de hacerlo
//multipath
/*firebaseRef.update({
	'app/name': 'Todo Application'
});*/
//o usando child para establecer el item como base
/*firebaseRef.child('app').update({
	name: 'Todo Application 2'
})*/
//firebaseRef.child('app').update({name: 'Todo Application'});
//firebaseRef.child('user').update({name: 'Paco'});

// REMOVE DATA

//firebaseRef.child('app/name').remove();
// ó updating con valor null
/*firebaseRef.child('app').update({
	version: '2.0',
	name: null
});*/

// FETCH DATA

//fetch de toda la base de datos
/*firebaseRef.once('value').then((snapshot) => {
	console.log('Got entire database', snapshot.val());
}, (e) => {
	console.log('Unable to fetch value', e);
});*/
//si usamos child, podemos obtener tb la key, que es el nombre de la propiedad que queremos traer (app)
/*firebaseRef.child('app').once('value').then((snapshot) => {
	console.log('Got app from database', snapshot.key, snapshot.val());
}, (e) => {
	console.log('Unable to fetch value', e);
});*/

//listeners para detectar cada vez que la bbdd cambia
/*var logData = (snapshot) => {
	console.log('Got value', snapshot.val());
};*/
//firebaseRef.on('value', logData);
//firebaseRef.off();//sin argumentos, elimina todos los listeners
//firebaseRef.off(logData);//elimina un listener
//firebaseRef.update({isRunning: false});

/*firebaseRef.child('user').on('value', (snapshot) => {
	console.log('User ref changed', snapshot.val());
})

firebaseRef.child('user').update({name: 'Mike'});
firebaseRef.child('app').update({name: 'Something else!'});*/

var notesRef = firebaseRef.child('notes');
notesRef.on('child_added', (snapshot) => {//escucha cuando se añade un nuevo nodo
	console.log('child_added', snapshot.key, snapshot.val());
});
notesRef.on('child_changed', (snapshot) => {
	console.log('child_changed', snapshot.key, snapshot.val());
});
notesRef.on('child_removed', (snapshot) => {
	console.log('child_removed', snapshot.key, snapshot.val());
});

var newNoteRef = notesRef.push();
newNoteRef.set({
	text: 'pasear al perro'
});
//Esto es lo mismo, shortcut:
//var newNoteRef = notesRef.push({
//	text: 'pasear al perro'
//});
console.log('Todo id', newNoteRef.key);

var todosRef = firebaseRef.child('todos');
todosRef.on('child_added', (snapshot) => {
	console.log('New todo added', snapshot.key, snapshot.val());
});
todosRef.push({text: 'Todo 1'});
todosRef.push({text: 'Todo 2'});
todosRef.push({text: 'Todo 3'});
