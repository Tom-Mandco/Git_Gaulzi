import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Observable, Subscription, TimeInterval }       from 'rxjs/Rx';

import { ResultService } from './shared/result.service';
import { Result, MyFilterPipe } from './shared/index';  

@Component({
    selector: 'output',
    templateUrl: 'app/components/output.component.html'
})

@Injectable()
export class OutputComponent implements OnInit{
    ngOnInit(){
        let timer = Observable.timer(0, 1500);
        timer.subscribe(t => this.results = this.getResult());

        this.results = this.getResult();
        console.log('Retrieved results');
        console.log(this.results);
    }
    title: string = 'Output';
    outputText: string = "";
    ticks = 0;
    results: any;

    constructor(
        private router: Router,
        private resultService: ResultService
        ){
    }

    getResult(): void{
        this.resultService.getResult().then(results => this.results = results);
    }

}