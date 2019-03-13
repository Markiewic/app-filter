import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { ItemModel } from 'src/app/item-model';

@Component({
    selector: 'result',
    templateUrl: './result.component.html'
})
export class ResultComponent {

    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private formBuilder: FormBuilder) { }

    filterForm: FormGroup = this.formBuilder.group({
        name: [''],
        type: ['']
    });

    clear(): void {
        this.router.navigate(['/']);
    }

    onSubmit(): void {
        this.router.navigate(['/'], { queryParams: { name: this.filterForm.value.name, type: this.filterForm.value.type } });
    }

    items$: Observable<ItemModel[]> = combineLatest(this.route.queryParams, this.dataService.getItems())
        .pipe(
            map(
                ([params, items]): ItemModel[] => {
                    this.filterForm.patchValue({ name: params.name, type: params.type });
                    return (params.name || params.type)
                        ?
                        items.filter((item) =>
                            ((params.name ? item.name.toLowerCase().includes(params.name.toLowerCase()) : true)
                                && (params.type ? item.type.toLowerCase().includes(params.type.toLowerCase()) : true)))
                        :
                        items
                }
            )
        );


}