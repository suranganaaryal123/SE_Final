import React from 'react';
import { Button } from '@mui/material'; 
import { auth, googleProvider, signInWithPopup, signOut } from './firebase'; // Import updated methods

export function LoginButton({ setCurrentUser }) {

    function logIn() {
        signInWithPopup(auth, googleProvider) // Use the new method
            .then((result) => {
                setCurrentUser(result.user);
                localStorage.setItem('currentUser', JSON.stringify(result.user));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Button variant="outlined" onClick={logIn}>
            Log In
        </Button>
    );
}

export function LogoutButton({ setCurrentUser }) {

    function logOut() {
        signOut(auth) // Use the new method for sign out
            .then(() => {
                setCurrentUser(null);
                localStorage.removeItem('currentUser');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Button variant="outlined" onClick={logOut}>
            Log Out
        </Button>
    );
}
