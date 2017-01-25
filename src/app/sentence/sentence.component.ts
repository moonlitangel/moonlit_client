import { Component, OnInit } from '@angular/core';

import { User } from './../dashboard/user';
import { JsonPlaceholderService } from './../dashboard/jsonplaceholder.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss'],
  providers: [JsonPlaceholderService]
})
export class SentenceComponent implements OnInit {
  model = new User;

  constructor(private JsonPlaceholderService: JsonPlaceholderService) {
    this.model.id = localStorage.getItem('googleUser');
    this.model.password = localStorage.getItem('googleUser');
  }

  createUser(User: User): void{
    this.JsonPlaceholderService.user(this.model)
      .then(() => {
        console.log(this.model);
      })
  }

  ngOnInit() {
  }

}
