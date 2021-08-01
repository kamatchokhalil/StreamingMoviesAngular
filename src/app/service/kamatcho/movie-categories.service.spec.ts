import { TestBed } from '@angular/core/testing';

import { MovieCategoriesService } from './movie-categories.service';

describe('MovieCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieCategoriesService = TestBed.get(MovieCategoriesService);
    expect(service).toBeTruthy();
  });
});
