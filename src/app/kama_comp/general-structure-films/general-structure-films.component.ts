import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Film} from '../../kamaModel/Film';
import {FilmService} from '../../service/kamatcho/film.service';
import {Router} from '@angular/router';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';
import {Categorie} from '../../kamaModel/Categorie';
import {MatTabChangeEvent} from '@angular/material';

@Component({
    selector: 'app-general-structure-films',
    templateUrl: './general-structure-films.component.html',
    styleUrls: ['./general-structure-films.component.scss']
})


export class GeneralStructureFilmsComponent implements OnInit {

    search: string;
    critere = '1';
    effectOperation = false;
    filmsList: Film[];
    topfilmsList: Film[];
    categorieId: number;
    username: string;
    today = new Date();
    lastweek: string;

    itemMovie: Film;
    mostVisitedCategory: string;
    linkToshow: string;
    listFavoris = [];


    constructor(private filmService: FilmService, private router: Router, private categorieService: MovieCategoriesService) {

    }

    ngOnInit(): void {
        this.getFirstMostVisited();
        this.getTopMovies();
    }

    /*    lauchSearch(){
            this.effectOperation = true;
        }*/

    getFavoriteList(){
        this.filmService.getUserFavByUserID(1).subscribe(

            (data : any) => {

                for (let i = 0; i < data.length ; i++){
                    this.listFavoris.push(data[i].FilmID);
                }
                return this.listFavoris;
            },
            (error) => {
                console.log('getFavs', error);
            }
        );
    }

    lauchSearch(): void {
        // tslint:disable-next-line:radix triple-equals
        if (this.search != 'undefined' && this.critere != 'undefined') {
            // tslint:disable-next-line:radix
            switch (parseInt(this.critere)) {
                case 1 : {
                    this.filmService.getFilmBytitle(this.search).subscribe(
                        (data: Film[]) => {
                            this.filmsList = (data);
                            console.log('film title', data);
                        }
                    );
                }
                         break;
                case 2 : { // Catégories


                    this.categorieService.getCategoryByTitleCopy(this.search).subscribe(
                        (data : any) => {
                            console.log('test cat []', data[0]);
                            /*    this.filmService.getFilmByCategoryId(this.categorieId).subscribe(
                                    (res: Film[]) => {
                                        console.log(' kkkk categorieId', res);
                                        console.log(' kkkk categorieId', this.categorieId);
                                        this.filmsList = (res);
                                    }
                                );*/

                            this.filmsList = data[0].movies;
                        },
                        (error) => {
                            console.log('test cat', error);
                        }
                    );


                    break;
                }
                case 3 : {
                    this.filmService.getFilmByQuality(this.search).subscribe(
                        (data: Film[]) => {
                            this.filmsList = (data);
                        }
                    );
                    break;
                }
                default :
                    this.filmService.getAllFilms().subscribe((data: Film[]) => this.filmsList = data);

            }
        }

    }

    getMoviesByCategory(category): void {
        this.filmsList = category.movies;
    }

    getLastMovies(): void {
        this.filmService.getLastMovies().subscribe(
            (data) => {
                this.filmsList = (data);
            }
        );

    }

    getLastWeekMovies(): void {
        this.filmService.getLastWeek().subscribe(
            (data) => {
                this.filmsList = (data);
            }
        );

    }

    getAllMovies(): void {
        this.filmService.getAllFilms().subscribe(
            (data) => {
                this.filmsList = (data);
            }
        );

    }

    getTopMovies(): void {
        this.filmService.getTopMovies().subscribe(
            (data) => {
                this.topfilmsList = (data);
            }
        );

    }


    getFirstMostVisited(): void {
        this.filmService.getMostVisited().subscribe(

            (data : any[]) => {

                this.itemMovie = data[0];
                this.linkToshow = '/films/' + this.itemMovie.id;
                this.categorieService.getCategoryById(data[0].MovieCategories.replace('/api/movie_categories/', '')).subscribe(
                    (res) => {
                        this.mostVisitedCategory = res.title;
                    },
                        (error) => {
                            console.log('visited err', error);
                    }
                );
            }
        );

    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        console.log('tabChangeEvent => ', tabChangeEvent);
        console.log('index => ', tabChangeEvent.index);
        if (tabChangeEvent.index === 1){
            this.getFavoriteList();
            this.filmsList = this.listFavoris;
        }
    }

}
