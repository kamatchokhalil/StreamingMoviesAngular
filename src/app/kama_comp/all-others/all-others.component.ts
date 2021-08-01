import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../kamaModel/Film';
import {FilmService} from '../../service/kamatcho/film.service';
import {Router} from '@angular/router';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';




@Component({
  selector: 'app-all-others',
  templateUrl: './all-others.component.html',
  styleUrls: ['./all-others.component.scss']
})
export class AllOthersComponent implements OnInit {
    @Input() filmsList: Film[];
    @Input() categoryId: string;


  constructor(private filmService: FilmService, private router: Router,
              private categorieService: MovieCategoriesService) {

  }

  ngOnInit(): void {

          this.filmService.getFilmByCategoryId(this.categoryId.replace('/api/movie_categories/', '')).subscribe(
              (data) => {
                  this.filmsList = data.movies;
                  // console.log('kiko', data);
              },
              (error) => {
                  console.log('error', error);
              },
          );

      }

}
