import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
    selector: 'output',
    templateUrl: 'app/components/output.component.html'
})

export class OutputComponent{
    title: string = 'Output';
    outputText: string = "";
}