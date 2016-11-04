import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MonitorService {
    private websocket: any;


    public GetInstanceStatus(): Observable<any>{
      this.websocket = new WebSocket("ws://127.0.0.1:8081"); //dummy echo websocket service
      this.websocket.onopen =  (evt) => {
          this.websocket.send("start service");
          this.websocket.send("meaningless message");
      };

      return Observable.create(observer=>{
          this.websocket.onmessage = (evt) => { 
              observer.next(evt);
          };
      })
      .map(res=>res.data)
      .share();
    }

}