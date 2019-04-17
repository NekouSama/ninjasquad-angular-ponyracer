import { Injectable, Inject, Type } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client, Subscription } from 'webstomp-client';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';


@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(@Inject(WEBSOCKET) private WebSocket: Type<WebSocket>, @Inject(WEBSTOMP) private Webstomp: any) { }

  connect<T>(channel: any) {
    return new Observable((observer: Observer<T>) => {
      const connection: WebSocket = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Client = this.Webstomp.over(connection);
      let subscription: Subscription;
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
