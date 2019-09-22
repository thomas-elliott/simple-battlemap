import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Subject, Subscription} from "rxjs";
import {Token} from "../model/token.model";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit, OnDestroy {
  tokenSubscription: Subscription;
  tokenSubject = new Subject<void>();

  subscribed = false;

  constructor(private rxStompService: RxStompService) {
    this.watchTopic();
  }

  notifyTokenChanged(): void {
    this.tokenSubject.next();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  watchTopic() {
    if (!this.subscribed) {
      console.log('Connect to ws');
      this.tokenSubscription = this.rxStompService.watch('/topic/tokens').subscribe(
        (message) => {
          this.notifyTokenChanged();
        });
      this.subscribed = true;
    }
  }

  subscribeTokenUpdates() {
    console.log('Subscribing to token');
    this.tokenSubscription = this.rxStompService.watch('/topic/tokens').subscribe(
      (message) => {
        console.log('Token');
      }
    );
  }

  onSendMessage() {
    console.log('Send message');
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/app/queue/updates', body: message});
  }
}
