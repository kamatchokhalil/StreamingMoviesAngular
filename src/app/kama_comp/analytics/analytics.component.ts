import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';
import {FilmService} from '../../service/kamatcho/film.service';
import {Film} from '../../kamaModel/Film';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

    saleData = [
        {name: 'Mobiles', value: 105000},
        {name: 'Laptop', value: 55000},
        {name: 'AC', value: 15000},
        {name: 'Headset', value: 150000},
        {name: 'Fridge', value: 20000}
    ];

    dataTopMovie = [];
    labelsData = [];
    allData = [];
    moviesList: Film[];

    title: string;
    numberOfMoies: string;

    constructor(private categoriresService: MovieCategoriesService, private filmService: FilmService) {
    }

    ngOnInit() {

        this.getTopMoviesAnalytics();

        console.log('test 1111111', this.allData);
        console.log('test 222222', this.labelsData);
        console.log('test 333333', this.dataTopMovie);

        const myChart = new Chart('myChart', {
            type: 'bar',
            data: {
                labels: this.labelsData,
                datasets: [{
                    label: 'Top 5 Movies',
                    data: this.dataTopMovie,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {

                }
            }
        });
    }

    getCategories() {
        this.categoriresService.getCategoryByTitleCopy(this.title).subscribe(
            data => {
                console.log('Result 1', data);
                this.filmService.numberOfMoviesCatID(data[0].id).subscribe(
                    resultat => {
                        this.numberOfMoies = resultat[0][1];

                    },
                    error => {
                        console.log('Result error num', error);
                    }
                );
            },
            error => {
                console.log('Result error', error);
            }
        );
    }

    getTopMoviesAnalytics() {
        this.filmService.getTopMovies().subscribe(

           ( data : any[])=> {

                console.log('test data', data[0]);

                // tslint:disable-next-line:prefer-for-of
                // @ts-ignore
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++){
                    this.allData.push(data[i]);
                    this.labelsData.push(data[i].movies_title);
                    this.dataTopMovie.push(data[i].movies_numVisits);
                }
            },
            error => {
                console.log('Result error top 5', error);
            }
        );
    }


}
