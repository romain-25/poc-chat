import {Component, inject} from '@angular/core';
import {WebsocketService} from "../../service/chat.service";
import {FormsModule} from "@angular/forms";
import {TokenModel} from "../../models/TokenModel";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatInput,
    MatButton,
    MatFormField,
    MatFormFieldModule,
    MatCardContent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  websocketService: WebsocketService = inject(WebsocketService);
  messages: string[] = [];
  newMessage: string = '';
  tokenModel: TokenModel = {} as TokenModel;

  ngOnInit(): void {
    this.infoUser()
    this.websocketService.connect(String(this.tokenModel.id));
    this.websocketService.getMessages().subscribe((msg) => {
      try {
        const data = JSON.parse(msg);
        const from = data.from === 'support' ? '[Support]' : `[${this.tokenModel.email}]`;
        this.messages.push(`${from}: ${data.message}`);
      } catch (e) {
        console.error("Erreur de parsing du message :", msg);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.websocketService.sendMessage(String(this.tokenModel.id), this.newMessage);
      // this.messages.push(`[${this.tokenModel.email}]: ${this.newMessage}`);
      this.newMessage = '';
    }
  }
  infoUser(): void {
    let tokenJson: string | null = sessionStorage.getItem('tokenModel');
    if (tokenJson) {
      this.tokenModel = JSON.parse(tokenJson);
    }
  }
}
