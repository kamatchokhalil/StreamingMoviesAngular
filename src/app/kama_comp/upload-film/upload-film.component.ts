import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {FilmService} from '../../service/kamatcho/film.service';
import {Categorie} from '../../kamaModel/Categorie';
import {Film} from '../../kamaModel/Film';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
    selector: 'app-upload-film',
    templateUrl: './upload-film.component.html',
    styleUrls: ['./upload-film.component.css']
})
export class UploadFilmComponent implements OnInit {

    categoriesList: Categorie[];
    itemSelected: string;
    filmToUpload: Film;
    categorieId: string;
    quality: string;
    translateValue = false;
    free = false;
    selectedFile = null;
    selectedImage: File = null;
    test: SafeUrl;
    urlToDownload: string;
    imgName: string;


    task: AngularFireUploadTask;
    ref: AngularFireStorageReference;


    constructor(private fs: AngularFirestore, private fst: AngularFireStorage, private formBuilder: FormBuilder,
                private categorieService: MovieCategoriesService, private httpClientService: HttpClient,
                private filmService: FilmService, private domSanitizer: DomSanitizer, private router: Router) {
    }

    ngOnInit(): void {
        this.categorieService.getAllCategories().subscribe(
            (data: Categorie[]) => {
                this.categoriesList = data;
            }
        );
        this.filmToUpload = new Film();


    }

    selectOption(id): void {
        /* console.log('item 1 ', id.target.options[id.target.options.selectedIndex].text);
         console.log('item 3 ', id.target.options[id.target.options.selectedIndex].value[0]);*/
        // console.log('item 2 ', this.itemSelected);
        this.itemSelected = id.target.options[id.target.options.selectedIndex].value[0];

    }

    selectQualiryOption(id): void {
        /*  console.log('item 1 ', id.target.options[id.target.options.selectedIndex].text);
          console.log('item 2 ', this.itemSelected);*/
        this.quality = id.target.options[id.target.options.selectedIndex].text;
        console.log('item 1 ', id.target.options[id.target.options.selectedIndex].text);
    }

    isChecked(data): void {
        this.translateValue = data.target.checked;
    }

    isCheckedForFree(data): void {
        this.free = data.target.checked;
    }

    onFileSelected(event): void {
        this.selectedFile = <File> event.target.files[0];
    }

    onFileSelectedImage(event): void {
        this.selectedImage = <File> event.target.files[0];
    }


    getDuration(): void {
        const vid = document.createElement('video');
        vid.ondurationchange = () => {

            return vid.duration;
        };
    }

    transform(url): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }


    sendToBackEnd(): void {

        const fdVideo = new FormData();
        fdVideo.append('video', this.selectedFile, this.selectedFile.name);
        const fdImage = new FormData();
        fdVideo.append('image', this.selectedFile, this.selectedFile.name);
        this.filmToUpload.trans = this.translateValue;
        this.filmToUpload.free = this.free;
        this.filmToUpload.quality = this.quality;
        this.filmToUpload.movieCategories = '/api/movie_categories/' + (this.itemSelected);
        this.filmToUpload.duration = '00:00:00';
        this.filmToUpload.overall_rate = 0;
        this.filmToUpload.num_visits = 0;

        console.log('show', this.selectedFile.name);
        console.log('show', this.selectedFile);
        this.httpClientService.post<any>('http://localhost:8000/movie/upload', {
            title: this.filmToUpload.title,
            summary: this.filmToUpload.summary,
            url: fdVideo,
            duration: this.filmToUpload.duration,
            quality: this.filmToUpload.quality,
            trans: this.filmToUpload.trans,
            dateSortie: this.filmToUpload.dateSortie,
            numVisits: this.filmToUpload.num_visits,
            overallRate: this.filmToUpload.overall_rate,
            MovieCategories: this.filmToUpload.movieCategories,
            img: fdImage,
            free: this.filmToUpload.free

        }).subscribe(
            (success) => {
                console.log('success', success);
            },
            (error) => {
                console.log('error', error);
            }
        );
    }


    addFilm(fdata: NgForm): void {
        this.filmToUpload.trans = this.translateValue;
        this.filmToUpload.free = this.free;
        this.filmToUpload.quality = this.quality;
        this.filmToUpload.movieCategories = '/api/movie_categories/' + (this.itemSelected);
        this.filmToUpload.duration = '00:00:00';
        this.filmToUpload.overall_rate = 0;
        this.filmToUpload.num_visits = 0;
        // this.filmToUpload.quality = '1080p';
        if (typeof this.test === 'string') {
            this.filmToUpload.url = this.test;
        }

        /*        console.log('categoriesID ===== ', this.filmToUpload.MovieCategories);
                if (this.filmToUpload.dateSortie === 'undefined') {
                    this.filmToUpload.dateSortie = this.dateTime.getDate().toString();
                }*/

        // MovieCategories: '/api/movie_categories/1',
        this.filmService.addFilm(this.filmToUpload.title, this.filmToUpload.summary, this.filmToUpload.url,
            '00:00:00', this.quality, this.translateValue,
            this.filmToUpload.dateSortie, 0, 0, '/api/movie_categories/' +
            this.itemSelected, this.filmToUpload.img, this.filmToUpload.free);
    }

    uploadImage(event) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.fst.ref(id);
        this.task = this.ref.put(event.target.files[0]);


        this.task.then( (data : any) => {

            console.log('kamatcho 1', data._delegate.metadata.name);
            this.imgName = data._delegate.metadata.name;
            data.ref.getDownloadURL().then(url => {
                this.filmToUpload.img = url;
                // console.log('kamatcho uuuuuu', this.urlToDownload);
            });
        });
        // console.log('kamatcho', this.urlToDownload);
    }

    uploadVideo(event) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.fst.ref(id);
        this.task = this.ref.put(event.target.files[0]);


        this.task.then( (data : any) => {

            console.log('kamatcho 1', data._delegate.metadata.name);

            this.imgName = data._delegate.metadata.name;
            data.ref.getDownloadURL().then(url => {
                this.filmToUpload.url = url;
                // console.log('kamatcho uuuuuu', this.urlToDownload);
            });
        });
        // console.log('kamatcho', this.urlToDownload);
    }
}
