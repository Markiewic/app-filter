import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IFilterModel } from 'src/app/ifilter-model';
import { YTVideoEntry } from 'src/app/ytvideo-entry';
import { YTVideosService } from "src/app/ytvideos.service";
import { YTVideo } from 'src/app/ytvideo';

@Component({
    selector: 'result',
    templateUrl: './result.component.html'
})
export class ResultComponent {

    constructor(private ytVideosService: YTVideosService, private formBuilder: FormBuilder) { }

    tabForm: FormGroup = this.formBuilder.group({
        tab: new FormControl('all')
    }, { updateOn: 'change' });

    tab$: Observable<string> = this.tabForm.valueChanges.pipe(
        startWith('all'),
        map(tabForm => tabForm.tab)
    )

    filterForm: FormGroup = this.formBuilder.group({
        title: ['']
    }, { updateOn: 'submit' });

    filter$: Observable<IFilterModel> = this.filterForm.valueChanges.pipe(
        startWith(this.filterForm.value),
        map(
            filter => <IFilterModel>{
                title: filter.title
            }
        )
    );

    clearFilter(): void {
        this.filterForm.setValue({ title: '' });
    }

    filterApplied$: Observable<boolean> = this.filter$.pipe(map(filter => !!filter.title));

    saved: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    saved$: Observable<string[]> = this.saved.asObservable();

    save(toggleId: string): void {
        this.saved.next(this.saved.value.some(id => toggleId === id) ? this.saved.value.filter(id => toggleId !== id) : this.saved.value.concat(toggleId));
    }

    filteredVideos$: Observable<YTVideo[]> = combineLatest(this.ytVideosService.getVideos(), this.filterApplied$, this.filter$).pipe(
        map(
            ([videos, filterApplied, filter]) =>
                (filterApplied
                    ? videos.filter(video => video.title.toLowerCase().includes(filter.title.toLowerCase()))
                    : videos)
        )
    );

    filteredVideosList$: Observable<YTVideoEntry[]> = combineLatest(this.filteredVideos$, this.saved$).pipe(
        map(
            ([videos, saved]) => videos.map(video => ({ ...video, checked: saved.some(id => video.id === id) }))
        )
    );

    tabbedFilteredVideosList$: Observable<YTVideoEntry[]> = combineLatest(this.filteredVideosList$, this.tab$).pipe(
        map(
            ([videos, tab]) => tab === 'saved' ? videos.filter(video => video.checked) : videos
        )
    );

}