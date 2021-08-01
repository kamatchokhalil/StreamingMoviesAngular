import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Film} from '../../kamaModel/Film';
import {FilmService} from '../../service/kamatcho/film.service';
import {PersoServiceService} from '../../service/kamatcho/perso-service.service';


@Component({
    selector: 'app-film-item',
    templateUrl: './film-item.component.html',
    styleUrls: ['./film-item.component.css'],
})
export class FilmItemComponent implements OnInit {

    @Input() itemOfFilmsList: Film;
    @Input() titleFromAllFilms: string;
    url: any;
    currentRate = 3.50;
    @Output() deleteFilmEvent = new EventEmitter<Film>();
    @Input() searchText: string;
    @Input() criteria: string;
    @Input() username: string;
    linkToshow: string;
    color: string;
    icon = 'star_border';
    userId: string;
    @Input() listFav = [];
    @Input() listOthers = [];

    constructor(private sanitizer: DomSanitizer, private router: Router, private filmService: FilmService, private persoService: PersoServiceService) {
    }

    ngOnInit(): void {


        this.userId = '1';

        if (this.listFav.includes(this.itemOfFilmsList.id) === true){
            this.icon = 'star';
        }else {
            this.icon = 'star_border';
        }

        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.itemOfFilmsList.url);
        //    this.username = sessionStorage.getItem('username');
        this.linkToshow = '/films/' + this.itemOfFilmsList.id;
    }

    editFilm(film: Film) {
        this.router.navigate(['/edit', film.id]);
    }

    showDetail(film: Film) {
        this.router.navigate(['/films', film.id]);
    }

    deleteFilm() {
        this.deleteFilmEvent.emit(this.itemOfFilmsList);
    }

    callServiceFilm() {
        /*        this.filmService.incrementNbrVues(this.itemOfFilmsList.id, this.itemOfFilmsList.title, this.itemOfFilmsList.summary, this.itemOfFilmsList.url,
                    this.itemOfFilmsList.duration, this.itemOfFilmsList.quality, this.itemOfFilmsList.trans,
                    this.itemOfFilmsList.dateSortie, this.itemOfFilmsList.num_visits, this.itemOfFilmsList.overall_rate,
                    this.itemOfFilmsList.movieCategories).subscribe(
                    (data) => {
                        console.log('service called', data);
                    },
                    (error) => {
                        console.log('service called', error);
                    }
                );*/

        this.filmService.incrementNbrVuesFromBack(this.itemOfFilmsList.id).subscribe(
            (data) => {
                console.log('service succes back', data);
            },
            (error) => {
                console.log('service error back', error);
            }
        );
    }

    AddToFavList(): void {
        if (this.icon === 'star_border') {
            this.filmService.checkFavExist(this.itemOfFilmsList.id, this.userId).subscribe(
                (data) => {
                    if (data.length === 0) {
                        this.filmService.addMovieToFav('api/users/' + this.userId, 'api/movies/' + this.itemOfFilmsList.id).subscribe(
                            (dataAdd) => {
                                this.icon = 'star';
                                console.log('faaav', dataAdd);
                            },
                            (errorAdd) => {
                                console.log('faaav', errorAdd);
                            }
                        );

                    } else {
                        window.alert('already exists');
                    }
                },
                (error) => {
                    console.log('checkFavExist', error);
                }
            );
        } else {

            this.filmService.deleteMovieFromFav(this.userId, this.itemOfFilmsList.id).subscribe(
                (data) => {
                    this.icon = 'star_border';
                    window.alert('Movie remove from favorites list');
                },
                (error) => {
                    console.log('faaav', error);
                }
            );
        }
    }
}
