import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Webstomp from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }

  connect<T>(channel: any) {
    return new Observable((observer: Observer<T>) => {
      const connection: WebSocket = new WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Webstomp.Client = Webstomp.over(connection);
      let subscription: Webstomp.Subscription;
      stompClient.connect({ login: null, passcode: null }, () => {
        subscription = stompClient.subscribe(channel, message => {
          const bodyAsJson = JSON.parse(message.body);
          observer.next(bodyAsJson);
        });
        }, error => {
          // propagate the error
          observer.error(error);
      });
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
