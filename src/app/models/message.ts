export class Message {
  content: string;
  id: string;
  timestamp: Date;

  constructor(content: string, id: string, timestamp?: Date) {
    this.content = content;
    this.id = id;
    this.timestamp = timestamp;
  }
}
