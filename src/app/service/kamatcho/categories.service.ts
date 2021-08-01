import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categorie} from '../../kamaModel/Categorie';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    url = 'http://localhost:3000/Categorie/';

    constructor(private http: HttpClient) {
    }

    getAllCategories() {
        return this.http.get<Categorie[]>(this.url);
    }

    getCategoryById(id) {
        return this.http.get<Categorie>(this.url + id);
    }

    getCategoryByTitle(title) {
        return this.http.get<Categorie>(this.url + '?title=' + title);
    }
}
