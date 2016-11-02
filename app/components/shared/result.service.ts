import { Injectable } from '@angular/core';

import { Result }   from './index';
import { RESULTS }  from './mock-result';

@Injectable()
export class ResultService{
    result= [
    { FileName: "Test1", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test2", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test3", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "Test5", LastUpdated: "10:00:00 02/11/2016" },
    { FileName: "6", LastUpdated: "10:00:00 02/11/2016" },
];

    getResult(): Promise<Result[]>{
        return Promise.resolve(RESULTS)
    }
}