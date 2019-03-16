import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { YTVideo } from './ytvideo';
import { API_KEY } from '../../env';

@Injectable({
    providedIn: 'root'
})
export class YTVideosService {

    constructor(private http: HttpClient) { }

    getVideos(): Observable<YTVideo[]> {
        return this.http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatus%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=ru&fields=items%2Fid%2Citems%2Fsnippet%2Ftitle&key=${API_KEY}`)
            .pipe(
                startWith({ items: [] }),
                map(
                    (result: any) => result.items.map(item => <YTVideo> {
                        id: item.id,
                        title: item.snippet.title
                    })
                )
            )
    }

}
