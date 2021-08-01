import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '../../kamaModel/Store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    url = 'http://localhost:8000/api/stores/';
    urlPost = 'http://localhost:8000/api/stores';
    constructor(private http: HttpClient) { }


    getAllStores(){
        return this.http.get<any>(this.url);
    }

    getStoreById(id){
        return this.http.get<any>(this.url + id);
    }

    addStore(name, responsible, capacity, longitude, laltitude, availability, region){
        return this.http.post(this.urlPost, {
            name: name,
            responsible: responsible,
            capacity: capacity,
            longitude: longitude,
            laltitude: laltitude,
            availability: availability,
            region: region
        }).subscribe(
            (sucess) => { console.log('sucess', sucess); },
            (error) => { console.log('error', error); }
        );
    }

    deleteStore(id){
        return this.http.delete(this.url + id);
    }


    editStore(store: Store): Observable<object>{
        return this.http.put(this.url + store.id, store);
    }
}


