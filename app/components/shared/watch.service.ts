import { Injectable } from '@angular/core';

import { Watch }   from './index';
import { WATCHES }  from './mock-watch';

@Injectable()
export class WatchService{

    getWatches(): Promise<Watch[]>{
        return Promise.resolve(WATCHES)
    }
}


