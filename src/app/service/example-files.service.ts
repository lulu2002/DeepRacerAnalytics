import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExampleFilesService {

    constructor(private http: HttpClient) {
    }


    public getExampleFile(fileName: string): Observable<Blob> {
        return this.http.get('assets/file-example/' + fileName, {responseType: 'blob'});
    }

}
