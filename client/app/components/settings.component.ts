import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
    selector: 'settings',
    templateUrl: 'app/components/settings.component.html'
})

export class SettingsComponent{
    title: string = 'Settings';
    outputText: string = "";
}