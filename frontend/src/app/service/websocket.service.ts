import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  tokenSubscription: Subscription;
  tokenSubject = new Subject<void>();
  mapSubscription: Subscription;
  mapSubject = new Subject<void>();

  subscribed = false;

  constructor(private rxStompService: RxStompService) {
    this.watchTopic();
  }

  notifyTokenChanged(): void {
    this.tokenSubject.next();
  }

  notifyMapChanged(): void {
    this.mapSubject.next();
  }

  watchTopic() {
    if (!this.subscribed) {
      console.log('Connect to ws');
      this.tokenSubscription = this.rxStompService.watch('/topic/tokens').subscribe(
        (message) => {
          this.notifyTokenChanged();
        });
      this.mapSubscription = this.rxStompService.watch('/topic/maps').subscribe(
        (message) => {
          console.log(`Message from map subscription: ${message}`);
          this.notifyMapChanged();
        });
      this.subscribed = true;
    }
  }

/*  onSendMessage() {
    console.log('Send message');
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/app/queue/updates', body: message});
  }*/
}
