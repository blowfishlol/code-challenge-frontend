import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import logo from './logo.svg';
import './App.css';

const socket = io("localhost:5000")

function App() {

  const [chatArray, setChatArray] = useState([])
  const [currentInput, setCurrentInput] = useState("")

  useEffect(() =>{

    let handler =  data =>{
      appendMessage(data)
    }

    socket.on("response" ,handler)

    //so no multiple socket "response" listener exists when useEffect is fired
    return ()=>{socket.off("response", handler)}

  }, [chatArray])

  const appendMessage = (message) => {
    let nextChatArray = [...chatArray, message]
    setChatArray(nextChatArray)
  }

  const handleSubmit = (message) =>{
    socket.emit("message", message)
  }

  return (
    <div className="App">
      {chatArray.map((chat, i)=>{
        return <div key={"chatrow-"+i}>{chat}</div>
      })}
      <input value={currentInput} onChange={(e) =>{setCurrentInput(e.target.value)}}/>
      <button onClick={() => {
        handleSubmit(currentInput)
        setCurrentInput("")
      }}>Send</button>
    </div>
  );
}

export default App;
