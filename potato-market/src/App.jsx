import { useState, useEffect } from 'react';

import firebase from './firebase';

function App() {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  useEffect(() => {
 


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in.');
      } else {
        console.log('User is signed out.');
      }
      setIsFirebaseConnected(true);
    });
  }, []);

  return (
    <div>
      {isFirebaseConnected ? (
        <p>Firebase is connected.</p>
      ) : (
        <p>Firebase is not connected.</p>
      )}
    </div>
  );
}
export default App;
