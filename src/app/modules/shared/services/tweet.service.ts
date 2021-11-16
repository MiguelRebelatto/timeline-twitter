import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tweet } from '../models/tweet.model';
import { TweetEventEnum } from '../enums/eventList.enum';

const KEY_LOCAL_STORAGE = 'list-tweets';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private emmitter: Subject<{tweet: Tweet, event: TweetEventEnum}> = new Subject();
  public onChange = this.emmitter.asObservable();

  constructor() { }

  getTweets(): Array<Tweet> {
    let list = localStorage.getItem(KEY_LOCAL_STORAGE);
    return list ? JSON.parse(list) : [];
  }

  setTweets(list: Array<Tweet>) {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(list));
  }

  addTweet(tweet: Tweet) {
    let list = this.getTweets();
    list.push(tweet);
    this.setTweets(list);
    this.emmitter.next({
      event: TweetEventEnum.ADDED,
      tweet
    })
  }

  removeTweet(tweet: Tweet) {
    let list = this.getTweets();
    const indexItem = list.findIndex(i => i.id === tweet.id);
    if (indexItem >= 0) {
      list.splice(indexItem, 1);
      this.setTweets(list);
      this.emmitter.next({
        event: TweetEventEnum.REMOVED,
        tweet
      })
    }
  }
}
