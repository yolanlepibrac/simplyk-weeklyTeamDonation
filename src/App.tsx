import React from 'react';
import './App.css';
import { RandomizatorPage } from './Components/RandomizatorPage/RandomizatorPage';
import { FirebaseContext, useFirebase } from './firebase/firebaseContext';

;

function App() {

  const firebaseContext = useFirebase()

  return (
    <div className="App">
      <FirebaseContext.Provider value={firebaseContext}>
        <RandomizatorPage/>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
