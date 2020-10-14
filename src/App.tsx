import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import './App.css';
import Message from "./models/Message"

const socket = io("localhost:5000")

function App() {

  const [messageArray, setChatArray] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState<string>("")

  useEffect(() =>{

    let handler =  (serverMessage : any) =>{
      let message = new Message(serverMessage.from, serverMessage.content, new Date(serverMessage.timestamp))
      appendMessage(message)
    }

    socket.on("response" ,handler)

    //so no multiple socket "response" listener exists when useEffect is fired
    return ()=>{socket.off("response", handler)}

  }, [messageArray])

  const appendMessage = (message : Message) => {
    let nextChatArray = [...messageArray, message]
    setChatArray(nextChatArray)
  }

  const handleSubmit = (input : string) =>{
    let message = new Message("client", input)
    socket.emit("message", message)
  }

  return (
    <div className="App">
      {messageArray.map((chat, i)=>{
        return <div key={"chatrow-"+i}>{chat.content}</div>
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
