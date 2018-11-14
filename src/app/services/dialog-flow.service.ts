import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DialogFlowService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';

  private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public readonly messages$: Observable<Message[]> = this._messages.asObservable();

  constructor(private http: HttpClient, private utility: UtilityService) {}

  sendMessage(message: Message): Observable<any> {
    this._messages.next([...this._messages.getValue(), ...[message]]);

    let data = {
      query: message.content,
      lang: 'en',
      sessionId: '12345'
    };

    return this.http.post(`${this.baseURL}`, data, this.utility.getDialogFlowHeaders()).pipe(
      map((res: any) => {
        return new Message(res.result.fulfillment.speech, res.id, res.timestamp);
      }),
      tap((message: Message) => {
        this._messages.next([...this._messages.getValue(), ...[message]]);
      })
    );
  }
}
