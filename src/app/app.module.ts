import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ResultComponent } from './components/result/result.component';
import { YTVideosService } from "./ytvideos.service";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    { path: '', component: AppComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        ResultComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        YTVideosService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
