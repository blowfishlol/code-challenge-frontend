import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import logo from './logo.svg';
import './App.css';

const socket = io("localhost:5000")

function App() {

  const [chatArray, setChatArray] = useState([])


  useEffect(() =>{

    socket.on("response" , data =>{
      console.log(data)
      setChatArray([...setChatArray, data])
    })

    return () => socket.disconnect()
  })

  const handleSubmit = (message) =>{
    socket.emit("message", message)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
