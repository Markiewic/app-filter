import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ItemModel } from 'src/app/item-model';

import { DataService } from 'src/app/data.service';

@Component({
    selector: 'result',
    templateUrl: './result.component.html'
})
export class ResultComponent {

    constructor(private route: ActivatedRoute, private dataService: DataService) { };

    name: string;
    type: string;

    items: ItemModel[] = [];

    getItems(): void {
        this.dataService.getItems(this.name, this.type).subscribe(items => this.items = items);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.name = params.name;
            this.type = params.type;

            this.getItems();
        });

    }

}