import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
    selector: 'leftpanel-component',
    templateUrl: 'app/components/leftpanel.component.html'
})

export class LeftPanelComponent{
    title: string = 'Leftpanel';
    outputText: string = "";
}