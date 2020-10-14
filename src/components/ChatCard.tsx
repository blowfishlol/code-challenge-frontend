import React from 'react';
import Message from "../models/Message";
import {Card, Col, Row} from "react-bootstrap"

interface ChatCardProps {
    message: Message,
    position: string
}

function ChatCard({message, position}: ChatCardProps) {

    return (<Row>
        <Col md={12}>
            <Card className={"float-"+position}>
                <Card.Header>{message.from}</Card.Header>
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