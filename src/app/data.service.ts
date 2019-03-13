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

    getItems(name: string, type: string): Observable<ItemModel[]> {
        return of(mockItems).pipe(
            map(
                (items) => (name || type)
                    ?
                    items.filter((item) =>
                        ((name ? item.name.toLowerCase().includes(name.toLowerCase()) : true)
                            && (type ? item.type.toLowerCase().includes(type.toLowerCase()) : true)))
                    :
                    items
            ));
    }
}
