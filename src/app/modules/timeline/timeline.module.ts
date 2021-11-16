import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineRoutingModule } from './timeline-routing.module';
import { TweetsComponent } from './components/tweets/tweets.component';
import { FormTweetComponent } from './components/form-tweet/form-tweet.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';


@NgModule({
  declarations: [
    TweetsComponent,
    FormTweetComponent,
    HomeComponent,
    ModalConfirmationComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class TimelineModule { }
