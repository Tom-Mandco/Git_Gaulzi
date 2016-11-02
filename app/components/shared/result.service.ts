import { Injectable } from '@angular/core';

import { Result }   from './index';
import { RESULTS }  from './mock-result';

@Injectable()
export class ResultService{
    results: any;

    getResult(): Promise<Result[]>{
        return Promise.resolve(RESULTS)
    }
}