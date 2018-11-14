import { Component, OnInit } from '@angular/core';
import { DialogFlowService } from '../services/dialog-flow.service';
import { Message } from '../models/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  messageForm: FormGroup = this.fb.group({
    message: ['', Validators.required]
  });
  responseSubscription: Subscription;
  disableSubmit: boolean = false;

  constructor(private dialogFlowService: DialogFlowService, private fb: FormBuilder) {}

  ngOnInit() {}

  sendMessage() {
    if (this.messageForm.value.message === '' || this.messageForm.value.message === null) return;
    let message: Message = new Message(this.messageForm.value.message, null, new Date());

    this.messageForm.reset();
    this.messageForm.disable();
    this.disableSubmit = true;

    this.responseSubscription = this.dialogFlowService.sendMessage(message).subscribe(result => {
      this.messageForm.enable();
      this.disableSubmit = false;
    });
  }

  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
