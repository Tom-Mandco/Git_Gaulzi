import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AccordionModule, SharedModule }  from 'primeng/primeng';

import { AppComponent }  from './app.component';

import { OutputComponent, SettingsComponent, SplashComponent, LeftPanelComponent } from './components/shared/index';
import { ConfigService } from './components/config/config.service';
import { ResultService } from './components/shared/result.service';
import { WatchService } from './components/shared/watch.service';
import { MonitorService } from './components/shared/monitor.service';
import { MyFilterPipe } from './components/shared/index';

@NgModule({
  imports:      [
    BrowserModule,
    AccordionModule,
    SharedModule,
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
  providers:    [ HttpModule, ResultService, ConfigService, MonitorService, WatchService ]
})
export class AppModule { }
