import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent {

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.filterForm.name = params.name;
            this.filterForm.type = params.type;
        });
    }

    filterForm: any = {
        name: "",
        type: ""
    };

    onSubmit() {
        this.router.navigate(['/'], { queryParams: { name: this.filterForm.name, type: this.filterForm.type } });
    }

}