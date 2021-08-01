import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Film} from '../../kamaModel/Film';
import {MovieCategoriesService} from './movie-categories.service';
import {Router} from '@angular/router';
import {Favoris} from '../../kamaModel/Favoris';

@Injectable({
    providedIn: 'root'
})
export class FilmService {

    url = 'http://localhost:8000/api/movies/';
    urlReview = 'http://localhost:8000/api/reviews/';
    urlPost = 'http://localhost:8000/api/movies';
    urlPostFav = 'http://localhost:8000/api/favoris';
    urlFav = 'http://localhost:8000/api/favoris/';

    constructor(private http: HttpClient, private categoryService: MovieCategoriesService, private router: Router) {
    }

    getAllFilms() {
        return this.http.get<Film[]>(this.url);
    }

    getFilmById(id: number) {
        return this.http.get<Film>(this.url + id);
    }

    getFilmBytitle(title: string) {
        return this.http.get<Film[]>('http://localhost:8000/api/movies?title=' + title);
    }

    getFilmByCategoryId(categoryId: string) {
        return this.http.get<Film[]>( 'http://localhost:8000/api/movie_categories/' + categoryId);
    }

    getFilmByQuality(qualite: string) {
        return this.http.get<Film[]>(this.url + '?quality=' + qualite);
    }

    upload(formData) {
        return this.http.put('http://localhost:8000/movie/upload', formData);
    }

    addFilm(title, summary, url, duration, quality, trans, dateSortie, numVisits, overallRate, MovieCategories, img, free): void {
        // console.log('Film Object == ', film);
        this.http.post(this.urlPost, {
            title: title,
            summary: summary,
            url: url,
            duration: duration,
            quality: quality,
            trans: trans,
            dateSortie: dateSortie,
            numVisits: numVisits,
            overallRate: overallRate,
            MovieCategories: MovieCategories,
            img: img,
            free: free
        }).subscribe(
            (data) => {
                this.router.navigate(['/films']);
                window.location.href = 'http://localhost:4200/films';
            },
            (error) => {
                console.log('error ', error);
            }
        );
    }

    deleteFilm(film) {
        return this.http.delete(this.url + film);
    }

    editFilm(id, title, summary, url, duration, quality, trans, dateSortie, numVisits, overallRate, MovieCategories, img, free) {

        console.log('aaaaaaaaaaaa', img);
        return this.http.put(this.url + id, {
            title: title,
            summary: summary,
            url: url,
            duration: duration,
            quality: quality,
            trans: trans,
            dateSortie: dateSortie,
            numVisits: numVisits,
            overallRate: overallRate,
            MovieCategories: MovieCategories,
            img: img,
            free: free
        });
    }

    getVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    incrementNbrVues(id, title, summary, url, duration, quality, trans, dateSortie, numVisits, overallRate, movieCategories) {
        return this.http.put(this.url + id, {
            title: title,
            summary: summary,
            url: url,
            duration: duration,
            quality: quality,
            trans: trans,
            dateSortie: dateSortie,
            numVisits: numVisits,
            overallRate: overallRate,
            MovieCategories: movieCategories,
        });
    }

    incrementNbrVuesFromBack(id) {
        return this.http.get<Film[]>('http://localhost:8000/movie/increment?movieID=' + id);
    }

    numberOfMoviesCatID(id) {
        return this.http.get<any>('http://localhost:8000/movie/NumMoviesCatid?catid=' + id);
    }

    getTopMovies() {
        return this.http.get<Film[]>('http://localhost:8000/movie/topMovies');
    }

    getLastMovies() {
        return this.http.get<Film[]>('http://localhost:8000/movie/lastMovies');
    }

    getLastWeek() {
        return this.http.get<Film[]>('http://localhost:8000/movie/lastweekMovies');
    }

    getMostVisited() {
        return this.http.get<Film[]>('http://localhost:8000/movie/mostVisitedMovie');
    }

    addMovieToFav(userId, movieId) {
        return this.http.post(this.urlPostFav, {
            UserID: userId,
            FilmID: movieId,
        });
    }

    deleteMovieFromFav(userId, movieId) {
        let params = new HttpParams();
        params = params.append('user', userId);
        params = params.append('movie', movieId);
        return this.http.delete('http://localhost:8000/movie/deleteFav', {params});
    }

    checkFavExist(movieId, userID) {
        return this.http.get<Favoris[]>('http://localhost:8000/movie/getMovieFavExist?movie=' + movieId + '&user=' + userID);
    }

    getUserFavByUserID(userID) {
        return this.http.get<Favoris[]>(' http://localhost:8000/movie/getFav?user=' + userID);
    }

    addReview(userId, movieId, comment, rate) {
        /*        let params = new HttpParams();
                params = params.append('user', userId);
                params = params.append('movie', movieId);
                params = params.append('comment', comment);
                params = params.append('rate', rate);*/

        return this.http.post('http://localhost:8000/movie/addReview?movie=' + movieId + '&user=' + userId +
            '&comment=' + comment + '&rate=' + rate, null);
    }


    checkReview(userId, movieId) {
        return this.http.get('http://localhost:8000/movie/getReviewByUserID?movie=' + movieId + '&user=' + userId);
    }

    updateReviw(userId, movieId, comment, rate){
        return this.http.put('http://localhost:8000/movie/updateReview?movie=' + movieId + '&user=' + userId +
            '&comment=' + comment + '&rate=' + rate, null);
    }

    getSumRate(movieId){
        return this.http.get('http://localhost:8000/movie/getSumRate?movie=' + movieId);
    }

    getReview(movieId){
        return this.http.get('http://localhost:8000/movie/getReviewByMovieID?movie=' + movieId);
    }

    deleteReview(id: number) {
        return this.http.delete(this.urlReview + id);
    }
}
