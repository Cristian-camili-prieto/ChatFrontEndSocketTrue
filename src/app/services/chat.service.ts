import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from '../models/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private messagesSubject: Subject<ChatMessage> = new Subject<ChatMessage>();

  constructor() {
    this.initConnectionSocket();
  }

  private initConnectionSocket() {
    const url = 'http://localhost:3001/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomID: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomID}`, (message: any) => {
        const parsedMessage: ChatMessage = JSON.parse(message.body);
        this.messagesSubject.next(parsedMessage); // Emitir el mensaje recibido al observable
      });
    });
  }

  sendMessage(roomID: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomID}`, {}, JSON.stringify(chatMessage));
  }

  receiveMessage(): Observable<ChatMessage> {
    return this.messagesSubject.asObservable();
  }
}
