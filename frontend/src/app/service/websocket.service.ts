import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit, OnDestroy {
  messageSubscription: Subscription;

  subscribed = false;

  constructor(private rxStompService: RxStompService) {
    this.watchTopic();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  watchTopic() {
    if (!this.subscribed) {
      console.log('Connect to ws');
      this.messageSubscription = this.rxStompService.watch('/topic/tokens').subscribe(
        (message) => {
          console.log('Message in');
          console.log(message);
        });
      this.subscribed = true;
    }
  }

  onSendMessage() {
    console.log('Send message');
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/app/queue/updates', body: message});
  }
}
