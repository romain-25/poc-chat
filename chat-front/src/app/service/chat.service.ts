import { inject, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket('ws://localhost:3001/api/ws');
    this.connect();
  }

  test() {
    // Test basique de connexion WebSocket
    const token = sessionStorage.getItem('tokenModel');
    this.websocket = new WebSocket(`ws://localhost:3001/api/ws?token=${token}`);
  }

  connect(): void {
    if (this.stompClient && this.stompClient.active) {
      console.log('Déjà connecté.');
      return;
    }

    const token = sessionStorage.getItem('tokenModel');

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:3001/api/ws',
      connectHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connecté');
      this.stompClient!.subscribe('/topic/messages', (message) => {
        console.log('Message reçu du serveur:', message.body);
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erreur STOMP:', frame);
    };

    this.stompClient.activate();
  }

  sendMessage(message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: message
      });
    } else {
      console.error('STOMP non connecté. Impossible d\'envoyer le message.');
    }
  }


  getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }
}
