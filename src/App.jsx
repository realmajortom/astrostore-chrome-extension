import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import AddBookmark from './components/AddBookmark';

function App() {
    const [token, setToken] = useState(localStorage.getItem('JWT'));

    return token === null
           ? <Login update={() => setToken(localStorage.getItem('JWT'))}/>
           : <AddBookmark update={() => setToken(localStorage.getItem('JWT'))}/>

}

export default App;