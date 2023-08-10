import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
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
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove Book from reading list & show snackbar with undo action', () => {
    spyOn(matSnackBar, 'open').and.callThrough();
    component.removeFromReadingList(createReadingListItem('A'));
    const config = {
      duration: 5000,
      panelClass: 'test-remove-redo-action',
    };
    expect(matSnackBar.open).toHaveBeenCalledWith('Removed', 'Undo', config);
    expect(matSnackBar.open).toHaveBeenCalledTimes(1);
  });
  it('should call snackBar$.unsubscribe onDestory', () => {
    component.snackBar$ = new Subscription();
    spyOn(component.snackBar$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.snackBar$.unsubscribe).toHaveBeenCalled();
  });
});