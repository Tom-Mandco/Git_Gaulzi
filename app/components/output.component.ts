import { Component, Input, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Observable, Subscription }       from 'rxjs/Rx';

import { ResultService, Result, MyFilterPipe } from './shared/index';  

@Component({
    selector: 'output',
    templateUrl: 'app/components/output.component.html'
})

export class OutputComponent implements OnInit{
    ngOnInit(){
        let timer = Observable.timer(1000);
        timer.subscribe(t => this.ticks = t);
        // this.getResult();
    }
    title: string = 'Output';
    outputText: string = "";
    ticks = 0;
    results = [
    { FileName: "Test1", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test2", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test3", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test5", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "6", LastUpdated: "10:00:00 02/11/2016" },
];


    constructor(
        // private resultService: ResultService
        ){
    }

    // getResult(): void{
    //     this.resultService.getResult().then(results => this.results = results);
    // }

}