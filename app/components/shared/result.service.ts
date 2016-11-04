import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'

import { ConfigService } from '../config/config.service';
import { MonitorService } from './monitor.service';
import { Result }   from './index';
import { RESULTS }  from './mock-result';

@Injectable()
export class ResultService{
    results: any;
    host: string;
    routes: any;

    constructor(private monitor: MonitorService, private _config: ConfigService) { 
        this.monitor.GetInstanceStatus().subscribe((result) => {
            this.results.push(result);
        });
        this.routes = this._config.getRoutes();
    }

    private handleError(error: Response) {
        console.error("Caught Error.....:" + error);
        return Observable.throw(error.json().error || 'Server error');
    }
}