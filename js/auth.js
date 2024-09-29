// auth.js - User Authentication Logic for Pivot App

// Function to handle user registration
function registerUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user.email);
            // Redirect or handle successful registration
        })
        .catch((error) => {
            console.error('Registration error:', error.message);
        });
}

// Function to handle user login
function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user.email);
            // Redirect or handle successful login
        })
        .catch((error) => {
            console.error('Login error:', error.message);
        });
}

// Function to handle password reset
function resetPassword(email) {
    // Implement password reset logic
    // Example:
    /*
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            console.log('Password reset email sent');
        })
        .catch(error => {
            console.error('Password reset error:', error.message);
        });
    */
}

// Initialize Firestore
const db = firebase.firestore();

// Function to save tasks for the current user
function saveTask(taskName) {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection("users").doc(user.uid).collection("tasks").add({
            name: taskName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Task added successfully");
        })
        .catch((error) => {
            console.error("Error adding task: ", error);
        });
    } else {
        console.log("User not logged in");
    }
}


// Function to load tasks for the current user
function loadUserTasks() {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection("users").doc(user.uid).collection("tasks").orderBy("createdAt")
        .get()
        .then((querySnapshot) => {
            tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push(doc.data().name);
            });
            renderTasks();
        })
        .catch((error) => {
            console.error("Error loading tasks: ", error);
        });
    }
}


// Function to handle logout
function logoutUser() {
    firebase.auth().signOut().then(() => {
        console.log('User logged out');
        // Handle user redirection after logout
    }).catch((error) => {
        console.error('Logout error:', error.message);
    });
}

