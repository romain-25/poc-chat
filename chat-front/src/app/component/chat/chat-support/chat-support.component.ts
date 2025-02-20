import {Component, inject} from '@angular/core';
import {WebsocketService} from "../../../service/chat.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-chat-support',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent
  ],
  templateUrl: './chat-support.component.html',
  styleUrl: './chat-support.component.scss'
})
export class ChatSupportComponent {
  webSocketService: WebsocketService = inject(WebsocketService);
  chatWindows: { [userEmail: string]: string[] } = {};
  responses: { [userEmail: string]: string } = {};
  ngOnInit() {
    this.webSocketService.connect('support', true);
    this.webSocketService.getMessages().subscribe((msg) => {
      try {
        let data: any;

        if (msg.startsWith('{') && msg.endsWith('}')) {
          data = JSON.parse(msg);
        } else {
          const match = msg.match(/^(.+?): (.+)$/);
          if (!match) throw new Error('Format de message invalide');
          data = { userEmail: match[1], message: match[2], from: 'user' };
        }
        console.log('data', data);
        const userEmail = data.userEmail;
        const message = data.message;

        if (!this.chatWindows[userEmail]) {
          this.chatWindows[userEmail] = [];
        }
        this.chatWindows[userEmail].push(`[${data.from === 'support' ? 'Support' : 'User'}]: ${message}`);
      } catch (e) {
        console.error("Erreur lors de la réception du message :", msg);
      }
    });


  }
  sendSupportResponse(userEmail: string): void {
    const message = this.responses[userEmail]?.trim();
    if (message) {
      this.webSocketService.sendSupportMessage(userEmail, message);
      this.responses[userEmail] = '';
    }
  }
  protected readonly Object = Object;
}
