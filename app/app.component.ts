import { Component } from '@angular/core';

import { OutputComponent, LeftPanelComponent, SplashComponent } from './components/shared/index';

@Component({
    selector: 'app-component',
    templateUrl: 'app/app.component.html'
})
export class AppComponent { 
    title: string = 'Ep2050 file monitor';
    tab1: string = 'Output';
    tab2: string = 'Settings';
}
