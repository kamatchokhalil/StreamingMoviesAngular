import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categorie} from '../../kamaModel/Categorie';

@Injectable({
  providedIn: 'root'
})
export class MovieCategoriesService {
    url = 'http://localhost:8000/api/movie_categories';

    constructor(private http: HttpClient) {
    }

    getAllCategories() {
        return this.http.get<Categorie[]>(this.url);
    }

    getCategoryById(id) {
        return this.http.get<Categorie>(this.url + '/' + id);
    }

    getCategoryByTitle(title) {

        return this.http.get<Categorie>('localhost:8000/api/movie_categories?title=' + title);
    }

    getCategoryByTitleCopy(title) {
        return this.http.get<Categorie>(this.url + '?title=' + title);
    }




}
