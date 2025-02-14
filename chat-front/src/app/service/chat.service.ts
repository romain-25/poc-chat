import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client | null = null;
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  connect(userId: string, isSupport: boolean = false): void {
    if (this.stompClient && this.stompClient.active) return;

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:3001/api/ws'
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connecté');

      if (isSupport) {
        this.stompClient!.subscribe('/topic/support', (message) => {
          const data = JSON.parse(message.body);
          if (data.from === 'support') return;
          console.log(`Message reçu pour le support:`, data);
          this.messageSubject.next(JSON.stringify(data));
        });
      }

      if (!isSupport) {
        this.stompClient!.subscribe(`/topic/user/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          console.log(`Message reçu pour l'utilisateur ${userId}:`, data);
          this.messageSubject.next(JSON.stringify(data));
        });
      }
    };

    this.stompClient.activate();
  }

  sendMessage(userId: string, message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify({ userId, message })
      });
      this.messageSubject.next(`[Vous]: ${message}`);
    } else {
      console.error('STOMP non connecté.');
    }
  }
  sendSupportMessage(userId: string, message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      const payload = JSON.stringify({ userId, message, from: 'support' });
      this.stompClient.publish({
        destination: '/app/sendSupportMessage',
        body: payload
      });
      this.messageSubject.next(payload);
    } else {
      console.error('STOMP non connecté.');
    }
  }


  getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }
}
