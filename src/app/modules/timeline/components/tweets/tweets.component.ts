import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { TweetService } from 'src/app/modules/shared/services/tweet.service';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit, OnDestroy {

  tweets: Array<Tweet> = [];
  subscription: Subscription;

  constructor(
    private tweetService: TweetService,
    private modalService: NgbModal
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tweets = [...this.tweetService.getTweets()];
    this.observableListEvent();
  }

  observableListEvent() {
    this.subscription = this.tweetService.onChange.subscribe(data => {
      this.tweets = [...this.tweetService.getTweets()];
    })
  }

  remove(item: Tweet) {
    const modal = this.modalService.open(ModalConfirmationComponent);
    modal.result.then(result => {
      if (result === true) this.tweetService.removeTweet(item)
    }).catch(err => console.error(err));
  }
}
