import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let matSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        SharedTestingModule,
      ],
    }).compileComponents();
    matSnackBar = TestBed.inject(MatSnackBar);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should add Book to reading list & show snackbar with undo action', () => {
    spyOn(matSnackBar, 'open').and.callThrough();
    component.addBookToReadingList(createBook('A'));
    const config = {
      duration: 5000,
      panelClass: 'test-add-redo-action',
    };
    expect(matSnackBar.open).toHaveBeenCalledWith('Added', 'Undo', config);
    expect(matSnackBar.open).toHaveBeenCalledTimes(1);
  });

  it('should unsubscripe', () => {
    component.getAllBook$ = new Subscription();
    component.snackBar$ = new Subscription();
    spyOn(component.getAllBook$, 'unsubscribe');
    spyOn(component.snackBar$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.snackBar$.unsubscribe).toHaveBeenCalled();
    expect(component.getAllBook$.unsubscribe).toHaveBeenCalled();
  });
});