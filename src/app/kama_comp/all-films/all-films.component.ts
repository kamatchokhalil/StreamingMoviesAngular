import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Film} from '../../kamaModel/Film';
import {FilmService} from '../../service/kamatcho/film.service';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';

@Component({
    selector: 'app-all-films',
    templateUrl: './all-films.component.html',
    styleUrls: ['./all-films.component.css']
})
export class AllFilmsComponent implements OnInit {
    @Input() filmsList: Film[];
    @Input() titleFilmFromBody: string;
    @Input() search: string;
    @Input() critere: string;
    @Input() eventFromSearch: boolean;
    // search: string;
    // critere = '1';
    categorieId: number;
    username: string;
    listFavoris = [];


    constructor(private filmService: FilmService, private router: Router, private categorieService: MovieCategoriesService) {
    }

    ngOnInit(): void {
        this.filmService.getAllFilms().subscribe((data: Film[]) => this.filmsList = data);

        this.filmService.getUserFavByUserID(1).subscribe(


            (data:any) => {

                for (let i = 0; i < data.length ; i++){
                    this.listFavoris.push(data[i].FilmID.id);
                }
            },
            (error) => {
                console.log('getFavs', error);
            }
        );

    }

    deleteFilm(film) {
        const r = confirm('Voulez vous supprimer ce film ?');
        if (r === true) {
            this.filmService.deleteFilm(film.id).subscribe(
                (data) => {
                    console.log('from delete film', data);
                    this.router.navigate(['/films']);
                    window.location.href = 'http://localhost:4200/films';
                }
            );
        }
    }

    selectOption(event) {
        this.search = '';
        // this.critere = event.target.options[event.target.options.selectedIndex].text;
        // console.log('cc', this.critere+ " "+ this.search);
        /*     if (this.critere === '1' && this.search !== 'undefined'){
               this.filmService.getFilmBytitle(this.search).subscribe(
                 (data: Film[]) => {
                   this.filmsList = (data);
                   console.log('film title', data);
                 }
               );
             }else {
               this.filmService.getAllFilms().subscribe((data: Film[]) => this.filmsList = data);
             }*/

    }


}
