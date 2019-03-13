import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemModel } from './item-model';

import { mockItems } from './mock-items';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    getItems(): Observable<ItemModel[]> {
         return of(mockItems);
    }
}
