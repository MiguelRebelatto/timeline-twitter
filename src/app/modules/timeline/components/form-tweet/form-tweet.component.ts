import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tweet } from 'src/app/modules/shared/models/tweet.model';
import { User } from 'src/app/modules/shared/models/user.model';
import { TweetService } from 'src/app/modules/shared/services/tweet.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { v4 as uuidv4 } from 'uuid';

const MAX_LENGTH = 130;

@Component({
  selector: 'app-form-tweet',
  templateUrl: './form-tweet.component.html',
  styleUrls: ['./form-tweet.component.scss']
})
export class FormTweetComponent implements OnInit {
  user: User = this.userService.getUser();
  formTweet = new FormControl('');
  countWords: number = MAX_LENGTH;

  constructor(
    private tweetService: TweetService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.observableForm()
  }

  observableForm() {
    this.formTweet.valueChanges.subscribe((data: string) => {
      this.countWords = MAX_LENGTH - data.length;
    })
  }

  submit() {
    if (String(this.formTweet.value).length === 0) {
      return
    }
    let newTweet = new Tweet({
      createdAt: new Date(),
      id: uuidv4(),
      text: this.formTweet.value,
      user: this.user
    })
    this.tweetService.addTweet(newTweet)
    this.formTweet.setValue('');
  }

}
