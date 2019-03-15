import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { ItemModel } from 'src/app/item-model';
import { IFilterModel } from 'src/app/ifilter-model';

@Component({
    selector: 'result',
    templateUrl: './result.component.html'
})
export class ResultComponent {

    constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

    filterForm: FormGroup = this.formBuilder.group({
        name: [null],
        type: [null]
    }, { updateOn: 'submit' });

    filter$: Observable<IFilterModel> = this.filterForm.valueChanges.pipe(
        startWith(this.filterForm.value),
        map(
            filter => <IFilterModel>{
                applied: !!(filter.name || filter.type),
                conditions: {
                    name: filter.name,
                    type: filter.type
                }
            }
        )
    );

    items$: Observable<ItemModel[]> = combineLatest(this.filter$, this.dataService.getItems())
        .pipe(
            map(
                ([filter, items]): ItemModel[] =>
                    (filter.applied)
                        ?
                        items.filter((item) =>
                            ((filter.conditions.name ? item.name.toLowerCase().includes(filter.conditions.name.toLowerCase()) : true)
                                && (filter.conditions.type ? item.type.toLowerCase().includes(filter.conditions.type.toLowerCase()) : true)))
                        :
                        items
            )
        );

    clear(): void {
        this.filterForm.setValue({ name: '', type: '' })
    }

}