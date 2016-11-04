import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { Observable, Subscription, TimeInterval }       from 'rxjs/Rx';

import { ResultService } from './shared/result.service';
import { WatchService } from './shared/watch.service';
import { MonitorService } from './shared/monitor.service';
import { Result, MyFilterPipe } from './shared/index';  
import { Watch } from './shared/index';

@Component({
    selector: 'output',
    templateUrl: 'app/components/output.component.html'
})

@Injectable()
export class OutputComponent implements OnInit{

    title: string = 'Output';
    outputText: string = "";
    ticks = 0;
    private watches: any;
    private results: string[]=[];

    constructor(private monitor: MonitorService, private watchService: WatchService) { 
        this.results = this.results;
        this.watches = this.watches;

        this.monitor.GetInstanceStatus().subscribe((result) => {
            this.results.push(result);
        });
    }

    ngOnInit(){
        this.watches = this.getWatches();
        
    }

    getWatches(): void{
        this.watchService.getWatches().then(watches => this.watches = watches);
    }


}
