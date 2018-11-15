import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { map, tap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class DialogFlowService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';

  private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public readonly messages$: Observable<Message[]> = this._messages.asObservable();
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private utility: UtilityService) {}

  sendMessage(message: Message): Observable<any> {
    this._messages.next([...this._messages.getValue(), ...[message]]);

    let data = {
      query: message.content,
      lang: 'en',
      sessionId: '12345'
    };

    this.isLoading.next(true);

    return forkJoin(this.http.post(`${this.baseURL}`, data, this.utility.getDialogFlowHeaders()), timer(1500)).pipe(
      map((res: any) => {
        return new Message(res[0].result.fulfillment.speech, res[0].id, res[0].timestamp);
      }),
      tap((message: Message) => {
        this.isLoading.next(false);
        this._messages.next([...this._messages.getValue(), ...[message]]);
      })
    );
  }
}
