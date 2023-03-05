import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SERVICE_KEY_INTERCEPTOR_PROVIDER} from "./interceptors/service-key.interceptor";
import {ResultsGuard} from "./shared/guards/results.guard";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    SERVICE_KEY_INTERCEPTOR_PROVIDER,
    ResultsGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
