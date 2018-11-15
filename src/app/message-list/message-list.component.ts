import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { DialogFlowService } from '../services/dialog-flow.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private dialogFlowService: DialogFlowService) {}
  ngOnInit() {
    this.messages$ = this.dialogFlowService.messages$;
  }
}
