import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { ResultComponent } from './components/result/result.component';
import { DataService } from './data.service';

const routes: Routes = [
    { path: '', component: AppComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        FilterComponent,
        ResultComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
