import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {
    
    private host = window.location.hostname;
    
    private routes = {
        "mockdata": "mockdata",
    }
    
    public getRoutes() {
        return this.routes;
    }

    public getHost() {
        if(this.host == "localhost") {
            this.host = "localhost";
        }
        return "http://" + this.host + ":8081/";
           
    }
}