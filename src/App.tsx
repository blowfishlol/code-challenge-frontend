import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import './App.css';
import Message from "./models/Message"

const socket = io("localhost:5000")

function App() {

  const [messageArray, setMessageArray] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState<string>("")

  useEffect(() =>{

    let handler =  (serverMessages : any[]) =>{
      console.log("Receive from server:", serverMessages)
      let messages = serverMessages.map(serverMessage => new Message(serverMessage.from, serverMessage.content, new Date(serverMessage.timestamp)))
      let nextMessageArray = [...messageArray, ...messages]
      setMessageArray(nextMessageArray)
    }

    socket.on("response" ,handler)

    //so no multiple socket "response" listener exists when useEffect is fired
    return ()=>{socket.off("response", handler)}

  }, [messageArray])


  const handleSubmit = (input : string) =>{
    let message = new Message("client", input)
    socket.emit("message", message)
  }

  return (
    <div className="App">
      <div className="chat-box">
        {messageArray.map((chat, i)=>{
          return <div key={"chatrow-"+i}>{chat.content}</div>
        })}
      </div>

      <input value={currentInput} onChange={(e) =>{setCurrentInput(e.target.value)}}/>
      <button onClick={() => {
        handleSubmit(currentInput)
        setCurrentInput("")
      }}>Send</button>
    </div>
  );
}

export default App;
