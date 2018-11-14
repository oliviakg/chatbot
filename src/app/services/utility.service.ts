import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilityService {
  private token: string = environment.token;

  constructor() {}

  public getDialogFlowHeaders() {
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return { headers };
  }
}
