import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TweetEventEnum } from 'src/app/modules/shared/enums/eventList.enum';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { TweetService } from 'src/app/modules/shared/services/tweet.service';
import { getDifferenceDatetimeInSeconds } from 'src/app/modules/shared/util/date.util';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

const ONE_MINUTE = 60;
const FIFTEEN_SECONDS = 30000;
@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit, OnDestroy {

  now: Date = new Date();
  tweets: Array<Tweet> = [];
  subscription: Subscription;
  interval: any;

  constructor(
    private tweetService: TweetService,
    private modalService: NgbModal
  ) { }

  get list() {
    return this.tweets.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
  }

  isShowSeconds(item: Tweet): boolean {
    let diff = getDifferenceDatetimeInSeconds(this.now, new Date(item.createdAt))
    return diff <= ONE_MINUTE;
  }

  getTextSeconds(item: Tweet): string {
    let seconds = getDifferenceDatetimeInSeconds(this.now, new Date(item.createdAt))
    return Math.ceil(seconds) <= 1 ? `Agora` : `${Math.ceil(seconds)} s`
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.tweets = [...this.tweetService.getTweets()];
    this.observableListEvent();
    this.initInterval();
  }

  initInterval() {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, FIFTEEN_SECONDS);
  }

  observableListEvent() {
    this.subscription = this.tweetService.onChange.subscribe(data => {
      if (data.event == TweetEventEnum.ADDED)
        this.tweets.push(data.tweet)
      else
        this.tweets.splice(this.tweets.findIndex(i => i.id === data.tweet.id), 1)
    })
  }

  remove(item: Tweet) {
    const modal = this.modalService.open(ModalConfirmationComponent);
    modal.result.then(result => {
      if (result === true) this.tweetService.removeTweet(item)
    }).catch(err => console.error(err));
  }
}
