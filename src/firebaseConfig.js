import Firebase from 'firebase'
var config = {
    apiKey: "AIzaSyB6NDIhr36TGflEOqgmMiAB1OssSUlKGCs",
    authDomain: "fast-gate-202608.firebaseapp.com",
    databaseURL: "https://fast-gate-202608.firebaseio.com",
    projectId: "fast-gate-202608",
    storageBucket: "fast-gate-202608.appspot.com",
    messagingSenderId: "394311459576"
};
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()

export const provider = new Firebase.auth.FacebookAuthProvider()
provider.addScope('user_birthday')
provider.addScope('user_gender')

provider.setCustomParameters({
    'display': 'popup'
});
export const postRef = db.ref('auditionPost')
export const userRef = db.ref('user')
export const todosRef = db.ref('todos')
export const storage = firebaseApp.storage()

export const dbAuth = firebaseApp.auth()

