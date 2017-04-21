// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};

firebase.initializeApp(config);

// References
var auth = firebase.auth();
var database = firebase.database(); // database service

//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        var ref = database.ref("doctors/"); // database patients
        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(user.email + "   " + childSnapshot.val().dname);

                if(childSnapshot.val().dname === user.email){
                    window.location = 'pages/doctors_side/dashboard.html'; //After successful login, user will be redirected to dashboard.html
                }
                else{
                    window.location = 'pages/patients_side/dashboard.html'; //After successful login, user will be redirected to dashboard.html
                }
            });
        });
    }
});

// Adds patient to database
function login() {
    var username = $("#username").val() + '@strokerehab.com';
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
    });
}