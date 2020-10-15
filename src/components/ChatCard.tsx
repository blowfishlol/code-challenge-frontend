import React from 'react';
import Message from "../models/Message";
import {Card, Col, Row} from "react-bootstrap"

interface ChatCardProps {
    message: Message,
    perspective: string
}

function ChatCard({message, perspective}: ChatCardProps) {
    let classNames = perspective === "self" ?
        {card:"float-right", text: "text-right"} : {card: "float-left", text: "text-left"};

    let color = perspective === "self" ? "#dcf8c6" : "#ece5dd"
    return (<Row>
        <Col md={12}>
            <Card className={classNames.card} style={{maxWidth: "50%", backgroundColor: color, marginTop:"25px"}}>
                <Card.Header className={classNames.text}>{message.from}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {message.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>)
}


export default ChatCard;