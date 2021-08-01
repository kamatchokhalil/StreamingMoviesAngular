import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../kamaModel/Review';
import {FilmService} from '../../service/kamatcho/film.service';

@Component({
  selector: 'app-all-comment',
  templateUrl: './all-comment.component.html',
  styleUrls: ['./all-comment.component.scss']
})
export class AllCommentComponent implements OnInit {

    listReview: Review[];
    @Input() movieId: string;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
      this.getReviews();
  }

    getReviews(): void{
      this.filmService.getReview(this.movieId).subscribe(
          (dataReview: Review[]) => {
              // console.log('allreview', dataReview);
              this.listReview = dataReview;
          },
          (errorReview) => {
              console.log('allreview', errorReview);
          }
      );
    }

    deleteReview(review): void {
        const r = confirm('Voulez-vous supprimer votre avis ?');
        if (r === true) {
            this.filmService.deleteReview(review.id).subscribe(
                (data) => {
                    console.log('from delete comment', data);
                    window.location.href = 'http://localhost:4200/films/' + this.movieId;
                }
            );
        }
    }

}
