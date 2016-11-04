import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFilter',
    pure: false
})

@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        if(items == null)
        {
            return null;
        }
        return items.filter(item => item);
    }
}