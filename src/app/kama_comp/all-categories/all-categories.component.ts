import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Categorie} from '../../kamaModel/Categorie';
import {MovieCategoriesService} from '../../service/kamatcho/movie-categories.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

    categoriesList: Categorie[];
    itemCategory: Categorie;
    @Output() sendEventCategory = new EventEmitter<Categorie>();
  constructor(private categorieService: MovieCategoriesService) { }

  ngOnInit(): void {
      this.categorieService.getAllCategories().subscribe(
          (data: Categorie[]) => {
              this.categoriesList = data;
          }
      );
  }

 dataRecovery(category): void{
     this.sendEventCategory.emit(category);
 }

}
