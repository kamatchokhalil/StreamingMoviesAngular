import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Film} from '../../kamaModel/Film';
import {Categorie} from '../../kamaModel/Categorie';
import {FilmService} from '../../service/kamatcho/film.service';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';
import {duration} from 'moment';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';


@Component({
    selector: 'app-edit-film',
    templateUrl: './edit-film.component.html',
    styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
    filmToEdit: Film;
    oldFilm: Film;
    categorieId: string;
    oldCategorie: string;
    itemSelected: string;
    selectedFile: File = null;
    url: any;
    quality: string;
    categoriesList: Categorie[];
    selectedIndex: number;
    imgName: string;
    task: AngularFireUploadTask;
    ref: AngularFireStorageReference;


    constructor(private fs: AngularFirestore, private fst: AngularFireStorage, private categorieService: MovieCategoriesService, private httpService: HttpClient,
                private filmService: FilmService, private domSanitizer: DomSanitizer, private router: Router,
                private route: ActivatedRoute) {
    }

    async ngOnInit() {
        this.categorieService.getAllCategories().subscribe(
            (data: Categorie[]) => {
                this.categoriesList = data;
            }
        );
        this.filmService.getFilmById(this.route.snapshot.params.id).subscribe(
            data => {

                this.filmToEdit = data;
                this.categorieId = '/api/movie_categories/1'.replace('/api/movie_categories/', '');

                this.oldFilm = data;
                this.filmMethod(data);
                this.urlMethod(data.url);
                this.getOldCategorie(data);
            }
        );
    }

    onFileSelected(event): void {
        this.selectedFile = event.target.files[0];
    }

    selectOption(event) {
        // this.categorieId = this.itemSelected;
    }

    urlMethod(fromdata: string) {
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(fromdata);
        // this.url = this.sanitizer.bypassSecurityTrustUrl(fromdata);
    }

    filmMethod(fromdata: Film) {
        this.filmToEdit = fromdata;
        this.oldFilm = fromdata;
        if (fromdata.quality === '2160p - 4k') {
            this.selectedIndex = 1;
        } else if (fromdata.quality === '1440p - HD') {
            this.selectedIndex = 2;
        } else if (fromdata.quality === '1080p - HD') {
            this.selectedIndex = 3;
        } else if (fromdata.quality === '720p') {
            this.selectedIndex = 4;
        } else if (fromdata.quality === '480p') {
            this.selectedIndex = 5;
        } else if (fromdata.quality === '360p') {
            this.selectedIndex = 6;
        } else if (fromdata.quality === '240p') {
            this.selectedIndex = 7;
        } else if (fromdata.quality === '144') {
            this.selectedIndex = 8;
        }
    }

    getOldCategorie(film) {
        this.categorieService.getCategoryById(this.categorieId).subscribe(
            (data: Categorie) => {
                this.oldCategorie = data.title;

            }
        );
    }

    selectQualityOption(id) {
        /*  console.log('item 1 ', id.target.options[id.target.options.selectedIndex].text);
          console.log('item 2 ', this.itemSelected);*/
        this.quality = id.target.options[id.target.options.selectedIndex].text;
        console.log('item 1 ', id.target.options[id.target.options.selectedIndex].text);
    }

    isChecked(data) {
        this.filmToEdit.trans = data.target.checked;
    }

    isCheckedFree(data) {
        this.filmToEdit.free = data.target.checked;
    }

    uploadImage(event){
        const id = Math.random().toString(36).substring(2);
        this.ref = this.fst.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.task.then( (data) => {
           // console.log('kamatcho 1', data._delegate.metadata.name);
          //  this.imgName = data._delegate.metadata.name;
            data.ref.getDownloadURL().then(url => {
                this.filmToEdit.img = url;
               // console.log('kamatcho uuuuuu', this.urlToDownload);
            });
        });
       // console.log('kamatcho', this.urlToDownload);

    }

    editFilm(fdata: NgForm) {

        console.log('urlll', this.filmService.getVideoId(this.filmToEdit.url));
        this.filmToEdit.url = 'https://www.youtube.com/embed/' + this.filmService.getVideoId(this.filmToEdit.url);
        this.filmToEdit.quality = this.quality;
        this.filmToEdit.duration = '00:00:00';

        this.filmToEdit.movieCategories = '/api/movie_categories/' + this.categorieId;

        this.filmService.editFilm(this.filmToEdit.id, this.filmToEdit.title, this.filmToEdit.summary, this.filmToEdit.url,
            this.filmToEdit.duration, this.filmToEdit.quality, this.filmToEdit.trans,
            this.filmToEdit.dateSortie, this.filmToEdit.num_visits, this.filmToEdit.overall_rate,
            this.filmToEdit.movieCategories , this.filmToEdit.img , this.filmToEdit.free).subscribe(
            (data) => this.router.navigate(['/movies'])
        );
    }

}
