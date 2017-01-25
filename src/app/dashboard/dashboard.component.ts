import { Component, NgZone }    from '@angular/core';
import { Router }               from '@angular/router';

import { User } from './user';
import { JsonPlaceholderService } from './jsonplaceholder.service';

declare const gapi: any;
@Component({
    templateUrl: 'dashboard.component.html',
    providers: [JsonPlaceholderService]
})
export class DashboardComponent{
  model = new User;

  constructor(private JsonPlaceholderService: JsonPlaceholderService) { }

  createUser(User: User): void{
    this.JsonPlaceholderService.user(this.model)
      .then(() => {
        console.log("성공");
        console.log(this.model);
			})
  }

  getGoogleId(user) {
    localStorage.setItem('googleUser', user);
    console.log(localStorage.getItem('googleUser'));
  }
    
  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: '199304953275-tgpm56t73ois20fm9hquv70fbff8av7l.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      that.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        that.model.id = profile.getId();
        that.model.password = profile.getId();

        that.getGoogleId(profile.getId());

      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

ngAfterViewInit(){
      this.googleInit();
}
	title = 'app works!';
    date: any;

    add(date): void{
        console.log(date);
    }
}