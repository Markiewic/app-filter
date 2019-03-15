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
                name: filter.name,
                type: filter.type
            }
        )
    );

    filterApplied$: Observable<boolean> = this.filter$.pipe(
        map(
            filter => !!(filter.name || filter.type)
        )
    )

    items$: Observable<ItemModel[]> = combineLatest(this.filterApplied$, this.filter$, this.dataService.getItems())
        .pipe(
            map(
                ([filterApplied, filter, items]): ItemModel[] =>
                    (filterApplied)
                        ?
                        items.filter((item) =>
                            ((filter.name ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : true)
                                && (filter.type ? item.type.toLowerCase().includes(filter.type.toLowerCase()) : true)))
                        :
                        items
            )
        );

    clear(): void {
        this.filterForm.setValue({ name: '', type: '' })
    }

}