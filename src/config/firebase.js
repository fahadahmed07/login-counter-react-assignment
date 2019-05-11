import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCfUXyJV31hmcksLBoYOsPQyp1ljU7UHFo",
    authDomain: "login-counter.firebaseapp.com",
    databaseURL: "https://login-counter.firebaseio.com",
    projectId: "login-counter",
    storageBucket: "login-counter.appspot.com",
    messagingSenderId: "1055822499127",
    appId: "1:1055822499127:web:7f865de214903635"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const db = firebase.database()


function login(loginEmail, loginPassword, showDashboard) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then((user) => {
            // resolve(user)
            const userId = firebase.auth().currentUser.uid;
            const firebaseRef = firebase.database().ref("users").child(userId);
            firebaseRef.once('value', (dataSnapShot) => {

                const userEmail = dataSnapShot.val().userEmail;
                const userLogin = dataSnapShot.val().userLogin;
                const userPassword = dataSnapShot.val().userPassword;
                const userUid = dataSnapShot.val().userUid;
    
                const userData = {
                    userEmail: userEmail,
                    userLogin: userLogin + 1,
                    userPassword: userPassword,
                    userUid: userUid,
                }
                firebaseRef.set(userData)
                // getUserDetails(userEmail, userPassword, userLogin + 1);
                showDashboard(true)
            })
        }).catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    })
}

function signUp(email, password, showDashboard) {
    // console.log(email, password)
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((success) => {
            let user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            };
            let firebaseRef = firebase.database().ref();
            let userData = {
                userUid: user.uid,
                userEmail: email,
                userPassword: password,
                userLogin: 1,
            };
            firebaseRef.child("users").child(uid).set(userData);
            showDashboard(true)
        }).catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        })
    })
}

function logOut(showDashboard) {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function () {
            showDashboard(false)
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            alert(error)
        });
    })
}

function getData(getUserDetails) {
    const userId = firebase.auth().currentUser.uid;
    const firebaseRef = firebase.database().ref("users").child(userId);
    return new Promise((resolve, reject) => {
        firebaseRef.once('value', (dataSnapShot) => {

            const userEmail = dataSnapShot.val().userEmail;
            const userLogin = dataSnapShot.val().userLogin;
            const userPassword = dataSnapShot.val().userPassword;
            const userUid = dataSnapShot.val().userUid;

            const userData = {
                userEmail: userEmail,
                userLogin: userLogin,
                userPassword: userPassword,
                userUid: userUid,
            }
            resolve(userData)
            // firebaseRef.set(userData)
            // getUserDetails(userEmail, userPassword, userLogin + 1);
        })
    })
}

export {
    login,
    signUp,
    logOut,
    getData
}