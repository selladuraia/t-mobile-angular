import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent implements OnDestroy {
  readingList$: Observable<ReadingListItem[]> = this.store.select(
    getReadingList
  );
  snackBar$: Subscription;

  constructor(private readonly store: Store, private _snackbar: MatSnackBar) {}

  removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
    this._snackbar
      .open('Removed', 'Undo', {
        duration: 5000,
        panelClass: 'test-remove-redo-action',
      })
      .onAction()
      .subscribe((res) => {
        const book = { id: item.bookId, ...item };
        this.store.dispatch(addToReadingList({ book }));
      });
  }

  ngOnDestroy(): void {
    this.snackBar$ ? this.snackBar$.unsubscribe() : '';
  }
}