import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user.model';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

}
