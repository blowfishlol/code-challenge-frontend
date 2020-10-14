export default class Message {
    from: string
    content: string
    timestamp: Date

    constructor(from: string, content: string, timestamp: Date = new Date()) {
        this.from = from
        this.content = content
        this.timestamp = timestamp
    }
}