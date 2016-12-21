import firebase from 'firebase';

try {
	var config = {
		apiKey: "AIzaSyA3A8jIdX3o0lpOoUDhpnrjqqLLOZJ4ZHc",
		authDomain: "todoapp-61831.firebaseapp.com",
		databaseURL: "https://todoapp-61831.firebaseio.com",
		storageBucket: "todoapp-61831.appspot.com",
		messagingSenderId: "1063268507007"
	};
	firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;