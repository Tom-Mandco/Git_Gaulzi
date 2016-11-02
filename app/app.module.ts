import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent }  from './app.component';

import { OutputComponent, SettingsComponent, SplashComponent, LeftPanelComponent } from './components/shared/index';
import { ResultService } from './components/shared/index';
import { MyFilterPipe } from './components/shared/index';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
        {
          path: '',
          component: SplashComponent
        },
        {
          path: 'output',
          component: OutputComponent
        },
        {
          path: 'settings',
          component: SettingsComponent
        },
        {
          path: 'leftpanel',
          component: LeftPanelComponent
        }
      ]) 
    ],
  declarations: [ AppComponent, OutputComponent, SettingsComponent, LeftPanelComponent, SplashComponent, MyFilterPipe ],
  bootstrap:    [ AppComponent],
  providers:    [ HttpModule, ResultService ]
})
export class AppModule { }
