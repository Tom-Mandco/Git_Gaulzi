import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'

import { ConfigService } from '../config/config.service';
import { Result }   from './index';
import { RESULTS }  from './mock-result';

@Injectable()
export class ResultService{
    results: any;
    host: string;
    routes: any;

    constructor(private _http: Http, private _config: ConfigService) { 
        this.host = this._config.getHost();
        this.routes = this._config.getRoutes();
    }

    getResult(): Promise<Result[]>{
        let api: string = this.host + this.routes.mockdata;

        // var m1 = this._http.get(api)
        //     .map((response: Response) => <Result[]>response.json())
        //     .catch(this.handleError);

        var m2 = this._http.get(api)
            .toPromise()
            .then(response => response.json() as Result[])
            .catch(this.handleError);

        console.log(m2);

        return m2;
    }

    private handleError(error: Response) {
        console.error("Caught Error.....:" + error);
        return Observable.throw(error.json().error || 'Server error');
    }

    // getResult(): Promise<Result[]>{
    //     return Promise.resolve(RESULTS)
    // }


}