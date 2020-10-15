import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client"
import 'bootstrap/dist/css/bootstrap.min.css';

import Message from "./models/Message"
import ChatCard from "./components/ChatCard";

import "./App.css"

import {Button, Col, Container, Form} from "react-bootstrap"

const socket = io("localhost:5000");

function App() {

  const [messageArray, setMessageArray] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToChatBottom = () => {
    bottomRef?.current?.scrollIntoView({
      behavior: "smooth",
    })

  };

  useEffect(() =>{

    let handler =  (serverMessages : any[]) =>{
      let messages = serverMessages.map(serverMessage => new Message(serverMessage.from, serverMessage.content, new Date(serverMessage.timestamp)));
      let nextMessageArray = [...messageArray, ...messages];
      setMessageArray(nextMessageArray);
      scrollToChatBottom()
    };

    socket.on("response" ,handler);

    //so no multiple socket "response" listener exists when useEffect is fired
    return ()=>{socket.off("response", handler)};

  }, [messageArray]);

  const handleSubmit = (input : string) =>{
    let message = new Message("client", input);
    socket.emit("message", message);
    setMessageArray([...messageArray, message]);
  };

  return (
    <div className={"page"}>
      <Container className={"bubble-container"}>
        {messageArray.map((chat, i)=>{
          let perspective = chat.from === "client" ? "self" : "other";
          return <ChatCard key={"card-"+i} message={chat} perspective={perspective}/>
        })}
        <div ref={bottomRef}/>
      </Container>
      <div className={"bottom-sticky"}>
        <Form className={"interactive-container"}>
          <Form.Row>
            <Col xs={10}>
              <Form.Control
                aria-label="chat-input"
                size="lg"
                type="text"
                placeholder="Input here"
                value={currentInput}
                onChange={(e) =>{setCurrentInput(e.target.value)}}/>
            </Col>
            <Col xs={2}>
              <Button variant="primary"
                      aria-label="submit-button"
                      size="lg"
                      style={{width:"100%"}}
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        if(currentInput) {
                          handleSubmit(currentInput);
                          setCurrentInput("")}}
                      }
              >
                Submit
              </Button>
            </Col>
          </Form.Row>

        </Form>

      </div>

    </div>
  );
}

export default App;
