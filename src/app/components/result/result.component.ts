import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { ItemModel } from 'src/app/item-model';

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

    items$: Observable<ItemModel[]> = combineLatest(this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)), this.dataService.getItems())
        .pipe(
            map(
                ([filter, items]): ItemModel[] =>
                    (filter.name || filter.type)
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