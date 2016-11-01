import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
    selector: 'splash-component',
    templateUrl: 'app/components/splash.component.html'
})

export class SplashComponent{
    title: string = 'Splash';
    outputText: string = "";
}