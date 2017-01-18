import { Component }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent{
	title = 'app works!';
    date: any;

    add(date): void{
        console.log(date);
    }
}