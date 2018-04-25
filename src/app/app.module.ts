import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule }   from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MathService } from './math.service';
import { DataService } from './data.service';
import { DimensionService } from './dimension.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full'},   
      { path: 'home', component: HomeComponent}
    ],{useHash: true})
    
  ],
  providers: [HttpClient, MathService, DataService, DimensionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

