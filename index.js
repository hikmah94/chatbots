// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD9r4ZM2lssN-n6kUeWnfVNHw4iOM-h7es",
    authDomain: "chat-app-e1c17.firebaseapp.com",
    databaseURL: "https://chat-app-e1c17.firebaseio.com",
    projectId: "chat-app-e1c17",
    storageBucket: "chat-app-e1c17.appspot.com",
    messagingSenderId: "878369522416",
    appId: "1:878369522416:web:0227306c8d92b71b71f835",
    measurementId: "G-JJ1SQKRWZ5"
    aut
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference Cloud Firestore
var db = firebase.firestore();

// Get the name for the user
if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name

// Change name
document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	document.querySelector('#name').innerText = name
})

// Send a new chat message
document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();
	db.collection("messages")
	.add({
		name: name,
		message: document.querySelector('#message-input').value 
	})
	.then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
		document.querySelector('#message-form').reset()
	})
	.catch(function (error) {
		console.error("Error adding document: ", error);
	});
})

// Display chat stream
db.collection("messages")
.onSnapshot(function(snapshot) {
	document.querySelector('#messages').innerHTML = ""
	snapshot.forEach(function(doc) {
		var message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	});
});

// Remove all chat messages
document.querySelector('#clear').addEventListener('click', () => {
	db.collection("messages")
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
			db.collection("messages").doc(doc.id).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})
