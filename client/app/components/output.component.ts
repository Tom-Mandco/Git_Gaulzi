import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Observable, Subscription, TimeInterval }       from 'rxjs/Rx';

import { ResultService } from './shared/result.service';
import { WatchService } from './shared/watch.service';
import { MonitorService } from './shared/monitor.service';
import { Result, MyFilterPipe } from './shared/index';  
import { Watch } from './shared/index';

import { AccordionModule }    from 'primeng/components/accordion/accordion';
import { SharedModule } from 'primeng/primeng';

@Component({
    selector: 'output',
    templateUrl: 'app/components/output.component.html'
})

@Injectable()
export class OutputComponent implements OnInit{

    title: string = 'Output';
    outputText: string = "";
    ticks = 0;
    parsedResult: Result;
    private watches: any;
    private results: Result[]=[];

    constructor(private monitor: MonitorService, private watchService: WatchService) { 
        this.results = this.results;
        this.watches = this.watches;

        this.monitor.GetInstanceStatus().subscribe((result) => {
            this.saveResult(result);
        });
    }

    ngOnInit(){
        this.watches = this.getWatches();
        
    }

    getWatches(): void{
        this.watchService.getWatches().then(watches => this.watches = watches);
    }

    saveResult(rawString: any): void{
        console.log(rawString);
        var m1 = JSON.parse(rawString);
        this.results.push(m1);
    }


}
