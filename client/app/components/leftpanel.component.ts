import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }           from '@angular/router';
import { Observable, Subscription }       from 'rxjs/Rx';

@Component({
    selector: 'leftpanel-component',
    templateUrl: 'app/components/leftpanel.component.html'
})

export class LeftPanelComponent implements OnInit, OnDestroy{
    title: string = 'Leftpanel';
    outputText: string = "";
    
    
    ticks = 0;
    
    ngOnInit(){
        let timer = Observable.timer(0,1000);
        timer.subscribe(t => this.ticks = t);
    }

    ngOnDestroy(){
        // this.subscription.unsubscribe();
    }
}